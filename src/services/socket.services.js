import {Server} from 'socket.io'


export const initSocket = (server) =>
{
    const io = new Server (server, {
        cors: {
            origin: 'http://localhost:3000',
            method: ['GET', 'POST']
        }
    })

    io.on('connection', (socket)=> {
        console.log('User connected with id: ', socket.id);


        socket.on('disconnect', ()=> {
            console.log('User disconnected id with: ');
        })
    })
}
