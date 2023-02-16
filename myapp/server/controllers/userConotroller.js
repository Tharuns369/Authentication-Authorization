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


//usersignup
const userSignup = async (req, res, next) => {
  try {
    //creating user after joi validations and checking whether the registered user already exsisted or not
    let newUser = await userDataServiceProvider.createUser(req.body)

    // generating token 
    const Token = jwt.sign({ user_id: newUser._id, email: newUser.email }, process.env.TOKEN_KEY, {
      expiresIn: "1h"
    })

//sending email to the user along with the token to verify
    let sending_email = await EmailServiceProvider.sendVerifyEmail(newUser.email, Token)
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

//usersignin 

const userSignin = async (req, res, next) => {
  try {

    //checking whether the user alerady in db or not
    const Usersignin = await userDataServiceProvider.signIn(req.body)

    if (Usersignin) {

      if (Usersignin.Email_Verified === false) {  //if still in db but not verified it won't allow to login 
        return res.status(401).json(
          {
            success: false,
            message: "email not verified"
          }
        )

      }
      //we are adding userpassword for better security reasons because  when we change passoword it is necssary to expire token or update the token 
      const key = process.env.TOKEN_KEY + Usersignin.password  

      console.log("signinkey", key)



      const Token = jwt.sign({ user_id: Usersignin._id, email: Usersignin.email }, key, {
        expiresIn: "24h"
      })
      console.log(Token)

      return res.status(200).json({
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

      return res.status(401).json({
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

//getprofile
const getprofile = async (req, res, next) => {
  try {
   
    //inorder get the getprofile of the user we need to pass token which was created after sign in .
    const token = req.header("Authorization"); 
    console.log(token)

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied.",
      });
    }
    //decode will decode the payload without verifying the signature.
    const decode = jwt.decode(token);

   //after decoding the payload we got user id and email with the userid we are checking whehter that particular user in db or not
    let user = await userDataServiceProvider.CheckingUserWithId(decode.user_id)


    const key = process.env.TOKEN_KEY + user.password
    console.log("profilekey", key)
    //in order to verify token and decode it we need to use the same key which we used, to create it as we are adding userspassowrd along with token key ,if the passowrd chages it will not verified .it helps when user changes the password old token will not work.
    const verify = jwt.verify(token, key)
    if (verify) {

      return res.status(200).json({
        success: true,
        message: "user profile",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          password: user.password

        },
      })

    }
    else {
      return res.status(401).json
        (
          {
            success: false,
            message: "user not verified"
          }
        )
    }

  } catch (err) {
    console.log(err)
    return res.status(400).json({
      success: false,
      message: "Invalid token",
    });
  }
};

//updaing profile (name)
const updateprofile = async (req, res) => {

  try {

    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied.",
      });
    }
    const decode = jwt.decode(token);
    console.log(decode)
    let user = await userDataServiceProvider.CheckingUserWithId(decode.user_id)
    const key = process.env.TOKEN_KEY + user.password
    const verify = jwt.verify(token, key)
    if (verify) {
      user.name = req.body.name
      await user.save()
      return res.status(200).json({
        success: true,
        message: "user profile updated",
        data: {
          id: user._id,
          name: user.name,
          email: user.email

        },
      })

    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid token",
    });
  }
};


//updating passowrd when user logged in .
const updatepassword = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log(token)
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied.",
      });
    }
    //here also we are doing decode after that we are checking user and later we are verifying jwt with the password.
    const decode = jwt.decode(token);
    console.log(decode)
    let user = await userDataServiceProvider.CheckingUserWithId(decode.user_id)
    const key = process.env.TOKEN_KEY + user.password
    const verify = jwt.verify(token, key)
    if (verify) {
    
      //if user got verified wwe will compare the oldpassword and the userpassword which was already stored in db 
      const isMatch = await bcrypt.compare(req.body.oldpassword, user.password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Old password is incorrect",
        });
      }
      else {
        const hasedpassword = await bcrypt.hash(req.body.newpassword, 10)
        user.password = hasedpassword
        await user.save()
        return res.status(200).json({
          success: true,
          message: "password updated"

        })
      }

    }
    else {
      return res.status(401).json(
        {
          success: false,
          message: "user not verified"
        }
      )
    }

  }
  catch (err) {
    console.log(err)
    return res.status(400).json({
      success: false,
      message: "Invalid token",
    });
  }
};

//verification of mail for registration
const verifyEmail = async (req, res, next) => {
  try {
    let token = req.query.token
    const payload = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await userDataServiceProvider.CheckingUser(payload.email);
    if (user) {
      user.Email_Verified = true;
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

// mail to the user when he forogot the password 
const resetemailverify = async (req, res, next) => {
  try {
    let token = req.query.token
    const payload = jwt.verify(token, process.env.TOKEN_KEY);

    const user = await userDataServiceProvider.CheckingUser(payload.email);
    if (user) {
      return res.status(201).json({
        success: true,
        message: "now you can allow to change the password",
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

//making request via mail after requesting to reset password.
const forgotpasswordrequest = async (req, res, next) => {
  try {

    const user = await userDataServiceProvider.CheckingUser(req.body.email)
    if (user) {


      const Token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.TOKEN_KEY, {
        expiresIn: "24h"

      })
      console.log("namaste", Token)
      let sending_email = await EmailServiceProvider.sendresetlink(req.body.email, Token)

      return res.status(200).json({
        success: true,
        message: "sent email to the user for  reset password"
      })

    }

  }
  catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong"
    });
  }

}

//reseting password
const resetpassword = async (req, res, next) => {
  try {
    let token = req.body.token
    console.log("ha namaste", token)
    let verify = jwt.verify(token, process.env.TOKEN_KEY)
    let user = await userDataServiceProvider.CheckingUser(verify.email)
    if (user) {
      const hasedpassword = await bcrypt.hash(req.body.password, 10)
      user.password = hasedpassword
      await user.save()
      return res.status(200).json({
        success: true,
        message: "reset password successfully"
      })
    }
    else {
      return res.status(401).json
        (
          {
            success: false,
            message: "not a user"
          }
        )
    }

  }
  catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: err.message || "Password reset failed. Please try again later"
    });
  }
}


export default {
  userSignup,
  userSignin,
  getprofile,
  verifyEmail,
  resetemailverify,
  updateprofile,
  updatepassword,
  forgotpasswordrequest,
  resetpassword

}