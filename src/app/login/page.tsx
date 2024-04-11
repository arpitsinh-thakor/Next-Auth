'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import {toast} from 'react-toastify';
import {useRouter} from "next/navigation"
import Link from "next/link"

const LoginPage = () => {
  const router = useRouter()

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const onLogin = async () =>{
    try{
      setLoading(true)
      const response = await axios.post("/api/users/login", user)
      toast('Login Successfull', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success'
      });
      router.push("/profile")

      setLoading(false)
    }
    catch(e){
      console.error("sign up failed ",e)
      toast.error("sign up failed")
    }
  }

  useEffect(()=>{
    if(user.email && user.password){
      setButtonDisabled(false)
    }
    else{
      setButtonDisabled(true)
    }
  },[user])

  return (
    <div
      className="flex flex-col items-center justify-center py-2 min-h-screen gap-2"
    >
      <h1 className="text-3xl font-bold m-3">{loading ? "Processing" : "Login"}</h1>
      <p className="text-sm">Please enter your details to login</p>
      <p className="text-sm">Do not have an account?
      <Link 
        className="text-blue-500 p-1 hover:underline"
        href='/signup'>SignUp</Link>
      </p>
      
      
      <label className="text-sm">Email</label>
      <input
        className="border border-gray-300 w-1/4 p-2 rounded-md bg-gray-600 font-bold text-center text-white focus:bg-gray-800"
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e)=>setUser({...user, email: e.target.value})}
      />
      <label className="text-sm">Password</label>
      <input
        className="border border-gray-300 w-1/4 p-2 rounded-md bg-gray-600 font-bold text-center text-white focus:bg-gray-800"
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e)=>setUser({...user, password: e.target.value})}
      />

      {!buttonDisabled && 
        <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={buttonDisabled}
        onClick={onLogin}>
        Login
      </button>}

    </div>
  )
}

export default LoginPage