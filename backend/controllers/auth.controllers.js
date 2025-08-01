import genToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signUp = async (req,res)=>{
  try {
    const {username,email,password}= req.body
    
    const checkUsername = await User.findOne({username})
    if(checkUsername){
        return res.status(400).json({message:"Username already exist"})
    }
    const checkEmail = await User.findOne({email})
    if(checkEmail){
        return res.status(400).json({message:"Email already exist"})
    }
    if(password.length<6){
        return res.status(400).json({message: "password must be atlest 6 character"})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user =await User.create({
        username,email,password:hashedPassword
    })
    const token = genToken(user._id)
    res.cookie('token',token,{
        httpOnly:true,
        maxAge:3*24*60*60*1000,
        sameSite:"None",
        secure:true
    }) 
    res.status(201).json(user)

  } catch (error) {
    return res.status(500).json({message:`signup error ${error}`})
  }
}


export const logIn = async (req,res)=>{
  try {
    const {email,password}=req.body
  
    if(password.length<6){
        return res.status(400).json({message: "password must be atlest 6 character"})
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({message: "user doestnot exits"})
    }

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
         return res.status(400).json({message: "password incorrect"})
    }
    const token = genToken(user._id)
    res.cookie('token',token,{
        httpOnly:true,
        maxAge:3*24*60*60*1000,
        sameSite:"None",
        secure:true
    }) 
    res.status(200).json(user)

  } catch (error) {
    return res.status(500).json({message:`signin error ${error}`})
  }
}

export const logOut = async (req,res)=>{
   try {
    res.clearCookie('token')
    return res.status(200).json({message: "logout sucssecfully"})

   } catch (error) {
     return res.status(500).json({message:`logout error ${error}`})
   }
}
