import userModel from "../models/userModel";
import { use } from "../routes";


const userSignup = async (req, res, next) => {
    try {
        const userObject = await userModel.create({
            name: req.body.name,
            email: req.body.email,
            password:req.body.password
        });

        return res.status(200).json({
            success: true,
            message: userObject
        });
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

    userModel.findOne({email:req.body.email}),
        function(err,user)
        {
            if(user==null)
            {
                res.status(400).send({
                    message:"please register"
                })
            }
            else
            {
                return res.status(201).send({message : "user logged in"});
            }
        }
        
}

export default {
    userSignup,
    userSignin
}