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
            select m1.fk_dm, u.username, u.user_id
            from members m1
            join members m2
            on m1.fk_dm = m2.fk_dm
            join users u
            on m2.fk_user = u.user_id
            where m1.fk_user = $1
            and m2.fk_user != $1 
            `, [user!.user_id])
            
            // console.log(query.rows)

            res.status(200).json({status: 'success', dmList: query.rows})
    } catch (err) {
        res.status(500).json({status: err})
    }

})



export default router