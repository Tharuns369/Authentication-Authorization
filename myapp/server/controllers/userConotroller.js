import userModel from "../models/userModel";
import { use } from "../routes";
import Joi from 'joi'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import EmailServiceProvider from "../services/emailServiceProvider";


const Sib = require('sib-api-v3-sdk')
import bcrypt from "bcrypt"
require('dotenv').config()

import userDataServiceProvider from "../services/userDataServiceProvider";
import { token } from "morgan";
// const Reg=/^[a-zA-Z0-9\.]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
const userSignup = async (req, res, next) => {
  try {



    let newUser = await userDataServiceProvider.createUser(req.body)

    return res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      data: newUser
    });

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
        expiresIn: "1h"
      })
      console.log(Token)

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
        message: "please check your name or password"

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
    console.log(process.env.TOKEN_KEY)
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    // console.log(typeof (decoded))
    // console.log(decoded)
    // req.user = verified;   //verified is a variable that stores the decoded JWT payload.
    const id = decoded.user_id
    let user = await userDataServiceProvider.CheckingUserWithId(id)
    if (user) {
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


const verifyEmail = async (req, res, next) => {
  try {
    // const email = req.query
    // let user = await userDataServiceProvider.checkinguser(email)
    // const user = await userModel.findOne({ email: req.query.email });
    const user = await userDataServiceProvider.CheckingUser(req.query.email);

    // const user = await userDataServiceProvider.CheckingUser({ email: req.query.email });
    if (user) {
      user.isVerified = true;
      await user.save();
      return res.status(201).json({
        success: true,
        message: "Email verified successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid Request"
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong"
    });
  }
}
// const updatedata = async(req,res,next)=>
// {
//   try
//   {
//       const token = req.header("auth-token")
//       console.log(token)
//       if (!token) {
//         return res.status(401).send({
//           success: false,
//           message: "Access Denied.",
//         });
//       }
//       else
//       {
//         const decoded = jwt.verify(token, process.env.TOKEN_KEY)
//         const user = await userModel.findOne({ email: decoded.email })
//         console.log(user)

//           // const up = await user.updateOne({password:req.body.password})

//           // user.password=req.body.password
//           console.log(req.body)

//           const hasedpassword = await bcrypt.hash(req.body.password, 10)
//           console.log(hasedpassword)
//           user.password =hasedpassword
//           process.env.TOKEN_KEY = process.env.TOKEN_KEY+hasedpassword
//           await user.save()
//           res.status(200).json(
//             {
//               success:true,
//               message:"successfully updated",
//               data: user
//             }
//           )



// }catch(err)
// {
//     return res.status(401).send(
//       {
//         success:false,
//         message:err.message
//       }


// const TToken = req.header("auth-token")
// console.log(TToken)
// if (!token) {
//   return res.status(401).send({
//     success: false,
//     message: "Access Denied.",
//   });
// }
// else
// {
//   const decoded = jwt.verify(token, process.env.TOKEN_KEY)
//   const user = await userModel.findOne({ email: decoded.email })
//   console.log(user)

// const token = req.header("auth-token")
// console.log(token)
// if (!token) {
//   return res.status(401).send({
//     success: false,
//     message: "Access Denied.",
//   });
// }
// else
// {
//   const decoded = jwt.verify(token, process.env.TOKEN_KEY)
//   const user = await userModel.findOne({ email: decoded.email })
//   console.log(user)
// }


//   }catch(err)
//   {

//     return res.status(400).send({
//       success: false,
//       message: "fjlfsflj"
//     });

//   }

// }

const forgotpassword = async (req, res, next) => {
  try {
    // console.log("hellp")
    // const user = await userModel.findOne({email:req.body.email})
    const user = await userDataServiceProvider.CheckingUser(req.body.email);

    // const user = await userDataServiceProvider.CheckingUser({ email: req.body.email });

    console.log(user)
    if (!user) {

      return res.status(400).json({
        success: false,
        message: "there is no such user"
      })
    }
    else {
      // const reset_token = jwt.sign({ user_id: client.user_id, email: client.email }, process.env.TOKEN_KEY, {
      //   expiresIn: "1h"
      // })

      let result = await EmailServiceProvider.sendVerifyEmail(user.email)
      //  res.status(200).json
      // (
      //   {
      //     success:"true",
      //     message:"verification email is sent to your mail"
      //   }
      // )
      if (user.isVerified === true) {
        // const password=req.body.password

        const hasedpassword = await bcrypt.hash(req.body.password, 10)
        console.log(hasedpassword)
        user.password = hasedpassword
        // process.env.TOKEN_KEY = process.env.TOKEN_KEY+hasedpassword
        await user.save()
        return res.status(200).json(
          {
            success: true,
            message: "verification mail is sent to your email",

          }
        )
      }

    }






  }
  catch (err) {
    return res.status(400).send(
      {
        success: false,
        message: "something fishy"
      }
    )
  }

}


// const updatedatepassword = async(req,res,next)=>
// {
//   try
//   {
//       if

//           const hasedpassword = await bcrypt.hash(req.body.password, 10)
//           console.log(hasedpassword)
//           user.password =hasedpassword
//           process.env.TOKEN_KEY = process.env.TOKEN_KEY+hasedpassword
//           await user.save()
//           res.status(200).json(
//             {
//               success:true,
//               message:"successfully updated",
//               data: user
//             }
//           )

//           }

// }catch(err)
// {
//     return res.status(401).send(
//       {
//         success:false,
//         message:err.message
//       })
//     }
//   }
export default {
  userSignup,
  userSignin,
  userDashboard,
  forgotpassword,
  verifyEmail,

}