"use strict";

var _userConotroller = _interopRequireDefault(require("../controllers/userConotroller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var express = require('express');
var router = express.Router();
/* GET users listing. */

router.post('/signup', _userConotroller.default.userSignup);
router.post('/signin', _userConotroller.default.userSignin);
router.get("/getprofile", _userConotroller.default.userDashboard);
router.patch("/updatedata", _userConotroller.default.updatedata);

// router.get("/email-verification",userConotroller.VerifyCationOfMail)

module.exports = router;