import userModel from "../models/userModel"
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

import { token } from "morgan"
import bcrypt from 'bcrypt'
export class UserDataServiceProvider {
    async createUser(userObject) {
        const newUser = new userModel(userObject)
        const saltRounds = 10
        // newUser.setPassword(userObject.password)
        const hasedpassword = await bcrypt.hash(userObject.password, saltRounds)
        newUser.password = hasedpassword
        newUser.Email_Verified=false

        await newUser.save()
        return newUser
    }
    async signIn(signInObject) {
        const user = await userModel.findOne({ email: signInObject.email });
        if (user) {
            const client = await bcrypt.compare(signInObject.password, user.password)

            if (client) {
                return user
            }
            else {
                return false
            }
        }
        return false
    }
  
    async CheckingUser(email) {
        const user = await userModel.findOne({ email:email});
        if (user) {
            return user;
        } else {
            return false;
        }
    }

    async CheckingUserWithId(id) {
        const user = await userModel.findOne({ _id:id })
        if (user) {
            return user
        }
        else {
            return false
        }
    }
  

}




export default new UserDataServiceProvider();