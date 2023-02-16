"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
var _crypto = _interopRequireDefault(require("crypto"));
var _morgan = require("morgan");
var _joi = require("joi");
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
  oldpassword: {
    // required:true,
    type: String
  },
  newpassword: {
    // required: true,
    type: String
  },
  Email_Verified: {
    type: Boolean,
    default: false
  },
  token: {
    type: String
  }
});
const userModel = _mongoose.default.model('User', userSchema, 'users');
var _default = userModel;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ1c2VyU2NoZW1hIiwibW9uZ29vc2UiLCJTY2hlbWEiLCJuYW1lIiwicmVxdWlyZWQiLCJ0eXBlIiwiU3RyaW5nIiwiZW1haWwiLCJ1bmlxdWUiLCJwYXNzd29yZCIsIm9sZHBhc3N3b3JkIiwibmV3cGFzc3dvcmQiLCJFbWFpbF9WZXJpZmllZCIsIkJvb2xlYW4iLCJkZWZhdWx0IiwidG9rZW4iLCJ1c2VyTW9kZWwiLCJtb2RlbCJdLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9tb2RlbHMvdXNlck1vZGVsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEgfSBmcm9tIFwibW9uZ29vc2VcIjtcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJtb25nb29zZVwiXHJcbmltcG9ydCBjcnlwdG8gZnJvbSBcImNyeXB0b1wiXHJcbmltcG9ydCB7IHRva2VuIH0gZnJvbSBcIm1vcmdhblwiO1xyXG5pbXBvcnQgeyBzdHJpbmcgfSBmcm9tIFwiam9pXCI7XHJcbmNvbnN0IHVzZXJTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcclxuICAgIG5hbWU6XHJcbiAgICB7XHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgdHlwZTogU3RyaW5nXHJcbiAgICB9LFxyXG5cclxuICAgIGVtYWlsOlxyXG4gICAge1xyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICB1bmlxdWU6IHRydWVcclxuICAgIH0sXHJcbiAgICBwYXNzd29yZDpcclxuICAgIHtcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICB9LFxyXG4gICAgb2xkcGFzc3dvcmQ6XHJcbiAgICB7XHJcbiAgICAgICAgLy8gcmVxdWlyZWQ6dHJ1ZSxcclxuICAgICAgICB0eXBlOlN0cmluZ1xyXG5cclxuICAgIH0sXHJcbiAgICBuZXdwYXNzd29yZDpcclxuICAgIHtcclxuICAgICAgICAvLyByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICB9LFxyXG4gICBcclxuICAgIEVtYWlsX1ZlcmlmaWVkOlxyXG4gICAge1xyXG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgZGVmYXVsdDogZmFsc2VcclxuICAgIH0sXHJcbiAgICB0b2tlbjpcclxuICAgIHtcclxuICAgICAgICB0eXBlOlN0cmluZ1xyXG4gICAgfVxyXG5cclxufSlcclxuXHJcblxyXG5cclxuY29uc3QgdXNlck1vZGVsID0gbW9uZ29vc2UubW9kZWwoJ1VzZXInLCB1c2VyU2NoZW1hLCAndXNlcnMnKVxyXG5leHBvcnQgZGVmYXVsdCB1c2VyTW9kZWxcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUE2QjtBQUFBO0FBQUE7QUFDN0IsTUFBTUEsVUFBVSxHQUFHLElBQUlDLGlCQUFRLENBQUNDLE1BQU0sQ0FBQztFQUNuQ0MsSUFBSSxFQUNKO0lBQ0lDLFFBQVEsRUFBRSxJQUFJO0lBQ2RDLElBQUksRUFBRUM7RUFDVixDQUFDO0VBRURDLEtBQUssRUFDTDtJQUNJSCxRQUFRLEVBQUUsSUFBSTtJQUNkQyxJQUFJLEVBQUVDLE1BQU07SUFDWkUsTUFBTSxFQUFFO0VBQ1osQ0FBQztFQUNEQyxRQUFRLEVBQ1I7SUFDSUwsUUFBUSxFQUFFLElBQUk7SUFDZEMsSUFBSSxFQUFFQztFQUNWLENBQUM7RUFDREksV0FBVyxFQUNYO0lBQ0k7SUFDQUwsSUFBSSxFQUFDQztFQUVULENBQUM7RUFDREssV0FBVyxFQUNYO0lBQ0k7SUFDQU4sSUFBSSxFQUFFQztFQUNWLENBQUM7RUFFRE0sY0FBYyxFQUNkO0lBQ0lQLElBQUksRUFBRVEsT0FBTztJQUNiQyxPQUFPLEVBQUU7RUFDYixDQUFDO0VBQ0RDLEtBQUssRUFDTDtJQUNJVixJQUFJLEVBQUNDO0VBQ1Q7QUFFSixDQUFDLENBQUM7QUFJRixNQUFNVSxTQUFTLEdBQUdmLGlCQUFRLENBQUNnQixLQUFLLENBQUMsTUFBTSxFQUFFakIsVUFBVSxFQUFFLE9BQU8sQ0FBQztBQUFBLGVBQzlDZ0IsU0FBUztBQUFBIn0=