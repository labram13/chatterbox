import express from 'express'
import { authenticateToken } from '../../middleware/auth'
import { roomAuthorization } from '../../middleware/room'
import pool from '../../config/db'
const router = express()

type DMS = {
    dm_id: string,
    username: string,
    // last_message: string
}

type Message = {
    message_id: string,
    fk_dm: string,
    context: string,
    sender: string,
    created_at: Date
}

//create middleware check if user belongs to room
router.get('/:id', authenticateToken, roomAuthorization, async (req, res) => {
    console.log('hit get messages')

    try {
        const messages = await pool.query(`
            SELECT m.*, u.user_id, u.username
            FROM message m
            JOIN users u
            ON m.sender = u.user_id
            WHERE fk_room = $1
            ORDER BY created_at ASC
            `, [req.params.id])
        console.log(messages.rows)
        res.json({status: 'test', messages: messages.rows})
    } catch (error) {
        res.status(500).json({status: error})
    }

})

router.post('/:id', authenticateToken, roomAuthorization, async (req, res) => {
    console.log('hit post message')
    console.log(req.params.id)
    console.log(req.body.message)

    try{
        const message = await pool.query(`
            INSERT INTO message (fk_room, context, sender)
            VALUES ($1, $2, $3)
            RETURNING *
            `, [req.params.id, req.body.message, req.user?.user_id])
        
        const username = await pool.query(`
            SELECT username
            FROM users
            where user_id = $1
            `, [req.user?.user_id])
        message.rows[0].username = username.rows[0].username
        console.log(message.rows[0])
        res.status(200).json({status: 'success', message: message.rows[0]})

    } catch (error) {
        console.log(error)
        res.status(500).json({status: error})
    }
})



export default router