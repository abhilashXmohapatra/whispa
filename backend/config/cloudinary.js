import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

const uploadOnCloudinary = async(filePath)=>{
    //congiguration
  cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET 
    });
    
    // Upload an image
    try { 
        const uploadResult = await cloudinary.uploader.upload(filePath)
        fs.unlinkSync(filePath)
        return uploadResult.secure_url
        
    } catch (error) {
        fs.unlinkSync(filePath)
        console.log(error);
    }
       
    
    console.log(uploadResult);
}

export default uploadOnCloudinary