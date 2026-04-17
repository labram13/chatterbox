import express from 'express'
import pool from '../../config/db.js'

const router = express.Router();


type User = {
    username:string,
    email:string,
    password:string
}

type RegisterResponse = {
    message: string
}
router.post('/', async (req, res) => {

    const newUser: User = req.body
    // console.log(newUser)

    const userExists = await pool.query(
        'SELECT * FROM users where username = $1 OR email = $2',
        [newUser.username, newUser.email]
    )

    if (userExists.rows.length !== 0) {
        return res.status(400).json({message: "user exists"})
    }

    const addUser = await pool.query(
        'INSERT INTO users ('
    )

    
    res.status(200).json({status: 'success'})
})

export default router;