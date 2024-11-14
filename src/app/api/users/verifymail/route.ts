import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";


connectDB()


export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {token}=reqBody;
        console.log(token)

       await User.findOne({})
    } catch (error:any) {
        return NextResponse.json({err:error.message},{status:500})
    }
}