//create the user models and schemas here
import mongoose, {model, Model, Schema} from "mongoose";

const UserSchema = new Schema({
    username : {type : String, unique : true, required : true},
    password : {type : String, required : true},
})

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    type: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true },
})

const LinkSchema = new Schema({
    hash : String,
    userId : {type : mongoose.Types.ObjectId, ref : 'User', required: true, unique : true},

})

export const UserModel = model("User", UserSchema);
export const ContentModel = model("Content", ContentSchema);
export const LinkModel = model("Link", LinkSchema);

