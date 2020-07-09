const http = require('http')
const express = require('express')
// const { listen } = require('socket.io')
const app = express()
const SERVER_PORT = process.env.PORT || 3344
const socketio = require('socket.io')

const server = http.createServer(app)
const io = socketio(server)

let users = {
    Amit: 'Amit123',
  }
  let socketMap = {}

io.on('connection',(socket)=>{
    console.log('connected with socket id =', socket.id)

    
  function login(s, u) {
    s.join(u)
    s.emit('logged_in')
    socketMap[s.id] = u
    console.log(socketMap)
  }

  socket.on('login', (data) => {
    if (users[data.username]) {
      if (users[data.username] == data.password) {
        login(socket, data.username)
      } else {
        socket.emit('login_failed')
      }
    } else {
      users[data.username] = data.password
      login(socket, data.username)
    }
  })

    socket.on('msg_send',(data)=>{

        data.from = socketMap[socket.id]
        if (data.to) {
          io.to(data.to).emit('msg_rcvd', data)
        } else {
          socket.broadcast.emit('msg_rcvd', data)
        }
      })

     //------Socket websocket theory of sending msg--------   
    //     socket.broadcast.emit('msg_rcvd',data) 
    //     // -- this line will actually work for a chatting app that means will send that msg to every socket(user) except current one.
    //     // console.log('received',data.msg) -- this line is for reading msg on server
    //     // socket.emit('msg_rcvd',data)-- this only send data to single particular msg itself 
    //     // io.emit('msg_rcvd',data) -- but io.emit sends data to every person connected to that server
    // })

    // socket.on('boom',()=>{
    //     console.log('boom received from',socket.id)
    // })

    // setInterval(()=>{
    //     socket.emit('whizz')
    // },2000)

})

app.use('/',express.static(__dirname+'/public'))



server.listen(SERVER_PORT,()=>{
    console.log("server started at http://localhost:3344")

})
