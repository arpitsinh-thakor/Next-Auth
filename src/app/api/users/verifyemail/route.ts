import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(req: NextRequest) {
    try{
        const reqBody = await req.json()
        const {token} = reqBody
        console.log(token)

        const user = await User.findOne({verfiyToken: token, verifiyTokenExpire: {$gt: Date.now()}})
        if(!user){
            return NextResponse.json({
                message: 'Invalid token or token expired',
                status: 400
            })
        }
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpire = undefined
        await user.save()

        return NextResponse.json({
            message: 'Email verified successfully',
            status: 200
        })
    }
    catch(err: any){
        return NextResponse.json({
            message: err.message,
            status: 500
        })
    }
}