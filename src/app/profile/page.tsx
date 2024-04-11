'use client'
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const ProfilePage = () => {

    const router = useRouter()
    const [data, setData] = useState(null)
    
    const getUserDetails = async () =>{
        try{
            const res = await axios.post("/api/users/me")
            console.log(res.data.user._id)
            setData(res.data.user._id)
        }
        catch(err: any){
            console.log(err)
        }
    }

    const logout = async ()=>{
        try{
            const res = await axios.get("/api/users/logout")
            console.log("logged out")
            router.push("/login")
        }
        catch(err: any){
            console.log(err)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <h2>{data == null ? "NO DATA FOUND !!" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={getUserDetails}
            >Get User Details</button>
            <br/>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={logout}
            >Logout</button>
        </div>
    )
}

export default ProfilePage