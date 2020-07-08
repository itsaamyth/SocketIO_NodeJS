const http = require('http')
const express = require('express')
const { listen } = require('socket.io')
const app = express()
const socketio = require('socket.io')

const server = http.createServer(app)
const io = socketio(server)

io.on('connnection',(socket)=>{
    console.log('connected with socket id =', socket.id)
})

app.use('/',express.static(__dirname+'/public'))



server.listen(3344,()=>{
    console.log("server started at http://localhost:3344")

})