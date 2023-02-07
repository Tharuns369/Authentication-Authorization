import userModel from "../models/userModel";


const userSignup = async (req, res, next) =>{
    try{

        const userData = req.body
        const userObject = {
            name:userData.name,
            email:userData.email,
            password:userData.password
        }

        console.log(userObject)
        res.send('User singup successfully');

        return res.status(200).json({
            success:true,
            message:"User signup successfully"
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:err.message || "Something went wrong"
        })
    }
  }


export default {
    userSignup
}