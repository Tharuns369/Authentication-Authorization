"use strict";

var _userConotroller = _interopRequireDefault(require("../controllers/userConotroller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var express = require('express');
var router = express.Router();
/* GET users listing. */

router.post('/signup', _userConotroller.default.userSignup);
module.exports = router;