import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({email, emailType, userId}: any) => {
    try{

        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType==='VERIFY'){
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpire: Date.now() + 3600000},
            );
        }
        else if(emailType==='RESET'){
            await User.findByIdAndUpdate(userId, 
                {resetToken: hashedToken, resetTokenExpire: Date.now() + 3600000},
            );
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "deb22c7088abda",
                pass: "7135daf3ec5938"
            }
            });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: `
            <h1>${emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password'}</h1>
            <p>${emailType === 'VERIFY' ? 'Click the link below to verify your email' : 'Click the link below to reset your password'}</p>
            <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Click here</a>
            <p>or copy and paste the following link in your browser</p>
            `
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    }
    catch (error) {
        console.log("Error sending email", error);
    }
}