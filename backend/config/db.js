import mongoose from "mongoose"

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Mongodb conncted")
    } catch (error) {
        console.log("db error",error.message)
    }
}

export default connectDb