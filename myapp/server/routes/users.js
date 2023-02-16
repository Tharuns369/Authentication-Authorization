const express = require('express');
const  router = express.Router();

import userConotroller from '../controllers/userConotroller';
import userDataServiceProvider from '../services/userDataServiceProvider';
import { validateSignup,validateSignin ,validateprofile, validatepassword,  vallidateforgotpasswordrequest,validateresetpassword }from  "../middlewares/validators";


router.post('/signup' ,validateSignup, userConotroller.userSignup)


router.post('/signin', validateSignin, userConotroller.userSignin);

router.get("/getprofile", userConotroller.getprofile)

router.patch("/updateprofile" , validateprofile, userConotroller.updateprofile)

router.patch("/updatepassword",validatepassword, userConotroller.updatepassword)

router.get("/email-verification",userConotroller.verifyEmail)


router.get("/resetemailverify",userConotroller.resetemailverify)


router.post("/forgotpasswordrequest",vallidateforgotpasswordrequest,userConotroller.forgotpasswordrequest)

router.patch("/resetpassword",validateresetpassword,userConotroller.resetpassword)





module.exports = router;
