import Joi from 'joi'
import userModel from "../models/userModel";
import userDataServiceProvider from "../services/userDataServiceProvider";


const signupSchema = Joi.object({
  name: Joi.string()
    .min(5),
  email: Joi.string()
    .email()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$')),


});


const siginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required()


});


const validateSignup = async (req, res, next) => {
  try {

    const { error, value } = await signupSchema.validate(req.body,
      {
        abortEarly: false,
      });

    if (error) {
      console.log(error);
      console.log(req.body.password)
      return res.send(error.details);
    }

    const checkingUser = await userModel.findOne({ email: req.body.email })
    if (checkingUser) {
      res.status(401).send({
        success: "false",
        message: "user already exsists"
      })
    }

  }
  catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong"
    });
  }
  next()
}







const validateSignin = async (req, res, next) => {
  try {

    const { error, value } = await signupSchema.validate(req.body,
      {
        abortEarly: false,
      });

    if (error) {
      console.log(error);
      console.log(req.body.password)
      return res.send(error.details);
    }

  }
  catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong"
    });
  }
  next()
}

module.exports =
{
  validateSignup,
  validateSignin
}




