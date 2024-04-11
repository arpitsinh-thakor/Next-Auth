'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import {toast} from 'react-toastify';
import {useRouter} from "next/navigation"
import Link from "next/link"

const SignUpPage = () => {

  const router = useRouter()

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const onSignUp = async () =>{
    try{
      setLoading(true)
      const response = await axios.post("/api/users/signup", user)
      toast('Signup Successfull', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success'
      });
      router.push("/login")

      setLoading(false)
    }
    catch(e){
      console.error("sign up failed ",e)
      toast.error("sign up failed")
    }
  }

  useEffect(()=>{
    if(user.username && user.email && user.password){
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
      <h1 className="text-3xl font-bold m-3">{loading ? "Processing" : "SignUp"}</h1>
      <p className="text-sm">Please enter your details to sign up</p>
      <p className="text-sm">Already have an account?  
      <Link 
        className="text-blue-500 p-1 hover:underline"
        href='/login'>Login</Link>
      </p>
      
      <label className="text-sm">Username</label>
      <input
        className="border border-gray-300 w-1/4 p-2 rounded-md bg-gray-600 font-bold text-center text-white focus:bg-gray-800"
        type="text"
        placeholder="Username"
        value={user.username}
        onChange={(e)=>setUser({...user, username: e.target.value})}
      />
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
        onClick={onSignUp}>
        SignUp
      </button>}

    </div>
  )
}

export default SignUpPage