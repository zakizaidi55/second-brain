import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import bcrypt from "bcrypt";
import * as dotenv from 'dotenv';
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors  from "cors";
dotenv.config(); 

const jwt_secret = process.env.JWT_SECRET; 

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req:any, res:any) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber
    const password = req.body.password;
    try {        
        console.log("firsrName", firstName);
        console.log("lastName", password);
        console.log("email", email);
        console.log("phoneNumber", phoneNumber);
        console.log("password", password);

        const user = await UserModel.findOne({email:email});

        if(user) {
            // user already exist
            return res.status(411).json({
                message:"user is already exist"
            })
        }

        console.log("creating new user")
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            phoneNumber:phoneNumber,
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

    const email = req.body.email;
    const password = req.body.password;
    try {

       const existingUser = await UserModel.findOne({
        username:email,
       })

       //console.log("existing user ", existingUser);

       if(!existingUser) {
        return res.status(500).json({
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
    const type = req.body.type;
    try {
        await ContentModel.create({
            link,
            title,
            userId:(req as any).userId,
            tags:[],
            type
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
    const email = (req as any).userId;

    try {
        const content = await ContentModel.find({
            email:email,
        }).populate("emailId", "firstName", "lastName")
    
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

// @ts-ignore
app.delete("/api/vi/content", userMiddleware, async(req, res)=> {
    const contentId = req.body.contentId;

    try {
        await ContentModel.deleteMany({
            contentId,
            userId:(req as any).userId,
        })

        return res.status(200).json({
            message:"Deleted successfully",
        })
    } catch(error) {
        console.log("Error while deleting content");
        res.status(500).json({
            message:"Server crashed"
        })
    }
})

// @ts-ignore
app.post("/api/v1/brain/share",userMiddleware, async(req, res)=> {
    const {share} = req.body;

    try {
        const hash = random(10);
        if(share == "true") {
            const existingLink = await LinkModel.findOne({
                userId:(req as any).userId
            })

            if(existingLink) {
                return res.json({
                    hash:existingLink.hash
                })
            }
            await LinkModel.create({
                userId: (req as any).userId,
                hash:hash
            })
        }
    
        else {
            await LinkModel.deleteOne({
                userId:(req as any).userId,
            });
        }

        res.status(200).json({
            message:"/share/" + hash,

        })
    } catch(error) {
        return res.status(500).json({
            message:"Error while updating sharable link",
        })
    }
})

// @ts-ignore
app.get("/api/v1/brain/:sharelink", async(req, res)=> {
    const hash = req.params.sharelink;

    try {
        const link = await LinkModel.findOne({
            hash
        });
    
        if(!link) {
            return res.status(411).json({
                message:"incorrect input"
            })
        }

        const content = await ContentModel.find({
            userId: link.userId
        })

        const user = await UserModel.findOne({
            _id:link.userId
        })


        res.status(200).json({
            username:user?.firstName,
            content:content
        })
    } catch(error) {

    }
})


app.listen(3000);