var express = require('express');
var router = express.Router();
import userConotroller  from '../controllers/userConotroller';
/* GET users listing. */

router.post('/signup',userConotroller.userSignup);

module.exports = router;
