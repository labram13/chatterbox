import {Server as httpServer} from 'http'
import {Server as socketServer, Socket} from 'socket.io'

/*
Notes for Socket.io usage

-initialize connection to server from client side using socket= = io(localhost)
-for specific room join, emit a custom event for 'join room' with a passed arguement (room id)
    - once done, server side listens for the event 'join room', then uses socket.join(room) from 'arg' to establish
    connection to the room
-in order to emit messages to the specific room and to everyone else but the sender,
we use socket.to
    -client emits message with room id as arg as socket.emit('new message', roomid)
        - can add other objects to payload so can be {roomid: roomid, message: message}
    -server listens for new message event socket.on('new message')
    -once server hears the event, we grab the room id from arg and emit it to other users
        - example: socket.to(arg.roomid).emit('new message', arg.message)
- finally, client has a useEffect that listens to the event 'new-message'
    - user will only get events inside 'new message' if only part of the room emitted to (socket.to(arg.roomid))


*/

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