"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const userSchema = new _mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  }
});

// emailToken:
// {
//     required:true,
//     type : String
// },

// userSchema.methods.setPassword = function(password) { 

//     // Creating a unique salt for a particular user 
//        this.salt = crypto.randomBytes(16).toString('hex'); 

//        // Hashing user's salt and password with 1000 iterations, 

//        this.hash = crypto.pbkdf2Sync(password, this.salt,  
//        1000, 64, `sha512`).toString(`hex`); 
//    }; 

//    // Method to check the entered password is correct or not 
//    userSchema.methods.validPassword = function(password) { 
//        var hash = crypto.pbkdf2Sync(password,  
//        this.salt, 1000, 64, 'sha512').toString('hex'); 
//        return this.hash === hash; 
//    }

const userModel = _mongoose.default.model('User', userSchema, 'users');
var _default = userModel;
exports.default = _default;