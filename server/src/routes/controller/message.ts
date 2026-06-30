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
    res.json({status: 'test'})

})



export default router