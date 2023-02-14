"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _userModel = _interopRequireDefault(require("../models/userModel"));
var _routes = require("../routes");
var _joi = _interopRequireDefault(require("joi"));
var _crypto = _interopRequireDefault(require("crypto"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _emailServiceProvider = _interopRequireDefault(require("../services/emailServiceProvider"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _userDataServiceProvider = _interopRequireDefault(require("../services/userDataServiceProvider"));
var _morgan = require("morgan");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Sib = require('sib-api-v3-sdk');
require('dotenv').config();
// const Reg=/^[a-zA-Z0-9\.]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
const userSignup = async (req, res, next) => {
  try {
    let newUser = await _userDataServiceProvider.default.createUser(req.body);
    return res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      data: newUser
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong"
    });
  }
};
const userSignin = async (req, res, next) => {
  try {
    const Usersignin = await _userDataServiceProvider.default.signIn(req.body);
    if (Usersignin) {
      const Token = _jsonwebtoken.default.sign({
        user_id: Usersignin._id,
        email: Usersignin.email
      }, process.env.TOKEN_KEY, {
        expiresIn: "1h"
      });
      console.log(Token);
      return res.status(201).send({
        success: true,
        message: "logged in successfully",
        data: {
          id: Usersignin._id,
          name: Usersignin.name,
          email: Usersignin.email
        },
        token: Token
      });
    } else {
      return res.status(401).send({
        message: false,
        message: "please check your name or password"
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

// const jwt = require("jsonwebtoken");

const userDashboard = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Access Denied."
    });
  }
  try {
    console.log(process.env.TOKEN_KEY);
    const decoded = _jsonwebtoken.default.verify(token, process.env.TOKEN_KEY);
    // console.log(typeof (decoded))
    // console.log(decoded)
    // req.user = verified;   //verified is a variable that stores the decoded JWT payload.
    const id = decoded.user_id;
    let user = await _userDataServiceProvider.default.CheckingUserWithId(id);
    if (user) {
      return res.status(200).send({
        success: true,
        message: "user profile",
        data: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    }
    ;
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "Invalid token"
    });
  }
};
const verifyEmail = async (req, res, next) => {
  try {
    // const email = req.query
    // let user = await userDataServiceProvider.checkinguser(email)
    // const user = await userModel.findOne({ email: req.query.email });
    const user = await _userDataServiceProvider.default.CheckingUser(req.query.email);

    // const user = await userDataServiceProvider.CheckingUser({ email: req.query.email });
    if (user) {
      user.isVerified = true;
      await user.save();
      return res.status(201).json({
        success: true,
        message: "Email verified successfully"
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid Request"
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
    const user = await _userDataServiceProvider.default.CheckingUser(req.body.email);

    // const user = await userDataServiceProvider.CheckingUser({ email: req.body.email });

    console.log(user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "there is no such user"
      });
    } else {
      // const reset_token = jwt.sign({ user_id: client.user_id, email: client.email }, process.env.TOKEN_KEY, {
      //   expiresIn: "1h"
      // })

      let result = await _emailServiceProvider.default.sendVerifyEmail(user.email);
      //  res.status(200).json
      // (
      //   {
      //     success:"true",
      //     message:"verification email is sent to your mail"
      //   }
      // )
      if (user.isVerified === true) {
        // const password=req.body.password

        const hasedpassword = await _bcrypt.default.hash(req.body.password, 10);
        console.log(hasedpassword);
        user.password = hasedpassword;
        // process.env.TOKEN_KEY = process.env.TOKEN_KEY+hasedpassword
        await user.save();
        return res.status(200).json({
          success: true,
          message: "verification mail is sent to your email"
        });
      }
    }
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "something fishy"
    });
  }
};

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
var _default = {
  userSignup,
  userSignin,
  userDashboard,
  forgotpassword,
  verifyEmail
};
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTaWIiLCJyZXF1aXJlIiwiY29uZmlnIiwidXNlclNpZ251cCIsInJlcSIsInJlcyIsIm5leHQiLCJuZXdVc2VyIiwidXNlckRhdGFTZXJ2aWNlUHJvdmlkZXIiLCJjcmVhdGVVc2VyIiwiYm9keSIsInN0YXR1cyIsImpzb24iLCJzdWNjZXNzIiwibWVzc2FnZSIsImRhdGEiLCJlcnIiLCJjb25zb2xlIiwibG9nIiwidXNlclNpZ25pbiIsIlVzZXJzaWduaW4iLCJzaWduSW4iLCJUb2tlbiIsImp3dCIsInNpZ24iLCJ1c2VyX2lkIiwiX2lkIiwiZW1haWwiLCJwcm9jZXNzIiwiZW52IiwiVE9LRU5fS0VZIiwiZXhwaXJlc0luIiwic2VuZCIsImlkIiwibmFtZSIsInRva2VuIiwidXNlckRhc2hib2FyZCIsImhlYWRlciIsImRlY29kZWQiLCJ2ZXJpZnkiLCJ1c2VyIiwiQ2hlY2tpbmdVc2VyV2l0aElkIiwidmVyaWZ5RW1haWwiLCJDaGVja2luZ1VzZXIiLCJxdWVyeSIsImlzVmVyaWZpZWQiLCJzYXZlIiwiZm9yZ290cGFzc3dvcmQiLCJyZXN1bHQiLCJFbWFpbFNlcnZpY2VQcm92aWRlciIsInNlbmRWZXJpZnlFbWFpbCIsImhhc2VkcGFzc3dvcmQiLCJiY3J5cHQiLCJoYXNoIiwicGFzc3dvcmQiXSwic291cmNlcyI6WyIuLi8uLi9zZXJ2ZXIvY29udHJvbGxlcnMvdXNlckNvbm90cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1c2VyTW9kZWwgZnJvbSBcIi4uL21vZGVscy91c2VyTW9kZWxcIjtcclxuaW1wb3J0IHsgdXNlIH0gZnJvbSBcIi4uL3JvdXRlc1wiO1xyXG5pbXBvcnQgSm9pIGZyb20gJ2pvaSdcclxuaW1wb3J0IGNyeXB0byBmcm9tICdjcnlwdG8nXHJcbmltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJ1xyXG5pbXBvcnQgRW1haWxTZXJ2aWNlUHJvdmlkZXIgZnJvbSBcIi4uL3NlcnZpY2VzL2VtYWlsU2VydmljZVByb3ZpZGVyXCI7XHJcblxyXG5cclxuY29uc3QgU2liID0gcmVxdWlyZSgnc2liLWFwaS12My1zZGsnKVxyXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRcIlxyXG5yZXF1aXJlKCdkb3RlbnYnKS5jb25maWcoKVxyXG5cclxuaW1wb3J0IHVzZXJEYXRhU2VydmljZVByb3ZpZGVyIGZyb20gXCIuLi9zZXJ2aWNlcy91c2VyRGF0YVNlcnZpY2VQcm92aWRlclwiO1xyXG5pbXBvcnQgeyB0b2tlbiB9IGZyb20gXCJtb3JnYW5cIjtcclxuLy8gY29uc3QgUmVnPS9eW2EtekEtWjAtOVxcLl0rQFthLXpBLVowLTktXSsoPzouW2EtekEtWjAtOS1dKykqJC9cclxuY29uc3QgdXNlclNpZ251cCA9IGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gIHRyeSB7XHJcblxyXG5cclxuXHJcbiAgICBsZXQgbmV3VXNlciA9IGF3YWl0IHVzZXJEYXRhU2VydmljZVByb3ZpZGVyLmNyZWF0ZVVzZXIocmVxLmJvZHkpXHJcblxyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgbWVzc2FnZTogXCJVc2VyIFJlZ2lzdGVyZWQgU3VjY2Vzc2Z1bGx5XCIsXHJcbiAgICAgIGRhdGE6IG5ld1VzZXJcclxuICAgIH0pO1xyXG5cclxuICB9XHJcbiAgY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7XHJcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZSB8fCBcIlNvbWV0aGluZyB3ZW50IHdyb25nXCJcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IHVzZXJTaWduaW4gPSBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcclxuXHJcblxyXG4gIHRyeSB7XHJcblxyXG4gICAgY29uc3QgVXNlcnNpZ25pbiA9IGF3YWl0IHVzZXJEYXRhU2VydmljZVByb3ZpZGVyLnNpZ25JbihyZXEuYm9keSlcclxuXHJcbiAgICBpZiAoVXNlcnNpZ25pbikge1xyXG5cclxuXHJcbiAgICAgIGNvbnN0IFRva2VuID0gand0LnNpZ24oeyB1c2VyX2lkOiBVc2Vyc2lnbmluLl9pZCwgZW1haWw6IFVzZXJzaWduaW4uZW1haWwgfSwgcHJvY2Vzcy5lbnYuVE9LRU5fS0VZLCB7XHJcbiAgICAgICAgZXhwaXJlc0luOiBcIjFoXCJcclxuICAgICAgfSlcclxuICAgICAgY29uc29sZS5sb2coVG9rZW4pXHJcblxyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDEpLnNlbmQoe1xyXG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgbWVzc2FnZTogXCJsb2dnZWQgaW4gc3VjY2Vzc2Z1bGx5XCIsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgaWQ6IFVzZXJzaWduaW4uX2lkLFxyXG4gICAgICAgICAgbmFtZTogVXNlcnNpZ25pbi5uYW1lLFxyXG4gICAgICAgICAgZW1haWw6IFVzZXJzaWduaW4uZW1haWxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRva2VuOiBUb2tlblxyXG4gICAgICB9KVxyXG5cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG5cclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5zZW5kKHtcclxuICAgICAgICBtZXNzYWdlOiBmYWxzZSxcclxuICAgICAgICBtZXNzYWdlOiBcInBsZWFzZSBjaGVjayB5b3VyIG5hbWUgb3IgcGFzc3dvcmRcIlxyXG5cclxuICAgICAgfSlcclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gIH1cclxuICBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcclxuICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlIHx8IFwiU29tZXRoaW5nIHdlbnQgd3JvbmdcIlxyXG4gICAgfSlcclxuICB9XHJcblxyXG59XHJcblxyXG4vLyBjb25zdCBqd3QgPSByZXF1aXJlKFwianNvbndlYnRva2VuXCIpO1xyXG5cclxuY29uc3QgdXNlckRhc2hib2FyZCA9IGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gIGNvbnN0IHRva2VuID0gcmVxLmhlYWRlcihcImF1dGgtdG9rZW5cIik7XHJcblxyXG4gIGlmICghdG9rZW4pIHtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuc2VuZCh7XHJcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICBtZXNzYWdlOiBcIkFjY2VzcyBEZW5pZWQuXCIsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zb2xlLmxvZyhwcm9jZXNzLmVudi5UT0tFTl9LRVkpXHJcbiAgICBjb25zdCBkZWNvZGVkID0gand0LnZlcmlmeSh0b2tlbiwgcHJvY2Vzcy5lbnYuVE9LRU5fS0VZKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHR5cGVvZiAoZGVjb2RlZCkpXHJcbiAgICAvLyBjb25zb2xlLmxvZyhkZWNvZGVkKVxyXG4gICAgLy8gcmVxLnVzZXIgPSB2ZXJpZmllZDsgICAvL3ZlcmlmaWVkIGlzIGEgdmFyaWFibGUgdGhhdCBzdG9yZXMgdGhlIGRlY29kZWQgSldUIHBheWxvYWQuXHJcbiAgICBjb25zdCBpZCA9IGRlY29kZWQudXNlcl9pZFxyXG4gICAgbGV0IHVzZXIgPSBhd2FpdCB1c2VyRGF0YVNlcnZpY2VQcm92aWRlci5DaGVja2luZ1VzZXJXaXRoSWQoaWQpXHJcbiAgICBpZiAodXNlcikge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoe1xyXG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgbWVzc2FnZTogXCJ1c2VyIHByb2ZpbGVcIixcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBpZDogdXNlci5faWQsXHJcbiAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXHJcbiAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICA7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xyXG4gICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgbWVzc2FnZTogXCJJbnZhbGlkIHRva2VuXCIsXHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcblxyXG5cclxuY29uc3QgdmVyaWZ5RW1haWwgPSBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICB0cnkge1xyXG4gICAgLy8gY29uc3QgZW1haWwgPSByZXEucXVlcnlcclxuICAgIC8vIGxldCB1c2VyID0gYXdhaXQgdXNlckRhdGFTZXJ2aWNlUHJvdmlkZXIuY2hlY2tpbmd1c2VyKGVtYWlsKVxyXG4gICAgLy8gY29uc3QgdXNlciA9IGF3YWl0IHVzZXJNb2RlbC5maW5kT25lKHsgZW1haWw6IHJlcS5xdWVyeS5lbWFpbCB9KTtcclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB1c2VyRGF0YVNlcnZpY2VQcm92aWRlci5DaGVja2luZ1VzZXIocmVxLnF1ZXJ5LmVtYWlsKTtcclxuXHJcbiAgICAvLyBjb25zdCB1c2VyID0gYXdhaXQgdXNlckRhdGFTZXJ2aWNlUHJvdmlkZXIuQ2hlY2tpbmdVc2VyKHsgZW1haWw6IHJlcS5xdWVyeS5lbWFpbCB9KTtcclxuICAgIGlmICh1c2VyKSB7XHJcbiAgICAgIHVzZXIuaXNWZXJpZmllZCA9IHRydWU7XHJcbiAgICAgIGF3YWl0IHVzZXIuc2F2ZSgpO1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDEpLmpzb24oe1xyXG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgbWVzc2FnZTogXCJFbWFpbCB2ZXJpZmllZCBzdWNjZXNzZnVsbHlcIixcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oe1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgIG1lc3NhZ2U6IFwiSW52YWxpZCBSZXF1ZXN0XCJcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oe1xyXG4gICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfHwgXCJTb21ldGhpbmcgd2VudCB3cm9uZ1wiXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuLy8gY29uc3QgdXBkYXRlZGF0YSA9IGFzeW5jKHJlcSxyZXMsbmV4dCk9PlxyXG4vLyB7XHJcbi8vICAgdHJ5XHJcbi8vICAge1xyXG4vLyAgICAgICBjb25zdCB0b2tlbiA9IHJlcS5oZWFkZXIoXCJhdXRoLXRva2VuXCIpXHJcbi8vICAgICAgIGNvbnNvbGUubG9nKHRva2VuKVxyXG4vLyAgICAgICBpZiAoIXRva2VuKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5zZW5kKHtcclxuLy8gICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4vLyAgICAgICAgICAgbWVzc2FnZTogXCJBY2Nlc3MgRGVuaWVkLlwiLFxyXG4vLyAgICAgICAgIH0pO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICAgIGVsc2VcclxuLy8gICAgICAge1xyXG4vLyAgICAgICAgIGNvbnN0IGRlY29kZWQgPSBqd3QudmVyaWZ5KHRva2VuLCBwcm9jZXNzLmVudi5UT0tFTl9LRVkpXHJcbi8vICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHVzZXJNb2RlbC5maW5kT25lKHsgZW1haWw6IGRlY29kZWQuZW1haWwgfSlcclxuLy8gICAgICAgICBjb25zb2xlLmxvZyh1c2VyKVxyXG5cclxuLy8gICAgICAgICAgIC8vIGNvbnN0IHVwID0gYXdhaXQgdXNlci51cGRhdGVPbmUoe3Bhc3N3b3JkOnJlcS5ib2R5LnBhc3N3b3JkfSlcclxuXHJcbi8vICAgICAgICAgICAvLyB1c2VyLnBhc3N3b3JkPXJlcS5ib2R5LnBhc3N3b3JkXHJcbi8vICAgICAgICAgICBjb25zb2xlLmxvZyhyZXEuYm9keSlcclxuXHJcbi8vICAgICAgICAgICBjb25zdCBoYXNlZHBhc3N3b3JkID0gYXdhaXQgYmNyeXB0Lmhhc2gocmVxLmJvZHkucGFzc3dvcmQsIDEwKVxyXG4vLyAgICAgICAgICAgY29uc29sZS5sb2coaGFzZWRwYXNzd29yZClcclxuLy8gICAgICAgICAgIHVzZXIucGFzc3dvcmQgPWhhc2VkcGFzc3dvcmRcclxuLy8gICAgICAgICAgIHByb2Nlc3MuZW52LlRPS0VOX0tFWSA9IHByb2Nlc3MuZW52LlRPS0VOX0tFWStoYXNlZHBhc3N3b3JkXHJcbi8vICAgICAgICAgICBhd2FpdCB1c2VyLnNhdmUoKVxyXG4vLyAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oXHJcbi8vICAgICAgICAgICAgIHtcclxuLy8gICAgICAgICAgICAgICBzdWNjZXNzOnRydWUsXHJcbi8vICAgICAgICAgICAgICAgbWVzc2FnZTpcInN1Y2Nlc3NmdWxseSB1cGRhdGVkXCIsXHJcbi8vICAgICAgICAgICAgICAgZGF0YTogdXNlclxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICApXHJcblxyXG5cclxuXHJcbi8vIH1jYXRjaChlcnIpXHJcbi8vIHtcclxuLy8gICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuc2VuZChcclxuLy8gICAgICAge1xyXG4vLyAgICAgICAgIHN1Y2Nlc3M6ZmFsc2UsXHJcbi8vICAgICAgICAgbWVzc2FnZTplcnIubWVzc2FnZVxyXG4vLyAgICAgICB9XHJcblxyXG5cclxuLy8gY29uc3QgVFRva2VuID0gcmVxLmhlYWRlcihcImF1dGgtdG9rZW5cIilcclxuLy8gY29uc29sZS5sb2coVFRva2VuKVxyXG4vLyBpZiAoIXRva2VuKSB7XHJcbi8vICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5zZW5kKHtcclxuLy8gICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4vLyAgICAgbWVzc2FnZTogXCJBY2Nlc3MgRGVuaWVkLlwiLFxyXG4vLyAgIH0pO1xyXG4vLyB9XHJcbi8vIGVsc2VcclxuLy8ge1xyXG4vLyAgIGNvbnN0IGRlY29kZWQgPSBqd3QudmVyaWZ5KHRva2VuLCBwcm9jZXNzLmVudi5UT0tFTl9LRVkpXHJcbi8vICAgY29uc3QgdXNlciA9IGF3YWl0IHVzZXJNb2RlbC5maW5kT25lKHsgZW1haWw6IGRlY29kZWQuZW1haWwgfSlcclxuLy8gICBjb25zb2xlLmxvZyh1c2VyKVxyXG5cclxuLy8gY29uc3QgdG9rZW4gPSByZXEuaGVhZGVyKFwiYXV0aC10b2tlblwiKVxyXG4vLyBjb25zb2xlLmxvZyh0b2tlbilcclxuLy8gaWYgKCF0b2tlbikge1xyXG4vLyAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuc2VuZCh7XHJcbi8vICAgICBzdWNjZXNzOiBmYWxzZSxcclxuLy8gICAgIG1lc3NhZ2U6IFwiQWNjZXNzIERlbmllZC5cIixcclxuLy8gICB9KTtcclxuLy8gfVxyXG4vLyBlbHNlXHJcbi8vIHtcclxuLy8gICBjb25zdCBkZWNvZGVkID0gand0LnZlcmlmeSh0b2tlbiwgcHJvY2Vzcy5lbnYuVE9LRU5fS0VZKVxyXG4vLyAgIGNvbnN0IHVzZXIgPSBhd2FpdCB1c2VyTW9kZWwuZmluZE9uZSh7IGVtYWlsOiBkZWNvZGVkLmVtYWlsIH0pXHJcbi8vICAgY29uc29sZS5sb2codXNlcilcclxuLy8gfVxyXG5cclxuXHJcbi8vICAgfWNhdGNoKGVycilcclxuLy8gICB7XHJcblxyXG4vLyAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcclxuLy8gICAgICAgc3VjY2VzczogZmFsc2UsXHJcbi8vICAgICAgIG1lc3NhZ2U6IFwiZmpsZnNmbGpcIlxyXG4vLyAgICAgfSk7XHJcblxyXG4vLyAgIH1cclxuXHJcbi8vIH1cclxuXHJcbmNvbnN0IGZvcmdvdHBhc3N3b3JkID0gYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiaGVsbHBcIilcclxuICAgIC8vIGNvbnN0IHVzZXIgPSBhd2FpdCB1c2VyTW9kZWwuZmluZE9uZSh7ZW1haWw6cmVxLmJvZHkuZW1haWx9KVxyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHVzZXJEYXRhU2VydmljZVByb3ZpZGVyLkNoZWNraW5nVXNlcihyZXEuYm9keS5lbWFpbCk7XHJcblxyXG4gICAgLy8gY29uc3QgdXNlciA9IGF3YWl0IHVzZXJEYXRhU2VydmljZVByb3ZpZGVyLkNoZWNraW5nVXNlcih7IGVtYWlsOiByZXEuYm9keS5lbWFpbCB9KTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyh1c2VyKVxyXG4gICAgaWYgKCF1c2VyKSB7XHJcblxyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgIG1lc3NhZ2U6IFwidGhlcmUgaXMgbm8gc3VjaCB1c2VyXCJcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAvLyBjb25zdCByZXNldF90b2tlbiA9IGp3dC5zaWduKHsgdXNlcl9pZDogY2xpZW50LnVzZXJfaWQsIGVtYWlsOiBjbGllbnQuZW1haWwgfSwgcHJvY2Vzcy5lbnYuVE9LRU5fS0VZLCB7XHJcbiAgICAgIC8vICAgZXhwaXJlc0luOiBcIjFoXCJcclxuICAgICAgLy8gfSlcclxuXHJcbiAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBFbWFpbFNlcnZpY2VQcm92aWRlci5zZW5kVmVyaWZ5RW1haWwodXNlci5lbWFpbClcclxuICAgICAgLy8gIHJlcy5zdGF0dXMoMjAwKS5qc29uXHJcbiAgICAgIC8vIChcclxuICAgICAgLy8gICB7XHJcbiAgICAgIC8vICAgICBzdWNjZXNzOlwidHJ1ZVwiLFxyXG4gICAgICAvLyAgICAgbWVzc2FnZTpcInZlcmlmaWNhdGlvbiBlbWFpbCBpcyBzZW50IHRvIHlvdXIgbWFpbFwiXHJcbiAgICAgIC8vICAgfVxyXG4gICAgICAvLyApXHJcbiAgICAgIGlmICh1c2VyLmlzVmVyaWZpZWQgPT09IHRydWUpIHtcclxuICAgICAgICAvLyBjb25zdCBwYXNzd29yZD1yZXEuYm9keS5wYXNzd29yZFxyXG5cclxuICAgICAgICBjb25zdCBoYXNlZHBhc3N3b3JkID0gYXdhaXQgYmNyeXB0Lmhhc2gocmVxLmJvZHkucGFzc3dvcmQsIDEwKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGhhc2VkcGFzc3dvcmQpXHJcbiAgICAgICAgdXNlci5wYXNzd29yZCA9IGhhc2VkcGFzc3dvcmRcclxuICAgICAgICAvLyBwcm9jZXNzLmVudi5UT0tFTl9LRVkgPSBwcm9jZXNzLmVudi5UT0tFTl9LRVkraGFzZWRwYXNzd29yZFxyXG4gICAgICAgIGF3YWl0IHVzZXIuc2F2ZSgpXHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBcInZlcmlmaWNhdGlvbiBtYWlsIGlzIHNlbnQgdG8geW91ciBlbWFpbFwiLFxyXG5cclxuICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgfVxyXG4gIGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZChcclxuICAgICAge1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgIG1lc3NhZ2U6IFwic29tZXRoaW5nIGZpc2h5XCJcclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG4vLyBjb25zdCB1cGRhdGVkYXRlcGFzc3dvcmQgPSBhc3luYyhyZXEscmVzLG5leHQpPT5cclxuLy8ge1xyXG4vLyAgIHRyeVxyXG4vLyAgIHtcclxuLy8gICAgICAgaWZcclxuXHJcbi8vICAgICAgICAgICBjb25zdCBoYXNlZHBhc3N3b3JkID0gYXdhaXQgYmNyeXB0Lmhhc2gocmVxLmJvZHkucGFzc3dvcmQsIDEwKVxyXG4vLyAgICAgICAgICAgY29uc29sZS5sb2coaGFzZWRwYXNzd29yZClcclxuLy8gICAgICAgICAgIHVzZXIucGFzc3dvcmQgPWhhc2VkcGFzc3dvcmRcclxuLy8gICAgICAgICAgIHByb2Nlc3MuZW52LlRPS0VOX0tFWSA9IHByb2Nlc3MuZW52LlRPS0VOX0tFWStoYXNlZHBhc3N3b3JkXHJcbi8vICAgICAgICAgICBhd2FpdCB1c2VyLnNhdmUoKVxyXG4vLyAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oXHJcbi8vICAgICAgICAgICAgIHtcclxuLy8gICAgICAgICAgICAgICBzdWNjZXNzOnRydWUsXHJcbi8vICAgICAgICAgICAgICAgbWVzc2FnZTpcInN1Y2Nlc3NmdWxseSB1cGRhdGVkXCIsXHJcbi8vICAgICAgICAgICAgICAgZGF0YTogdXNlclxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICApXHJcblxyXG4vLyAgICAgICAgICAgfVxyXG5cclxuLy8gfWNhdGNoKGVycilcclxuLy8ge1xyXG4vLyAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5zZW5kKFxyXG4vLyAgICAgICB7XHJcbi8vICAgICAgICAgc3VjY2VzczpmYWxzZSxcclxuLy8gICAgICAgICBtZXNzYWdlOmVyci5tZXNzYWdlXHJcbi8vICAgICAgIH0pXHJcbi8vICAgICB9XHJcbi8vICAgfVxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgdXNlclNpZ251cCxcclxuICB1c2VyU2lnbmluLFxyXG4gIHVzZXJEYXNoYm9hcmQsXHJcbiAgZm9yZ290cGFzc3dvcmQsXHJcbiAgdmVyaWZ5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