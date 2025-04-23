const io = require('socket.io')(3000, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
})

io.on('connection', socket => {
    console.log(socket.id)

    socket.on('customEvent', data => {
        console.log(data)
    })

    socket.on('sendMessage', data => {
        console.log(data)
    })
})

