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


        socket.on('join room', (arg) => {
            console.log('joined room', arg)
            socket.join(arg)
            
        })

        socket.on('new message', (arg) => {
            console.log('hitting joined room socket')
            socket.to(arg.id).emit('new message', arg)
        })
        

        socket.on('leave room', (arg) => {
            console.log('left room', arg)
            socket.leave(arg)
        })


        socket.on('disconnect', () => {
            console.log('user disconnected')
            socket.disconnect(true)
        })

       
    })

    return io
}