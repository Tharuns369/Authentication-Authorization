import userModel from "../models/userModel";
import { use } from "../routes";
import crypto from 'crypto'
import jwt from 'jsonwebtoken'



const userSignup = async (req, res, next) => {
    try {
        let newUser = new userModel();
  
        userModel.findOne({ email: req.body.email })
          .then((user) => {
            if (user) {
              res.status(401).send("user with same mail already exists");
            } else {
              newUser.name = req.body.name;
              newUser.email = req.body.email;
              newUser.password = req.body.password;
              newUser.emailToken=crypto.randomBytes(64).toString('hex')
              newUser.setPassword(req.body.password);
              return newUser.save();
            }
          })
          .then((savedUser) => {
    
    
            res.status(200).json(savedUser);
          })
        ;

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message || "Something went wrong"
        });
    }
};

const userSignin = async (req,res,next)=>
{
    userModel.findOne({ email: req.body.email }, function(err, user) {
        if (user == null) {
            res.status(400).send({ message: "error not found" });
        } else {
            if (user.validPassword(req.body.password)) {
                const token = jwt.sign({ user_id: user._id, email: user.email }, process.env.TOKEN_KEY, {
                    expiresIn: "2h"
                });
                return res.status(201).send({ message: "user logged in", token: token });
            } else {
                return res.status(400).send({ message: "wrong password" });
            }
        }
    });
}



export default {
    userSignup,
    userSignin
}