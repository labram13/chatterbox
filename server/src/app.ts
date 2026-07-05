import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import apiRouter from './routes/api'
import {Server} from 'socket.io'
import {createServer} from 'http'
import socketConnection from '../src/config/socket'

declare global{
  namespace Express{
    interface Request {
      io: Server
    }
  }
}

const app = express()
const PORT = process.env.PORT;
const httpServer = createServer(app)
const io = socketConnection(httpServer)


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use((req, res, next)=> {
  req.io = io
  next()
})


app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/api', apiRouter)







httpServer.listen(PORT, () => console.log("listening to port 3001"))
