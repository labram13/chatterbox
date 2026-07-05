import {Server as httpServer} from 'http'
import {Server as socketServer, Socket} from 'socket.io'

export default function socketConnection(httpServer: httpServer): socketServer {
    const io = new socketServer(httpServer, {
        cors: {
            origin: 'http://localhost:5173',
            credentials: true
        }
    })

    io.on('connection', (socket: Socket) => {
        console.log('user connect', socket.id)
        socket.emit('hello', 'world')
    })

    io.on('disconnect', (socket: Socket) => {
        console.log('user disconnected')
    })

    return io
}