import mongoose, { Schema }  from "mongoose";
import { connect } from "mongoose"
import crypto from "crypto"
const userSchema = new mongoose.Schema({
    name : 
    {
        required : true ,
        type : String 
    },

    email :
    {
        required : true ,
        type : String,
        unique: true
        },
    password:
    {
        required: true,
        type : String,
    }
  })



const userModel = mongoose.model('User',userSchema,'users')
export default userModel
