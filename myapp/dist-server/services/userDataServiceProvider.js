"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UserDataServiceProvider = void 0;
var _userModel = _interopRequireDefault(require("../models/userModel"));
var _crypto = _interopRequireDefault(require("crypto"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _morgan = require("morgan");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UserDataServiceProvider {
  async createUser(userObject) {
    const newUser = new _userModel.default(userObject);
    const saltRounds = 10;
    // newUser.setPassword(userObject.password)
    const hasedpassword = await _bcrypt.default.hash(userObject.password, saltRounds);
    newUser.password = hasedpassword;
    await newUser.save();
    return newUser;
  }
  async signIn(signInObject) {
    const user = await _userModel.default.findOne({
      email: signInObject.email
    });
    const client = await _bcrypt.default.compare(signInObject.password, user.password);
    console.log(client);
    return user;
  }
}
exports.UserDataServiceProvider = UserDataServiceProvider;
var _default = new UserDataServiceProvider();
exports.default = _default;