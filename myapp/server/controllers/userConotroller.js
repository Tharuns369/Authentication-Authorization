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
const Reg=/^[a-zA-Z0-9\.]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
const userSignup = async (req, res, next) => {
    try {

           if (Reg.test(req.body.email))
           {

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




           }
           else
           {
                return res.status(401).send(
                    {
                        success:false,
                        message:'please enter valid email'
                    }
                )
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
                    message: "logged in successfully", 
                    data : {  id:Usersignin._id,
                              name : Usersignin.name ,
                              email:  Usersignin.email},
                    token :  Token })

        }
        else
        {
            
            return res.status(401).send({
                message:false,
                message:"invalid credintials"

            })
            

             
        }

        


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

// const jwt = require("jsonwebtoken");

const userDashboard = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(400).send({
      success: false,
      message: "Access Denied. No token provided.",
    });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = verified;   //verified is a variable that stores the decoded JWT payload.
    const user = await userModel.findOne({_id:verified.user_id})
    return res.status(200).send({
      success: true,
      message: "user data",
      data :  {
               id : user._id,
               name:user.name,
               email:user.email
              },
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "Invalid token",
    });
  }
};

  


export default {
    userSignup,
    userSignin,
    userDashboard
}