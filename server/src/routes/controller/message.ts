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
            SELECT * 
            FROM message m
            JOIN users u
            ON m.sender = u.user_id
            WHERE fk_room = $1
            `, [req.params.id])
        console.log(messages.rows)
        res.json({status: 'test', messages: messages.rows})
    } catch (error) {
        res.status(500).json({status: error})
    }

})



export default router