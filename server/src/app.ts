import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import apiRouter from './routes/api'

const app = express()
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api', apiRouter)

const PORT = process.env.PORT;






app.listen(PORT, () => console.log("listening to port 3001"))
