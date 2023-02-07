"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
require('dotenv').config();
console.log(process.env.MONGO_URL);
_mongoose.default.connect(process.env.MONGO_URL);
_mongoose.default.connection.on("err", () => {
  console.log("Error at db connection");
});
_mongoose.default.connection.once("open", () => {
  console.log("Mongodb connected");
});
_mongoose.default.Promise = Promise;