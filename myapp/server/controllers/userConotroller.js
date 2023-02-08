import userModel from "../models/userModel";
import { use } from "../routes";
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import EmailServiceProvider from "../services/emailServiceProvider";



const Sib = require('sib-api-v3-sdk')
import bcrypt from "bcrypt"
require('dotenv').config()

import userDataServiceProvider  from "../services/userDataServiceProvider";
import { token } from "morgan";
const userSignup = async (req, res, next) => {
    try {
     const checkingUser = await userModel.findOne({email: req.body.email})
     if(checkingUser)
     {
        res.status(401).send({
            success:"false",
            message:"user already exsists"
        })
     }
     else
     {

        let newUser =  await userDataServiceProvider.createUser(req.body)

        let result = await EmailServiceProvider.sendTransacEmail(newUser.name, newUser.email);

      
        return res.status(200).json({
            success: true,
            message: "User Registered Successfully",
            data: newUser
        });
     }
      
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message || "Something went wrong"
        });
    }
};

const userSignin = async (req,res,next)=>
{

    
    try{

        const Usersignin= await userDataServiceProvider.signIn(req.body)

        if(Usersignin)
        {
          

                const Token =  jwt.sign({ user_id: Usersignin._id, email: Usersignin.email }, process.env.TOKEN_KEY, {
                expiresIn: "2h" })

                return res.status(201).send({ 
                    success:true,
                    message: "Authorized and succesfully logged in", 
                    data :  Token })

        }
        else
        {
            
            return res.status(401).send({
                message:false,
                message:"not authorized"

            })
            

             
        }

        // return res.status(201).json({
        //     message: "User signed Successfully",
        //     "token": Usersignin})

        


    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message || "Something went wrong"
        })
    }
   
}



export default {
    userSignup,
    userSignin
}