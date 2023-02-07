import mongoose from 'mongoose'

mongoose.connect(
  process.env.MONGO_URL,
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
},
() => console.log("connected to db")
)