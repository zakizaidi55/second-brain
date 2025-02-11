import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config(); 

const jwt_secret = process.env.JWT_SECRET || "default_secret"; 

export const userMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const header = req.headers["authorization"];
    try {
        const decoded = jwt.verify(header as string, jwt_secret) as {id:string}; 

        (req as any).userId = decoded.id; 
        next();
    } catch (error) {
        return res.status(403).json({
            message: "Invalid token" 
            });
    }
}