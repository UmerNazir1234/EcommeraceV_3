import React, { useEffect, useState } from 'react'
import './index.css'
import Navebar from './components/navebar'
import Sidebar from './components/Sidebar'
import { Routes,Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import Login from './components/Login'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency= '$'


const App = () => {
  const [token,settoken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(()=>{
    localStorage.setItem('token',token)

  },[token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {token === ""
      ? <Login settoken={settoken}/>:
      <>
   <Navebar settoken={settoken}/>
   <hr />
   
   <div className='flex w-full'>
    <Sidebar/>
    <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-500 text-base'>
      <Routes>
        <Route path='/add' element={<Add token={token}/>} />
        <Route path='/list' element={<List token={token}/>}/>
        <Route path='/Order' element={<Order token={token}/>}/>
      </Routes>

    </div>

   </div>
   </>}
   
    </div>
  )
}

export default App

