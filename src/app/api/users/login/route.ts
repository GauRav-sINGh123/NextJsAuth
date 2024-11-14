import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

connectDB()

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {email,password}=reqBody
        if(!email || !password) {
            return NextResponse.json({error:"All fields are required"},{status:400})
        }
        const user=await User.findOne({email})
        if(!user) {
            return NextResponse.json({error:"Invalid Credentials"},{status:400})
        }
        
        console.log("User exists")
        const isPasswordCorrect=await bcrypt.compare(password,user.password)
        
        if(!isPasswordCorrect) {
            return NextResponse.json({error:"Invalid Credentials"},{status:400})
        }
        
       const tokenData={
        id:user._id,
        username:user.username,
        email:user.email
       }

       const token=jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})
       
       const response=NextResponse.json(
        {
            message:"Login successful",
            success:true}
            ,{status:200}
        )
       
       response.cookies.set("token",token,{httpOnly:true})

       return response

    } catch (error:any) {
        return NextResponse.json({err:error.message},{status:500})
    }
}