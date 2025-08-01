import http from "http"
import express from 'express'
import { Server } from "socket.io"

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'https://whispa.onrender.com'
    }
})
 
export const getReceiverSocketId=(receiver)=>{
    return userSocketMap[receiver]
}

const userSocketMap = {}
io.on('connection', (socket) => {

   const userId=socket.handshake.query.userId
   if(userId != undefined){
    userSocketMap[userId]=socket.id
   }
   io.emit('getOnlineUsers',Object.keys(userSocketMap))
   
   socket.on("disconnect", () => {
    delete   userSocketMap[userId]
    io.emit('getOnlineUsers',Object.keys(userSocketMap))
   
});
})


export { app, server, io }
