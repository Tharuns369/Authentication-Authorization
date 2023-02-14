"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const userSchema = new _mongoose.default.Schema({
  name: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String,
    unique: true
  },
  password: {
    required: true,
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false
  }
});
const userModel = _mongoose.default.model('User', userSchema, 'users');
var _default = userModel;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ1c2VyU2NoZW1hIiwibW9uZ29vc2UiLCJTY2hlbWEiLCJuYW1lIiwicmVxdWlyZWQiLCJ0eXBlIiwiU3RyaW5nIiwiZW1haWwiLCJ1bmlxdWUiLCJwYXNzd29yZCIsImlzVmVyaWZpZWQiLCJCb29sZWFuIiwiZGVmYXVsdCIsInVzZXJNb2RlbCIsIm1vZGVsIl0sInNvdXJjZXMiOlsiLi4vLi4vc2VydmVyL21vZGVscy91c2VyTW9kZWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlLCB7IFNjaGVtYSB9IGZyb20gXCJtb25nb29zZVwiO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcIm1vbmdvb3NlXCJcclxuaW1wb3J0IGNyeXB0byBmcm9tIFwiY3J5cHRvXCJcclxuY29uc3QgdXNlclNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoe1xyXG4gICAgbmFtZTpcclxuICAgIHtcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICB0eXBlOiBTdHJpbmdcclxuICAgIH0sXHJcblxyXG4gICAgZW1haWw6XHJcbiAgICB7XHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIHVuaXF1ZTogdHJ1ZVxyXG4gICAgfSxcclxuICAgIHBhc3N3b3JkOlxyXG4gICAge1xyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgIH0sXHJcbiAgICBpc1ZlcmlmaWVkOlxyXG4gICAge1xyXG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgZGVmYXVsdDogZmFsc2VcclxuICAgIH1cclxufSlcclxuXHJcblxyXG5cclxuY29uc3QgdXNlck1vZGVsID0gbW9uZ29vc2UubW9kZWwoJ1VzZXInLCB1c2VyU2NoZW1hLCAndXNlcnMnKVxyXG5leHBvcnQgZGVmYXVsdCB1c2VyTW9kZWxcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUVBO0FBQTJCO0FBQUE7QUFBQTtBQUMzQixNQUFNQSxVQUFVLEdBQUcsSUFBSUMsaUJBQVEsQ0FBQ0MsTUFBTSxDQUFDO0VBQ25DQyxJQUFJLEVBQ0o7SUFDSUMsUUFBUSxFQUFFLElBQUk7SUFDZEMsSUFBSSxFQUFFQztFQUNWLENBQUM7RUFFREMsS0FBSyxFQUNMO0lBQ0lILFFBQVEsRUFBRSxJQUFJO0lBQ2RDLElBQUksRUFBRUMsTUFBTTtJQUNaRSxNQUFNLEVBQUU7RUFDWixDQUFDO0VBQ0RDLFFBQVEsRUFDUjtJQUNJTCxRQUFRLEVBQUUsSUFBSTtJQUNkQyxJQUFJLEVBQUVDO0VBQ1YsQ0FBQztFQUNESSxVQUFVLEVBQ1Y7SUFDSUwsSUFBSSxFQUFFTSxPQUFPO0lBQ2JDLE9BQU8sRUFBRTtFQUNiO0FBQ0osQ0FBQyxDQUFDO0FBSUYsTUFBTUMsU0FBUyxHQUFHWixpQkFBUSxDQUFDYSxLQUFLLENBQUMsTUFBTSxFQUFFZCxVQUFVLEVBQUUsT0FBTyxDQUFDO0FBQUEsZUFDOUNhLFNBQVM7QUFBQSJ9