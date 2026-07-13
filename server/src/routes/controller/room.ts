import express from 'express'
// import {roomCheck} from '../../middleware/room'
import { authenticateToken } from '../../middleware/auth'
import pool from '../../config/db'
// import { roomCheck } from '../../middleware/room'
const router = express()


router.post('/check', authenticateToken, async (req, res) => {
    console.log('hit room check')
    console.log(req.body.user)
    try {

        const sameRoom = await pool.query(
            `
            SELECT m1.fk_room
            FROM members m1
            JOIN members m2
            ON m1.fk_room = m2.fk_room
            WHERE m1.fk_user = $1
            AND m2.fk_user = $2 
            `,
            [req.user?.user_id, req.body.user_id]
        )
        
        // console.log(sameRoom.rows)
        
        // console.log("usercheck", req.user)
        // console.log('user sent over for request', req.body.user)
        
        //if rows are empty, hit next
        if (sameRoom.rows.length === 0) {
            console.log('no room returned')
            // next()
            return res.json({exists: false})
        } else {
            console.log('room exists already with the members in it', sameRoom.rows[0].fk_room)
            return res.json({exists: true, room: sameRoom.rows[0].fk_room})
        }
        //else return room id for user to navigate to
    } catch (error) {
        console.log('error getting room', error)
        res.status(500).json({status: error})
    }

})


router.post('/', authenticateToken, async (req, res) => {
    console.log('hit post room')
    // console.log(req.body)

    // res.json({status: 'test'})
    
    try {
        const newRoom = await pool.query(
            `
            INSERT INTO room (type)
            VALUES ($1)
            RETURNING room_id
            `,
            ['dm']
        )

        // console.log(newRoom.rows[0].room_id)

        const newMembers = await pool.query(
            `
            INSERT INTO members (fk_room, fk_user)
            VALUES
                ($1, $2),
                ($1, $3)
            `,
            [newRoom.rows[0].room_id, req.user?.user_id, req.body.user_id]
        )
        // console.log(req.body.message);
        const firstMessage = await pool.query(
            `
            INSERT INTO message (fk_room, context, sender)
            VALUES
                ($1, $2, $3)
            `,
            [newRoom.rows[0].room_id, req.body.message, req.user?.user_id]
        )

        console.log(firstMessage)
        res.json({status: 'success', room: newRoom.rows[0].room_id})
    } catch (error) {
        res.status(500).json({status: error})
    }
})

router.get('/', authenticateToken, async (req, res) => {

    try {

        const dmList = await pool.query(
            `
            select m2.fk_user, m2.fk_room, u.username
            from members m1
            join members m2
            on m1.fk_room = m2.fk_room
            join users u
            on m2.fk_user = u.user_id 
            where m1.fk_user = $1
            and m2.fk_user != $1
            `,
            [req.user?.user_id]
        )

        // console.log('dmlist', dmList.rows)
        res.status(200).json({status: 'success', dmList: dmList.rows})
        
    } catch (error) {
        res.status(500).json({status: error})
    }
})

router.get('/room-info/:id', authenticateToken, async (req, res) => {
    console.log(req.params.id)
    try {
        const roomInfo = await pool.query(`
            SELECT u.username 
            FROM room r
            JOIN members m
            ON r.room_id = m.fk_room
            JOIN users u
            on m.fk_user = u.user_id
            WHERE r.room_id = $1
            AND u.user_id != $2
            `, [req.params.id, req.user?.user_id])
        console.log(roomInfo.rows[0])
        res.status(200).json({status: 'success', roomInfo: roomInfo})
    } catch (error) {
        res.status(500).json({status: error})
    }
})



export default router