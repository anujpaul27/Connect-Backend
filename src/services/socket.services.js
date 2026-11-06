const {Server} = import('socket.io')

const initSocket = (server) =>
{
    const oi = new Server (server , {
        cors: {
            origin: 'https://localhost:3000',
            method: ['GET', 'POST']
        }
    })

    oi.on('connection', (socket)=> {
        
    })
}

