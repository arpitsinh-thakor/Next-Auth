import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
 import { sendEmail } from '@/helpers/mailer';
 import jwt from 'jsonwebtoken'

 connect()

 export async function POST(req: NextRequest) {
     try{
         const reqBody = await req.json()
         const {email, password} = reqBody
         console.log(reqBody)

         const user = await User.findOne({email: email})
         if(!user){
             return NextResponse.json({
                 message: 'Invalid email',
                 status: 400
             })
         }

         const isMatch = await bcryptjs.compare(password, user.password)
         if(!isMatch){
             return NextResponse.json({
                 message: 'Invalid password',
                 status: 400
             })
         }

        const tokenData = {
            id: user._id,
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1h'})
        
        const respone = NextResponse.json({
            message: 'Login successful',
            status: 200,
            data: token
        })
        respone.cookies.set('token', token, {
            httpOnly: true,
        })
        return respone
     }
     catch(err: any){
         return NextResponse.json({
             message: err.message,
             status: 500
         })
     }  
 }