import userModel from "../models/userModel";
import { use } from "../routes";
import Joi from 'joi'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import EmailServiceProvider from "../services/emailServiceProvider";
import signupSchema from "../services/joivalidation"



const Sib = require('sib-api-v3-sdk')
import bcrypt from "bcrypt"
require('dotenv').config()

import userDataServiceProvider from "../services/userDataServiceProvider";
import { token } from "morgan";
// const Reg=/^[a-zA-Z0-9\.]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
const userSignup = async (req, res, next) => {
  try {
    console.log("hello")

    const { error, value } = await signupSchema.validate(req.body,
      {
        abortEarly: false,
      });

    if (error) {
      console.log(error);
      console.log(req.body.password)
      return res.send(error.details);
    }
    else {

      const checkingUser = await userModel.findOne({ email: req.body.email })
      if (checkingUser) {
        res.status(401).send({
          success: "false",
          message: "user already exsists"
        })
      }
      else {
        let newUser = await userDataServiceProvider.createUser(req.body)

        let result = await EmailServiceProvider.sendTransacEmail(newUser.name, newUser.email);



        return res.status(200).json({
          success: true,
          message: "User Registered Successfully",
          data: newUser
        });
      }

    }

  }


  catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong"
    });
  }
};

const userSignin = async (req, res, next) => {


  try {

    const Usersignin = await userDataServiceProvider.signIn(req.body)

    if (Usersignin) {


      const Token = jwt.sign({ user_id: Usersignin._id, email: Usersignin.email }, process.env.TOKEN_KEY, {
        expiresIn: "2h"
      })

      return res.status(201).send({
        success: true,
        message: "logged in successfully",
        data: {
          id: Usersignin._id,
          name: Usersignin.name,
          email: Usersignin.email
        },
        token: Token
      })

    }
    else {

      return res.status(401).send({
        message: false,
        message: "invalid credintials"

      })



    }




  }
  catch (err) {
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
    return res.status(401).send({
      success: false,
      message: "Access Denied.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(typeof (decoded))
    console.log(decoded)
    // req.user = verified;   //verified is a variable that stores the decoded JWT payload.
    const user = await userModel.findOne({ _id: decoded.user_id })
    if(user)
    {
      return res.status(200).send({
        success: true,
        message: "user profile",
        data: {
          id: user._id,
          name: user.name,
          email: user.email
        },
      })
    }
  ;
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "Invalid token",
    });
  }
};


// const VerifyCationOfMail =async (req,res)=>
// {
//   try
//   {
//     const email = req.query.email
//     const namaste= await userModel.findOne({emali:email})
//     if(namaste)
//     {
//       namaste.isVerified=true
//       await namaste.save()
//       return res.status(200).json(

//         {
//           success:"true",
//           message :"email verified successfully",
//           data :namaste

//         }
//       )
//     }
//     else
//     {
//      return  res.status(401).send(
//         {
//           success:false,
//           message:"invalid request"
//         }
//       )
//     }

// }catch(err)
// {
//     return res.status(401).send(
//       {
//         success:false,
//         message:err.message
//       }
//     )
// }
// }  
const updatedata = async(req,res,next)=>
{
  try
  {
      
      const token = req.header("auth-token")
      console.log(token)
      if (!token) {
        return res.status(401).send({
          success: false,
          message: "Access Denied.",
        });
      }
      else
      {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        const user = await userModel.findOne({ email: decoded.email })
        console.log(user)
        if(user)
        {
          // const up = await user.updateOne({password:req.body.password})
          
          // user.password=req.body.password
          console.log(req.body)
          
          const hasedpassword = await bcrypt.hash(req.body.password, 10)
          console.log(hasedpassword)
          user.password =hasedpassword
          await user.save()
          res.status(200).json(
            {
              success:true,
              message:"successfully updated",
              data: user
            }
          )
        }
        
        
      }
      

  }catch(err)
  {

    return res.status(400).send({
      success: false,
      message: "fjlfsflj"
    });

  }
  
}

export default {
  userSignup,
  userSignin,
  userDashboard,
  updatedata
  // VerifyCationOfMail
}