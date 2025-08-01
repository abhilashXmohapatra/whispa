import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import getCurrentUser from './customHooks/getCurrentUser'
import getOtherUser  from './customHooks/getOtherUsers'
import { useSelector ,useDispatch} from 'react-redux'
import Profile from './pages/Profile.jsx'
import {io} from 'socket.io-client'
import { useEffect } from 'react'
import { serverUrl } from './main.jsx'
import { setOnlineUsers, setSocket } from './redux/userSlice.js'


const App = () => {
  
  getCurrentUser()
  getOtherUser()
  let {userData,socket,onlineUsers}=useSelector(state=>state.user)
  const dispatch =useDispatch()
  useEffect(() => {
  
    if (userData) {

      const socketio = io(`${serverUrl}`,{
        query:{
        userId:userData?._id
        }
      })
      dispatch(setSocket(socketio))
      socketio.on("getOnlineUsers",(users)=>{
        dispatch(setOnlineUsers(users))
      })
      return ()=>socketio.close()
    }else{
      if(socket){
        socket.close()
        dispatch(setSocket(null))
      }
    }
  }, [userData])
  
  return (
    <Routes >
      <Route path='/login' element={!userData?<Login/>:<Navigate to="/"/>}/>
      <Route path='/signup' element={!userData?<SignUp/>:<Navigate to="/profile"/>}/>
      <Route path='/' element={userData?<Home/>:<Navigate to="/login"/>}/>
      <Route path='/profile' element={userData?<Profile/>:<Navigate to="/signup"/>}/>
    </Routes>
  )
}

export default App
