import { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import { sendMessage } from "../controllers/message.controller.js";
import { getMessage } from "../controllers/message.controller.js";

const messageRouter = Router() 


messageRouter.post('/send/:receiver',isAuth,upload.single('image'),sendMessage)
messageRouter.get('/get/:receiver',isAuth,getMessage)

export default messageRouter