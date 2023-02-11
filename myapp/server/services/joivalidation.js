import Joi from "joi";
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
    repeat_password: Joi.ref('password')

  });

module.exports=signupSchema