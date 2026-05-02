import express from 'express'
import pool from '../../config/db'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import {authenticateToken} from '../../middleware/auth'
dotenv.config()

const router = express.Router();


type NewUser = {
    username:string,
    email:string,
    password:string
}

type User = {
    user_id: number, 
    username: string,
    email: string
}

type UserCredentials = {
    username: string,
    password: string
}

router.post('/register', async (req, res) => {


    const newUser: NewUser = req.body.newUser
    //check for username if it exists

    try {

        const usernameExists = await pool.query(
            'SELECT * FROM users where username = $1',
            [newUser.username]
        )
                
        if (usernameExists.rows.length !== 0) {
            return res.status(400).json({message: "user exists"})
        }
        
        //check for email if it exists
        
        const emailExists = await pool.query(
            'SELECT * FROM users where email = $1',
            [newUser.email]
        )
        
        if (emailExists.rows.length !== 0) {
            return res.status(400).json({message: "email exists"})
        }
        
        const hashedPassword: string = await bcrypt.hash(newUser.password, 10)
        
        const addUser = await pool.query(
            'INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *', 
            [newUser.email, newUser.username, hashedPassword]
        )
        
        const userInfo = addUser.rows[0]
        const {password, ...user} = userInfo
        const accessToken = generateAccessToken(user)
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN!, {expiresIn: '15m'})
        
        const addRefreshToken = await pool.query(
            'INSERT INTO refresh_tokens(user_id, token) VALUES ($1, $2)', 
            [user.user_id, refreshToken]
        )
        res.cookie('accessToken', accessToken, {
            httpOnly: true, 
            secure: false,
            sameSite: 'lax', 
            maxAge: 60 * 1000
        })
    
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax', 
            maxAge: 15 * 60 * 1000
        }).status(200).json({status: 'success'})
    } catch (error) {
        res.status(500).json({status: error})
    }
        
    
})



router.post('/login', async (req, res) => {

    const userCredentials: UserCredentials = req.body.userCredentials
    console.log(userCredentials)

    try {

        const userInfo = await pool.query(
            'SELECT * FROM users WHERE username = $1', 
            [userCredentials.username]
        )


        if (userInfo.rows[0] === undefined) {
            return res.status(400).json({
                status: "user undefined",
                message: 'User does not exist'
            })
        }

        const {password, ...user} = userInfo.rows[0]

        const comparePass = await bcrypt.compare(userCredentials.password, password)

        if (!comparePass) {
            return res.status(400).json({
                status: 'password error',
                message: "Incorrect password"
            })
        }

        console.log("login user payload", user)

        const accessToken = generateAccessToken(user)
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN!, {expiresIn: '15m'
        })

        await pool.query(
            'INSERT INTO refresh_tokens(user_id, token) VALUES($1, $2)',
            [user.user_id, refreshToken]
        )

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax', 
            maxAge: 30 * 60 * 1000
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax', 
            maxAge: 30 * 60 * 1000

        }).status(200).json({status: 'success'})

        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error})
    }
})


router.post('/verify', authenticateToken, async (req, res) => {
    console.log('hit /verify')
    res.status(200).json({status: "success"})
})


function generateAccessToken(user: User) {
    return jwt.sign(user, process.env.ACCESS_TOKEN!, {expiresIn: '10s'})
}
export default router;