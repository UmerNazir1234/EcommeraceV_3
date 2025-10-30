import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({settoken}) => {
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')

    const onSubmitHandler =async(e) =>{
        try {
            e.preventDefault();
            const respons = await axios.post(backendUrl + '/admain',{email,password})
            if (respons.data.success) {
                settoken(respons.data.token)
            }else{
                toast.error(respons.data.message)

            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Admin Penal</h1>
            <form onSubmit={onSubmitHandler}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email Adress</p>
                    <input onChange={(e)=>setemail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com' required />
                </div>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input onChange={(e)=>setpassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter your password' required />
                </div>
                <button className='mt-2 w-full py-4 px-4  roundd-md text-white bg-black'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login