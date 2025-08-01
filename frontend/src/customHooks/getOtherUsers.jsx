import { useEffect } from "react"
 import {serverUrl} from '../main'
import { useDispatch, useSelector } from "react-redux"
import { setOtherUsers } from "../redux/userSlice"
import axios from "axios"


const getOtherUser = ()=>{
    let dispatch = useDispatch()
    let {userData} = useSelector(state=>state.user)
    useEffect(() => {
     const fetchUser = async()=>{
         try {
            const result = await axios.get(`${serverUrl}/api/user/others`,{withCredentials:true})
            dispatch(setOtherUsers(result.data))
         } catch (error) {
            console.error("Error fetching user:", error)
         }
     }
     fetchUser()
     
    },[userData])
}

export default getOtherUser

