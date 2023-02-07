
require('dotenv').config()

import mongoose from 'mongoose'

console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL)
  
mongoose.connection.on("err",()=>{console.log("Error at db connection")})
mongoose.connection.once("open",()=>{console.log("Mongodb connected")})


mongoose.Promise = Promise