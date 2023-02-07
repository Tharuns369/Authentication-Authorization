var express = require('express');
var router = express.Router();
import userConotroller  from '../controllers/userConotroller';
/* GET users listing. */

router.post('/signup',userConotroller.userSignup);

router.post('/signin',userConotroller.userSignin);

module.exports = router;
