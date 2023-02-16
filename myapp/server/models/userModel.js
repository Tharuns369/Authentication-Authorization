import mongoose, { Schema } from "mongoose";
import { connect } from "mongoose"
import crypto from "crypto"
import { token } from "morgan";
import { string } from "joi";
const userSchema = new mongoose.Schema({
    name:
    {
        required: true,
        type: String
    },

    email:
    {
        required: true,
        type: String,
        unique: true
    },
    password:
    {
        required: true,
        type: String,
    },
    oldpassword:
    {
        // required:true,
        type:String

    },
    newpassword:
    {
        // required: true,
        type: String,
    },
   
    Email_Verified:
    {
        type: Boolean,
        default: false
    },
    token:
    {
        type:String
    }

})



const userModel = mongoose.model('User', userSchema, 'users')
export default userModel
