import express from 'express'
import cookieParser from 'cookie-parser'
// import pool from './config/db'

const app = express()
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const PORT = 3001;



// pool.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.error('Database connection failed:', err.message);
//   } else {
//     console.log('Connected to PostgreSQL at:', res.rows[0].now);
//   }
// });


type User = {
    username: string,
    age: number
};

app.get('/', (req, res) => {
    const tessa: User = {
        username: "test1",
        age: 12
    }
    res.status(200).json({status: "test", tessa})
    

    
})




app.listen(PORT, () => console.log("listening to port 3001"))
