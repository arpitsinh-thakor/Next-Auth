import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
 import { sendEmail } from '@/helpers/mailer';
 import jwt from 'jsonwebtoken'
import { getDataFromToken } from '@/helpers/getDataFromToken';

 connect()

 export async function POST(req: NextRequest) {
    try{
        const userId = await getDataFromToken(req)
        const user = await User.findById({_id: userId})
        if(!user){
            return NextResponse.json({
                message: 'User not found',
                status: 404
            })
        }

        return NextResponse.json({user})
    }
    catch(err: any){
        return NextResponse.json({
            message: err.message,
            status: 500
        })
    }
 }