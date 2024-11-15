'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Link from 'next/link'

interface User{
  email: string,
  password: string
}


export default function Signup(){
  const router=useRouter()
  const [user,setUser]=useState<User>({
    email: "",
    password: ""
  })
  const [buttonDisabled,setButtonDisabled]=useState(false)
  const [loading,setLoading]=useState(false)
  
  const handleInputData=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }
  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0){
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
    const response = await axios.post("/api/users/login",user)
    console.log("Login success",response.data)
    toast.success("Login success")
    setLoading(false)
    router.push('/profile')
    } catch (error) {
      setLoading(false)
      toast.error("Something went wrong while signing up")
    }
  }
      
    console.log(user)
    return(
      <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl">
        <form className="space-y-6" onSubmit={onSignup}>
          <h2 className="text-3xl font-bold mb-6 text-black text-center">Login</h2>
  
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
              {buttonDisabled?"Please fill all the fields":"Login"}
            </button>
            )
           }
          </div>
        </form>
        <div className="text-center mt-4">
          <Link href="/signup">
           Don't have an Account? Signup
          </Link>
          </div>
      </div>
    </div>
    )
}