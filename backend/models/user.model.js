import mongoose, {Schema,model} from "mongoose";

const userSchema = new Schema({
    name: { type: String },
    username: { type: String, required: true , unique: true},
    email: { type: String, required: true , unique: true},
    password: { type: String, required: true},
    image: { type: String, default: ""}
},{
    timestamps:true
})

const User = model("User",userSchema)
export default User