import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserModel } from "./db";

const app = express();

app.use(express.json());

app.post("/api/v1/signup", async (req:any, res:any) => {

    try {
        const userName = req.body.userName;
        const password = req.body.password;
        
        console.log("username", userName);
        console.log("password", password);

        const user = await UserModel.findOne(userName);
        console.log("user", user);

        console.log("user not found");

        if(user) {
            // user already exist
            res.json(411).json({
                message:"user is already exist"
            })
        }

        console.log("creating new user")

        await UserModel.create({
            username:userName,
            password:password

        })

        res.status(200).json({
            message:"User created successfully"
        })
    } catch(error) {
        return res.status(500).json({
            message:"Server crashed"
        })
    }
    
})

app.post("/api/v1/signin", async(req:any, res:any) => {
    try {
        const userName = req.body.userName;
        const password = req.body.password;

     

        console.log("user not found")

        
        UserModel.create({
            username:userName,
            password:password

        })
    } catch(error) {
        return res.status(500).json({
            message:"Server crashed"
        })
    }
})

app.get("/api/v1/content", (req, res) => {

})

app.delete("/api/v1/content", (req, res) => {

})

app.post("/api/v1/brain/share", (req, res)=> {

})

app.listen(3000);