"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _userModel = _interopRequireDefault(require("../models/userModel"));
var _routes = require("../routes");
var _crypto = _interopRequireDefault(require("crypto"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _emailServiceProvider = _interopRequireDefault(require("../services/emailServiceProvider"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _userDataServiceProvider = _interopRequireDefault(require("../services/userDataServiceProvider"));
var _morgan = require("morgan");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Sib = require('sib-api-v3-sdk');
require('dotenv').config();
const userSignup = async (req, res, next) => {
  try {
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
      const result = await _emailServiceProvider.default.sendTransacEmail(newUser.name, newUser.email);
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
        message: "Authorized and succesfully logged in",
        data: Token
      });
    } else {
      return res.status(401).send({
        message: false,
        message: "not authorized"
      });
    }

    // return res.status(201).json({
    //     message: "User signed Successfully",
    //     "token": Usersignin})
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong"
    });
  }
};
var _default = {
  userSignup,
  userSignin
};
exports.default = _default;