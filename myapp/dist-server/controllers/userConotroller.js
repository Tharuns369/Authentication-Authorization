"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _userModel = _interopRequireDefault(require("../models/userModel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userSignup = async (req, res, next) => {
  try {
    const userData = req.body;
    const userObject = {
      name: userData.name,
      email: userData.email,
      password: userData.password
    };
    console.log(userObject);
    res.send('User singup successfully');
    return res.status(200).json({
      success: true,
      message: "User signup successfully"
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong"
    });
  }
};
var _default = {
  userSignup
};
exports.default = _default;