import express from 'express'
import { authenticateToken } from '../../middleware/auth'
import pool from '../../config/db'
const router = express()

type User = {
    user_id: number,
    username: string,
}

router.get('/dms', authenticateToken, async (req, res) => {
    const user = req.user

    try {

        const query = await pool.query(`
            select dm.dm_id, m.fk_user, u.username
            from direct_messages dm
            join members m
            on dm.dm_id = m.fk_dm
            join users u
            on m.fk_user = u.user_id
            where fk_creator = $1;
            `, [user!.user_id])
            
            // console.log(query.rows)

            res.status(200).json({status: 'success', dmList: query.rows})
    } catch (err) {
        res.status(500).json({status: err})
    }

})



export default router