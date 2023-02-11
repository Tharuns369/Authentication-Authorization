"use strict";

var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const signupSchema = _joi.default.object({
  name: _joi.default.string().min(5),
  email: _joi.default.string().email().required().email({
    minDomainSegments: 2,
    tlds: {
      allow: ['com', 'net']
    }
  }),
  password: _joi.default.string().min(8).required().pattern(new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$')),
  repeat_password: _joi.default.ref('password')
});
module.exports = signupSchema;