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
    console.log("hello");
    const signupSchema = _joi.default.object({
      name: _joi.default.string().min(5),
      email: _joi.default.string().email().required().email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net']
        }
      }),
      password: _joi.default.string().min(8).required().pattern(new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$')),
      repeat_password: _joi.default.ref('password')
    });
    console.log(req.body);
    const {
      error,
      value
    } = await signupSchema.validate(req.body, {
      abortEarly: false
    });
    if (error) {
      console.log(error);
      console.log(req.body.password);
      return res.send(error.details);
    } else {
      const checkingUser = await _userModel.default.findOne({
        email: req.body.email
      });
      if (checkingUser) {
        res.status(401).send({
          success: "false",
          message: "user already exsists"
        });
      } else {
        let newUser = await _userDataServiceProvider.default.createUser(req.body);
        let result = await _emailServiceProvider.default.sendTransacEmail(newUser.name, newUser.email);
        return res.status(200).json({
          success: true,
          message: "User Registered Successfully",
          data: newUser
        });
      }
    }
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
        expiresIn: "2h"
      });
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
        message: "invalid credintials"
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
    return res.status(400).send({
      success: false,
      message: "Access Denied."
    });
  }
  try {
    const verified = _jsonwebtoken.default.verify(token, process.env.TOKEN_KEY);
    req.user = verified; //verified is a variable that stores the decoded JWT payload.
    const user = await _userModel.default.findOne({
      _id: verified.user_id
    });
    return res.status(200).send({
      success: true,
      message: "user profile",
      data: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "Invalid token"
    });
  }
};
const VerifyCationOfMail = async (req, res) => {
  try {
    const email = req.query.email;
    const namaste = await _userModel.default.findOne({
      emali: email
    });
    if (namaste) {
      namaste.isVerified = true;
      await namaste.save();
      return res.status(200).json({
        success: "true",
        message: "email verified successfully",
        data: namaste
      });
    } else {
      return res.status(401).send({
        success: false,
        message: "invalid request"
      });
    }
  } catch (err) {
    return res.status(401).send({
      success: false,
      message: err.message
    });
  }
};
var _default = {
  userSignup,
  userSignin,
  userDashboard,
  VerifyCationOfMail
};
exports.default = _default;