import {connect} from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse} from 'next/server'

 connect()

 export async function GET(req: NextRequest) {
    try{
        const response = NextResponse.json({
            message: 'Logout successful',
            status: 200,
            success: true
        })
        response.cookies.set('token', '', {
            httpOnly: true,
            expires: new Date(0)
        })
        return response
    }
    catch(err: any){
        return NextResponse.json({
            message: err.message,
            status: 500
        })
    }
 }
