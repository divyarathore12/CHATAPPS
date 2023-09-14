// node server which will handle socket io connection
const io = require('socket.io')(8000, {
    cors: {
      origin: "http://127.0.0.1:5500", // Replace with your actual client's domain
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });
const users={};
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;
        console.log("new-user",name);
        socket.broadcast.emit('user-joined',name)
    })
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    })
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
    })
    
})
