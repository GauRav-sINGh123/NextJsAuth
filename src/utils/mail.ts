import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from 'bcryptjs'
export const sendEmail=async ({email,emailType,userId}:any)=>{
   
    try {
      const hashedToken = await bcryptjs.hash(userId.toString(),10)
      if(emailType==="VERIFY"){
        await User.findOneAndUpdate(userId,{
          verifyToken:hashedToken,
          verifyTokenExpiry:Date.now()+3600000
        })
       }else if(emailType==="RESET"){
          await User.findOneAndUpdate(userId,{
          forgotPasswordToken:hashedToken,
          forgotPasswordExpiry:Date.now()+1600000
        })
       }
       const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user:process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD
        }
      });
          const mailOptions={
            from: 'gksingh947@gmail.com', 
            to: email,
            subject: emailType==="VERIFY"?"Verify your email":"Reset Password", 
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==="VERIFY"?"verify your email":"reset your password"} or copy and paste this link in your browser<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`, 
          }
          const mailResponse=await transport.sendMail(mailOptions)
          return  mailResponse
    } catch (error:any) {
       throw new Error(error.message)
    }
}