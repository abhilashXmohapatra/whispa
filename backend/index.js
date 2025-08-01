import express from "express"
import dotentv from "dotenv"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cors from 'cors'
import userRouter from "./routes/user.routes.js"
import cookieParser from 'cookie-parser'
import messageRouter from "./routes/message.routes.js"
import { app, server } from "./socket/socket.js"

dotentv.config()

const port = process.env.PORT || 5000


app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/message',messageRouter)

server.listen(port,()=>{
    connectDb()
    console.log(`server is running on the port http://localhost:${port}`)
})
