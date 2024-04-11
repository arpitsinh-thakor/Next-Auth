import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username already exists']
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists']
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    iseVerified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpire: Date,
    verfiyToken: String,
    verifyTokenExpire: Date
})

const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User;