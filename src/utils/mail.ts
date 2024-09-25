import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from 'bcryptjs'
import { sendEmail } from "@/utils/mail";

connectDB()

export async function POST(request: NextRequest) {
 try {
    const body = await request.json();
    const { username, email, password } = body;
    //Validation
    if(!username || !email || !password) {
        return  NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }
    const user=await User.findOne({email})
    if(user) {
        return  NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    const newUser=new User({
    email,
    username,
    password:hashedPassword
 })
   const saveUser=await newUser.save()
   console.log(saveUser)

   //Send Verification Email
     await sendEmail({email,emailType:"VERIFY",userId:saveUser._id})

     return NextResponse.json({
        message:"User created successfully",
        success:true,
        saveUser
     })


 } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
 }
}
