const express = require('express');
const  router = express.Router();

import userConotroller from '../../dist-server/controllers/userConotroller';
import userDataServiceProvider from '../services/userDataServiceProvider';
import { validateSignup,validateSignin  }from  "../middlewares/validateSignup";


router.post('/signup' ,validateSignup, userConotroller.userSignup)


router.post('/signin', validateSignin, userConotroller.userSignin);

router.get("/getprofile", userConotroller.userDashboard)

router.post("/forgotpassword",userConotroller.forgotpassword)

router.get("/email-verification",userConotroller.verifyEmail)



module.exports = router;
