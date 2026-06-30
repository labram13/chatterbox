import express from 'express'
import { authenticateToken } from '../../middleware/auth'
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


router.get('/:id', authenticateToken, async (req, res) => {
    console.log(req.params)
    res.json({status: 'test'})

})



export default router