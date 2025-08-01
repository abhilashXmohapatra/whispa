import { useEffect } from "react"
 import {serverUrl} from '../main'
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/userSlice"
import axios from "axios"


const getCurrentUser = ()=>{
    let dispatch = useDispatch()
    useEffect(() => {
     const fetchUser = async()=>{
         try {
            const result = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
            dispatch(setUserData(result.data))
         } catch (error) {
            console.error("Error fetching user:", error)
         }
     }
     fetchUser()
     
    },[])
    
}

export default getCurrentUser