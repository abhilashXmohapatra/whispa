import { json } from "express"
import uploadOnCloudinary from "../config/cloudinary.js"
import User from "../models/user.model.js"

export const getCurrentUser = async (req,res)=>{
    try {
        const userId = req.userId
        const user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:`current User error ${error}`})
    }
}

export const editProfile = async(req,res)=>{
try {
    let {name}=req.body
    let image
    if(req.file){
        image =await uploadOnCloudinary(req.file.path)
    }
    let user = await User.findByIdAndUpdate(req.userId,{
        name,
        image
    },{new:true})
    if(!user){
        res.status(400).json({message:"user not found"})
    }
  return res.status(200).json(user)

} catch (error) {
      return res.status(500).json({message:`Profile edit error ${error}`})
}
}

export const getOtherUsers = async(req,res)=>{
    try {
      let users = await User.find({
        _id:{$ne:req.userId}
      }).select('-password')
       return res.status(200).json(users)
    } catch (error) {
         return res.status(500).json({message:`get other user error ${error}`})
        }
    }
    
    export const search=async(req,res)=>{
        try {
        const userId = req.userId

            let {query}=req.query
            if(!query){
                return res.status(400).json({message:"query is required"})
            }
            let users= await User.find({
                $or:[
                    {name:{$regex:query,$options:"i"}},
                    {username:{$regex:query,$options:"i"}},
                ],
                _id: { $ne: userId },
                
            })
            return res.status(200).json(users)
        } catch (error) {
        return res.status(500).json({message:`user not found ${error}`})
        
    }
}