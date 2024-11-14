'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link'

export default function Profile() {
  const router=useRouter()
  const [userData,setUserData]=useState("nothing")

  const getUserDetails=async()=>{
    try {
      const response=await axios.get("/api/users/me")
      console.log(response?.data.data._id)
      setUserData(response?.data.data._id)
    } catch (error) {
      toast.error("User not found")
    }
  }
   const logout=async()=>{
     try {
      await axios.get("/api/users/logout")
      toast.success("Logout successful")
      router.push("/login")
     } catch (error) {
      toast.error("Something went wrong")
     }
   }
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-black text-center">Details</h2>
        <div className="space-y-4">
          <h2>{userData==="nothing"?"No Data Found":<Link href={`/profile/${userData}`}>{userData}</Link>}</h2>
        </div>
        <div className="mt-5 flex justify-center items-center">
          <button 
          onClick={getUserDetails}
          className='px-4 py-2 bg-emerald-500 text-white rounded   focus:outline-none'>Get User Data</button>
        </div>
        <div className="mt-5 flex justify-center items-center">
          <button 
          onClick={logout}
          className='px-4 py-2 bg-black text-white rounded   focus:outline-none'>Logout</button>
        </div>
      </div>
    </div>
  )
}