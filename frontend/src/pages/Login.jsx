import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const {token,settoken,navigate,backendUrl } = useContext(ShopContext) 


  const [name,setname]= useState('')
  const [password,setpassword]= useState('')
  const [email,setemail]= useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
    if(currentState== 'Sign up'){
      const response = await axios.post(backendUrl + '/register',{name,email,password} || "http://localhost:5000")
      console.log(response.data);
      if(response.data.success){
        settoken(response.data.token)
        localStorage.setItem('token',response.data.token)
      }else{
        toast.error(response.data.message)
      }

    }else{
      const response = await axios.post(backendUrl + '/login',{email,password})
      if(response.data.success){
        settoken(response.data.message)
        localStorage.setItem('token',response.data.token)
      }else{toast.error(response.data.message)}

    }
    
   } catch (error) {
     console.error("Login error:", error.response?.data || error.message);
  toast.error(error.response?.data?.message || "Login failed");
   }
  };

  useEffect(()=>{
    if(token){
      navigate('/')
    }

  },[token])

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      {/* Header */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Example Inputs */}
      {currentState === 'Login' ? '' : <input onChange={(e)=>setname(e.target.value)} value={name}
        type="text"
        placeholder="Name"
        className="border border-gray-300 px-4 py-2 rounded w-full"
        required
      />}
      <input onChange={(e)=>setemail(e.target.value)} value={email}
        type="email"
        placeholder="Email"
        className="border border-gray-300 px-4 py-2 rounded w-full"
        required
      />
      <input onChange={(e)=>setpassword(e.target.value)} value={password}
        type="password"
        placeholder="Password"
        className="border border-gray-300 px-4 py-2 rounded w-full"
        required
      />
      <div className="w-full justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forget your password</p>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        {currentState}
      </button>

      {/* Toggle between Login and Sign up */}
      <p className="text-sm text-gray-600 mt-2">
        {currentState === "Sign up" ? (
          <>
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setCurrentState("Login")}
            >
              Login
            </span>
          </>
        ) : (
          <>
            Don’t have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setCurrentState("Sign up")}
            >
              Sign up
            </span>
          </>
        )}
      </p>
    </form>
  );
};

export default Login;
