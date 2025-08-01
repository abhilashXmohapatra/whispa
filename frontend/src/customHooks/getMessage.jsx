import { useEffect } from "react"
 import {serverUrl} from '../main'
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../redux/messageSlice"
import axios from "axios"


const getMessage = ()=>{
    let dispatch = useDispatch()
    let {userData,selectedUser} = useSelector(state=>state.user)
    useEffect(() => {
     const fetchMessages= async()=>{
         try {
            const result = await axios.get(`${serverUrl}/api/message/get/${selectedUser._id}`,{withCredentials:true})
            dispatch(setMessages(result.data))
            console.log(result.data)
        } catch (error) {
            console.error("Error fetching user:", error)
            dispatch(setMessages(null))
         }
     }
     fetchMessages()
     
    },[selectedUser,userData])
}

export default getMessage
