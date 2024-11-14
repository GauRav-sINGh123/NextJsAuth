'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

interface User{
  username: string,
  email: string,
  password: string
}


export default function Signup(){
  const router=useRouter()
  const [user,setUser]=useState<User>({
    username: "",
    email: "",
    password: ""
  })
  const [buttonDisabled,setButtonDisabled]=useState(false)
  const [loading,setLoading]=useState(false)
  
  const handleInputData=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }
  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 && user.username.length>0){
      setButtonDisabled(false)
    }
    else{
      setButtonDisabled(true)
    }
  },[user])

  const onSignup=async(e:React.FormEvent<HTMLFormElement>)=>{
    e?.preventDefault();
    setLoading(true)
    try {
    const response = await axios.post("/api/users/signup",user)
    console.log("Signup success",response.data)
    toast.success("Signup success")
    setLoading(false)
    router.push('/login')
    } catch (error) {
      toast.error("Something went wrong while signing up")
    }
  }
      
    console.log(user)
    return(
      <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl">
        <form className="space-y-6" onSubmit={onSignup}>
          <h2 className="text-3xl font-bold mb-6 text-black text-center">Sign Up</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
              Username
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-150 ease-in-out"
              id="username"
              type="text"
              value={user.username}
              onChange={handleInputData}
              placeholder="Enter your username"
              name="username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-150 ease-in-out"
              id="email"
              type="email"
              value={user.email}
              onChange={handleInputData}
              placeholder="Enter your email"
              name="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-150 ease-in-out"
              id="password"
              type="password"
              value={user.password}
              onChange={handleInputData}
              placeholder="Enter your password"
              name="password"
            />
          </div>
          <div>
           {
            loading?(
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            ):(
              <button
              className={`w-full px-4 py-2 cursor-pointer text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out`}
              type="submit"
            >
              {buttonDisabled?"Please fill all the fields":"Sign Up"}
            </button>
            )
           }
          </div>
        </form>
      </div>
    </div>
    )
}