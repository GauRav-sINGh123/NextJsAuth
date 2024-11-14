import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/utils/getDataFromToken";

connectDB()

export async function POST(request:NextRequest){
   try {
    const userId:any= await getDataFromToken(request);
    const user:any=await User.findById(userId).select("-password");
    
    if(!user) return NextResponse.json({error:"User not found"},{status:400})
    
    return NextResponse.json({user})
   } catch (error:any) {
    return NextResponse.json({error: error.message}, {status: 400});
}
}