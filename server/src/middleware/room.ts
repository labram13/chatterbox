import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
import pool from '../config/db'
dotenv.config()



export async function roomCheck(req:Request, res:Response, next:NextFunction) {

    const sameRoom = await pool.query(
        `
        SELECT m1.fk_room
        FROM members m1
        JOIN members m2
        ON m1.fk_room = m2.fk_room
        WHERE m1.fk_user = $1
        AND m2.fk_user = $2 
        `,
        [req.user?.user_id, req.body.user.user_id]
    )

    // console.log(sameRoom.rows)

    // console.log("usercheck", req.user)
    // console.log('user sent over for request', req.body.user)

    //if rows are empty, hit next
    if (sameRoom.rows.length === 0) {
        console.log('no room returned')
        next()
    } else {
        console.log('room exists already with the members in it', sameRoom.rows[0].fk_room)
        return res.json({status: 'room already exists', room: sameRoom.rows[0].fk_room})
    }
    //else return room id for user to navigate to

}