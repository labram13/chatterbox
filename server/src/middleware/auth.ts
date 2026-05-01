import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
import pool from '../config/db'
dotenv.config()

interface User extends jwt.JwtPayload, Request {
    user_id: number,
    username: string,
    email: string
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}



export function authenticateToken(req:Request, res:Response, next:NextFunction) {
    const {accessToken, refreshToken} = req.cookies
    console.log("access token", accessToken, "refresh token", refreshToken)
    console.log("hit middleware")

    const accessSecret: string = process.env.ACCESS_TOKEN as string
    const refreshSecret: string = process.env.REFRESH_TOKEN as string

    //check if access token exists

    if (!accessToken) {
        return res.status(400).json({status: 'no access token'})
    }

    //verify token



    jwt.verify(accessToken, 
        accessSecret, 
        async (err: jwt.VerifyErrors | null, user?: jwt.JwtPayload | string) => {
            if (err) {

                //check for refresh token

                if (!refreshToken) {
                    return res.status(400).json({status: 'accessToken invalid and refreshToken undefined'})
                }

                //check if refresh token is in db

                const tokenDb = await pool.query( 
                    'SELECT * FROM refresh_tokens where token = $1',
                    [refreshToken]
                )


                //return 400 status if it doesn't. means refresh token is invalid
                if (!tokenDb.rows[0]) {
                    return res.status(400).json({status: 'refreshToken does not exist in db'})
                }

                //verify token now since it's in db

               jwt.verify(
                refreshToken,
                refreshSecret,
                (err: jwt.VerifyErrors | null, user?: jwt.JwtPayload | string) => {
                    if (err) {
                        return res.status(400).json({status: 'invalid refreshToken'})
                    }


                    //if everything passes, generate new accessToken and send to client
                    const currentPayload = user as jwt.JwtPayload
                    const {created_at, exp, iat, ...userPayload} = currentPayload

                    const newAccessToken = jwt.sign(userPayload as JwtPayload, accessSecret!, {expiresIn: '5s'})
                    res.cookie('accessToken', newAccessToken, {
                        httpOnly: true,
                        secure: false,
                        sameSite: 'lax', 
                        maxAge: 30 * 60 * 1000
                    })
                    req.user = userPayload as User
                    console.log(req.user)

                })
                console.log('valid refresh token, generated new access token and sent to user')
                return next()
            }
            const currentPayload = user as jwt.JwtPayload
            const {created_at, exp, iat, ...userPayload} = currentPayload
            console.log('access token valid')
            req.user = userPayload as User
            console.log(req.user)

            return next()
    })

}

    



  


