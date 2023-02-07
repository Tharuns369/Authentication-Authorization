"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _userModel = _interopRequireDefault(require("../models/userModel"));
var _routes = require("../routes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userSignup = async (req, res, next) => {
  try {
    const userObject = await _userModel.default.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    return res.status(200).json({
      success: true,
      message: userObject
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
  _userModel.default.findOne({
    email: req.body.email
  }), function (err, user) {
    if (user == null) {
      res.status(400).send({
        message: "please register"
      });
    } else {
      return res.status(201).send({
        message: "user logged in"
      });
    }
  };
};
var _default = {
  userSignup,
  userSignin
};
exports.default = _default;