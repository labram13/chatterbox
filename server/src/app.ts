import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import pool from './config/db'

const app = express()
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT;



pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to PostgreSQL at:', res.rows[0].now);
  }
});



type User = {
    username: string,
    age: number
};

app.get('/', async (req, res) => {
    // const tessa: User = {
    //     username: "test1",
    //     age: 32
    // }
    // res.status(200).json({status: "test", tessa})
    try {
        const result = await pool.query('select * from users')
        res.json(result.rows)


    } catch (error) {
        res.status(500).json({status: "error"})
    }
    
    

    
})




app.listen(PORT, () => console.log("listening to port 3001"))
