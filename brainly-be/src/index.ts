import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, UserModel } from "./db";
import bcrypt from "bcrypt";
import * as dotenv from 'dotenv';
import { userMiddleware } from "./middleware";
dotenv.config(); 

const jwt_secret = process.env.JWT_SECRET; 

const app = express();

app.use(express.json());

app.post("/api/v1/signup", async (req:any, res:any) => {
    const userName = req.body.userName;
    const password = req.body.password;
    try {        
        console.log("username", userName);
        console.log("password", password);

        const user = await UserModel.findOne({username:userName});

        if(user) {
            // user already exist
            return res.status(411).json({
                message:"user is already exist"
            })
        }

        console.log("creating new user")
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({
            username:userName,
            password:hashedPassword

        })

        res.status(200).json({
            message:"User created successfully"
        })
    } catch(error) {
        console.log("Error while signup")
        return res.status(500).json({
            message:"Server crashed"
        })
    }
    
})

app.post("/api/v1/signin", async(req:any, res:any) => {

    const userName = req.body.userName;
    const password = req.body.password;
    try {
        console.log("inside try ");
       const existingUser = await UserModel.findOne({
        username:userName,
       })

       console.log("existing user ", existingUser);

       if(!existingUser) {
        return res.status(404).json({
            message:"You need to create an user"
        })
       }

       //@ts-ignore
       if(await bcrypt.compare(password, existingUser?.password)) {
        //password match
        const token = jwt.sign({
            id:existingUser?._id,
        }, jwt_secret as any);

        return res.status(200).json({
            token
        })
       }

       else {
        return res.status(404).json({
            message:"Password is incorrect",
        })
       }
       

    } catch(error) {
        console.log("Error while sign in")
        return res.status(500).json({
            message:"Server crashed"
        })
    }
})

// @ts-ignore
app.post("/api/v1/content", userMiddleware, async(req, res) => {
    const link = req.body.link;
    const title = req.body.title;

    try {
        await ContentModel.create({
            link,
            title,
            userId:(req as any).userId,
            tags:[]
        })

        return res.status(200).json({
            message:"Content added"
        })
    } catch(error) {
        console.log("error while adding content");
        return res.status(500).json({
            message:"Server Crashed"
        })
    }

})

// @ts-ignore
app.get("/api/v1/content", userMiddleware, async (req, res) => {
    const userId = (req as any).userId;

    try {
        const content = await ContentModel.find({
            userId:userId,
        }).populate("userId", "username")
    
        return res.status(200).json({
            content,
        })
    } catch(error) {
        console.log("Error while getting all content");
        return res.status(500).json({
            message:"Server crashed",
        })
    }
    
})

app.delete("/api/vi/content/:id", async(req, res)=> {
    
})

app.post("/api/v1/brain/share", (req, res)=> {

})

app.listen(3000);