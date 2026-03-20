import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db.js";
import { JWT_PASSWORD, MONGODB_URL } from "./config.js";
import { userMiddleware } from "./middleware.js";
import { hashPassword, hashValue } from "./hash.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import cors from "cors";
type AuthedRequest = express.Request & { userId: string };
mongoose.connect(MONGODB_URL);
const app = express();
app.use(express.json());
app.use(cors());


const authZodSchema = z.object({
    username : z.string().min(5).max(50),
    password : z.string().min(6).max(60)
})

app.post("/api/v1/signup", async (req, res) => {
   const validationResult = authZodSchema.safeParse(req.body);

   if(!validationResult.success){
    return res.status(400).json({
        message : "Invalid signup Input"
    });
   }

   const { username , password } = validationResult.data;

   //Checking the user if already exists
   const existingUser = await UserModel.findOne({username});

   if(existingUser){
    return res.status(409).json({
        message : "User is alerady exists"
    });
   }

   const hashedPassword  = await hashPassword(password);

   await UserModel.create({
    username,
    password : hashedPassword,
   });

   res.json({
    message : "SignUp Successfull"
   })

})

app.post("/api/v1/signin", async (req,res) => {
   const validationResult = authZodSchema.safeParse(req.body);

   if(!validationResult.success){
    return res.status(400).json({
        message : "Invalid signin input"
    })
   }

   const {username , password} = validationResult.data;

   const existingUser = await UserModel.findOne({ username });

   if(!existingUser || !existingUser.password){
    return res.status(403).json({
        message : "Incorrect credentials"
    })
   }

   const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

   if(!isPasswordCorrect){
    return res.status(403).json({
        message: "Incorrect crendentials"
    })
   }

   const token = jwt.sign({ id : existingUser._id}, JWT_PASSWORD);

   res.json({
    message : "Signin successfull",
    token
   });

});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type

    if (!req.userId) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    await ContentModel.create({
        link,
        type,
        title: req.body.title,
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content added"
    });

});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const userObjectId = new mongoose.Types.ObjectId(req.userId);

    const content = await ContentModel.find({
        userId: userObjectId
    }).populate("userId", "username");

    res.json({
        content
    });
});

app.delete("/api/v1/content", userMiddleware, async (req, res) =>{
    const contentId = req.body.contentId;

    if (!req.userId) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const userObjectId = new mongoose.Types.ObjectId(req.userId);

    await ContentModel.deleteMany({
        _id: contentId,
        userId: userObjectId
    });

    res.json({
        message: "Content deleted"
    });
});

app.post("/api/v1/brain/share", userMiddleware, async(req, res) => {
    const share = req.body.share;

    if (!req.userId) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const userObjectId = new mongoose.Types.ObjectId(req.userId);

    let hash: string | null = null;

    if(share){
        // Either reuse existing link or create a new one
        const existingLink = await LinkModel.findOne({
            userId: userObjectId
        });

        if (existingLink && existingLink.hash) {
            hash = existingLink.hash;
        } else {
            hash = await hashValue(req.userId);
            await LinkModel.create({
                userId: userObjectId,
                hash
            });
        }
    }else{
        await LinkModel.deleteOne({
            userId: userObjectId
        });
    }

    res.json({
        message : "Updated sharable link",
        // hashValue now generates a URL-safe random string
        link: share && hash ? `/api/v1/brain/${hash}` : null
    });
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    // Get link and associated user in one go
    const link = await LinkModel.findOne({
        hash: hash
    }).populate<{ userId: { username: string } }>("userId", "username");

    if (!link) {
        return res.status(401).json({
            message: "Invalid link"
        });
    }

    const content = await ContentModel.find({
        userId: link.userId
    });

    // After populate, link.userId is the User document (typed above)
    const user = link.userId;

    if (!user) {
        return res.status(401).json({
            message: "User not found, error should ideally not happen"
        });
    }

    res.json({
        username: user.username,
        content: content
    });
})

function main(){
    app.listen(3000);
    console.log(`listening on port 3000`);
}

main();