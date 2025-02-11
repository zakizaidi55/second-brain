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