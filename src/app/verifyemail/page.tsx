'use client'
import { useEffect, useState } from "react"
import axios from "axios"


const VerifyEmailPage = () => {
    const [token, setToken] = useState('')
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post("/api/users/verifyemail", { token })
            setVerified(true)   
            setError(false)
        } catch (e: any) {
            console.error("verification failed ", e)
            setError(true)
        }
    }

    useEffect(() => {
        setError(false)
        const urlToken =  window.location.search.split('=')[1]
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        setError(false)
        if(token){
            verifyUserEmail()
        }
    }, [token])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl ">Verify Email</h1>
        <h2 className="text-2xl">{token ? `${token}` : "no-token"}</h2>
        {
            verified && <p className="text-green-600">Email Verified</p>
        }
        {
            error && <p className="text-red-600">Verification Failed</p>
        }
    </div>
  )
}

export default VerifyEmailPage