import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
dotenv.config()


export function authenticateToken(req:Request, res:Response, next:NextFunction) {

    console.log("hit middleware")
    next()
}


