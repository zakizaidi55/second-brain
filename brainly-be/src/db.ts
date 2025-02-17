import * as dotenv from 'dotenv';
dotenv.config(); 

import mongoose, {model, Schema} from "mongoose";

const mongoURI = process.env.DATABASE_URL;  


if (!mongoURI) {
    throw new Error("DATABASE_URL is not defined in .env file");
}

mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch(err => console.error("MongoDB Connection Error:", err));

const UserSchema = new Schema({
    username:{
        type:String,
        unique:true,
    },

    password: {
        type:String
    }
})

export const UserModel = model("User", UserSchema); 

const ContentSchema = new Schema({
    title:{
        type:String,
    },

    link : {
        type :String,
    },

    tags : [{
        type:mongoose.Types.ObjectId,
        ref:"Tag"
    }],

    userId : {
        type:mongoose.Types.ObjectId,
        ref:"User",
    }
})

export const ContentModel = model("Content", ContentSchema);

const LinkSchema = new Schema({
    hash:{
        type:String,
    },

    userId : {
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true,
    }
})

export const LinkModel = model("Links", LinkSchema);

