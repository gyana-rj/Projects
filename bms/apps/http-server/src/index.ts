import express from "express"
import { prisma } from "@repo/db/client";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("hey there")
})

app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await prisma.user.create({
        data:{
            username,
            password
        }
    })
    res.json({
        message: "Signup successful",
        id: user.id
    })

})

function main(){
    app.listen(3002);
    console.log(`Listening on port 3002`);
}

main()
