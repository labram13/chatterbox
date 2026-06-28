import express from 'express'
import {roomCheck} from '../../middleware/room'
import { authenticateToken } from '../../middleware/auth'
import pool from '../../config/db'
const router = express()



router.post('/', authenticateToken, roomCheck, async (req, res) => {
    console.log('hit post room')
    
    try {
        const newRoom = await pool.query(
            `
            INSERT INTO room (type)
            VALUES ($1)
            RETURNING room_id
            `,
            ['dm']
        )

        console.log(newRoom.rows[0].room_id)

        const memberOne = await pool.query(
            `
            INSERT INTO members (fk_room, fk_user)
            VALUES
                ($1, $2),
                ($1, $3)
            `,
            [newRoom.rows[0].room_id, req.user?.user_id, req.body.user.user_id]
        )
        res.json({status: 'success', room: newRoom.rows[0].room_id})
    } catch (error) {
        res.status(500).json({status: error})
    }


})

export default router