import express from 'express'
import pool from '../../config/db'

const router = express.Router();


type NewUser = {
    username:string,
    email:string,
    password:string
}

type RegisterResponse = {
    usernameStatus: string,
    emailStatus: string
}
router.post('/', (req, res) => {

    const newUser: NewUser = req.body
    console.log(newUser)
    res.status(200).json({status: 'success'})
})

export default router;