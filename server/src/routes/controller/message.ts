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

router.get('/dms', authenticateToken, async (req, res) => {
    const user = req.user

    try {

        let dms: DMS[] = [];

        const dmsAsCreator = await pool.query(`
            select dm.dm_id, u.user_id, u.username
            from direct_messages dm
            join members m
            on dm.dm_id = m.fk_dm
            join users u
            on m.fk_user = u.user_id
            where fk_creator = $1;
            `, [user!.user_id])
            
        const dmsAsMember = await pool.query(`
                select dm.dm_id, u.user_id, u.username
                from members m
                join direct_messages dm
                    on m.fk_dm = dm.dm_id
                join message msg         
                    on dm.dm_id = msg.fk_dm
                join users u
                    on u.user_id = fk_creator
                WHERE m.fk_user = $1 and dm.fk_creator != $1
                group by dm.dm_id, u.user_id
            `, [user!.user_id])

            dms = [...dmsAsCreator.rows, ...dmsAsMember.rows]

            res.status(200).json({status: 'success', dmList: dms})
    } catch (err) {
        res.status(500).json({status: err})
    }

})

router.get('/', authenticateToken, async (req, res) => {



})



export default router