import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

connectDB()


export async function GET(request: NextRequest) {
    try {
        const response=NextResponse.json({message:"Logout successful",success:true})
        response.cookies.set("token","",{
            httpOnly:true,
            expires:new Date(0)
        })

    } catch (error:any) {
        return NextResponse.json({err:error.message},{status:500})
    }
}