"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UserDataServiceProvider = void 0;
var _userModel = _interopRequireDefault(require("../models/userModel"));
var _crypto = _interopRequireDefault(require("crypto"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _morgan = require("morgan");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UserDataServiceProvider {
  async createUser(userObject) {
    const newUser = new _userModel.default(userObject);
    const saltRounds = 10;
    // newUser.setPassword(userObject.password)
    const hasedpassword = await _bcrypt.default.hash(userObject.password, saltRounds);
    newUser.password = hasedpassword;
    await newUser.save();
    return newUser;
  }
  async signIn(signInObject) {
    const user = await _userModel.default.findOne({
      email: signInObject.email
    });
    if (user) {
      const client = await _bcrypt.default.compare(signInObject.password, user.password);
      if (client) {
        return user;
      } else {
        return false;
      }
    }
    return false;
  }
  // async CheckingUser(obj) {
  //     const user = await userModel.findOne({ email: obj });
  //     if (user) {
  //       return user;
  //     } else {
  //       return false;
  //     }
  //   }
  async CheckingUser(email) {
    const user = await _userModel.default.findOne({
      email
    });
    if (user) {
      return user;
    } else {
      return false;
    }
  }
  async CheckingUserWithId(id) {
    const user = await _userModel.default.findOne({
      _id: id
    });
    if (user) {
      return user;
    } else {
      return false;
    }
  }
}
exports.UserDataServiceProvider = UserDataServiceProvider;
var _default = new UserDataServiceProvider();
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVc2VyRGF0YVNlcnZpY2VQcm92aWRlciIsImNyZWF0ZVVzZXIiLCJ1c2VyT2JqZWN0IiwibmV3VXNlciIsInVzZXJNb2RlbCIsInNhbHRSb3VuZHMiLCJoYXNlZHBhc3N3b3JkIiwiYmNyeXB0IiwiaGFzaCIsInBhc3N3b3JkIiwic2F2ZSIsInNpZ25JbiIsInNpZ25Jbk9iamVjdCIsInVzZXIiLCJmaW5kT25lIiwiZW1haWwiLCJjbGllbnQiLCJjb21wYXJlIiwiQ2hlY2tpbmdVc2VyIiwiQ2hlY2tpbmdVc2VyV2l0aElkIiwiaWQiLCJfaWQiXSwic291cmNlcyI6WyIuLi8uLi9zZXJ2ZXIvc2VydmljZXMvdXNlckRhdGFTZXJ2aWNlUHJvdmlkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVzZXJNb2RlbCBmcm9tIFwiLi4vbW9kZWxzL3VzZXJNb2RlbFwiXHJcbmltcG9ydCBjcnlwdG8gZnJvbSAnY3J5cHRvJ1xyXG5pbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbidcclxuXHJcbmltcG9ydCB7IHRva2VuIH0gZnJvbSBcIm1vcmdhblwiXHJcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0J1xyXG5leHBvcnQgY2xhc3MgVXNlckRhdGFTZXJ2aWNlUHJvdmlkZXIge1xyXG4gICAgYXN5bmMgY3JlYXRlVXNlcih1c2VyT2JqZWN0KSB7XHJcbiAgICAgICAgY29uc3QgbmV3VXNlciA9IG5ldyB1c2VyTW9kZWwodXNlck9iamVjdClcclxuICAgICAgICBjb25zdCBzYWx0Um91bmRzID0gMTBcclxuICAgICAgICAvLyBuZXdVc2VyLnNldFBhc3N3b3JkKHVzZXJPYmplY3QucGFzc3dvcmQpXHJcbiAgICAgICAgY29uc3QgaGFzZWRwYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5oYXNoKHVzZXJPYmplY3QucGFzc3dvcmQsIHNhbHRSb3VuZHMpXHJcbiAgICAgICAgbmV3VXNlci5wYXNzd29yZCA9IGhhc2VkcGFzc3dvcmRcclxuXHJcbiAgICAgICAgYXdhaXQgbmV3VXNlci5zYXZlKClcclxuICAgICAgICByZXR1cm4gbmV3VXNlclxyXG4gICAgfVxyXG4gICAgYXN5bmMgc2lnbkluKHNpZ25Jbk9iamVjdCkge1xyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB1c2VyTW9kZWwuZmluZE9uZSh7IGVtYWlsOiBzaWduSW5PYmplY3QuZW1haWwgfSk7XHJcbiAgICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgY2xpZW50ID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoc2lnbkluT2JqZWN0LnBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKVxyXG5cclxuICAgICAgICAgICAgaWYgKGNsaWVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVzZXJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gICAgLy8gYXN5bmMgQ2hlY2tpbmdVc2VyKG9iaikge1xyXG4gICAgLy8gICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB1c2VyTW9kZWwuZmluZE9uZSh7IGVtYWlsOiBvYmogfSk7XHJcbiAgICAvLyAgICAgaWYgKHVzZXIpIHtcclxuICAgIC8vICAgICAgIHJldHVybiB1c2VyO1xyXG4gICAgLy8gICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICB9XHJcbiAgICBhc3luYyBDaGVja2luZ1VzZXIoZW1haWwpIHtcclxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgdXNlck1vZGVsLmZpbmRPbmUoeyBlbWFpbCB9KTtcclxuICAgICAgICBpZiAodXNlcikge1xyXG4gICAgICAgICAgcmV0dXJuIHVzZXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICBhc3luYyBDaGVja2luZ1VzZXJXaXRoSWQoaWQpIHtcclxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgdXNlck1vZGVsLmZpbmRPbmUoeyBfaWQ6IGlkIH0pXHJcbiAgICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVzZXJcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgVXNlckRhdGFTZXJ2aWNlUHJvdmlkZXIoKTsiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBMkI7QUFDcEIsTUFBTUEsdUJBQXVCLENBQUM7RUFDakMsTUFBTUMsVUFBVSxDQUFDQyxVQUFVLEVBQUU7SUFDekIsTUFBTUMsT0FBTyxHQUFHLElBQUlDLGtCQUFTLENBQUNGLFVBQVUsQ0FBQztJQUN6QyxNQUFNRyxVQUFVLEdBQUcsRUFBRTtJQUNyQjtJQUNBLE1BQU1DLGFBQWEsR0FBRyxNQUFNQyxlQUFNLENBQUNDLElBQUksQ0FBQ04sVUFBVSxDQUFDTyxRQUFRLEVBQUVKLFVBQVUsQ0FBQztJQUN4RUYsT0FBTyxDQUFDTSxRQUFRLEdBQUdILGFBQWE7SUFFaEMsTUFBTUgsT0FBTyxDQUFDTyxJQUFJLEVBQUU7SUFDcEIsT0FBT1AsT0FBTztFQUNsQjtFQUNBLE1BQU1RLE1BQU0sQ0FBQ0MsWUFBWSxFQUFFO0lBQ3ZCLE1BQU1DLElBQUksR0FBRyxNQUFNVCxrQkFBUyxDQUFDVSxPQUFPLENBQUM7TUFBRUMsS0FBSyxFQUFFSCxZQUFZLENBQUNHO0lBQU0sQ0FBQyxDQUFDO0lBQ25FLElBQUlGLElBQUksRUFBRTtNQUNOLE1BQU1HLE1BQU0sR0FBRyxNQUFNVCxlQUFNLENBQUNVLE9BQU8sQ0FBQ0wsWUFBWSxDQUFDSCxRQUFRLEVBQUVJLElBQUksQ0FBQ0osUUFBUSxDQUFDO01BRXpFLElBQUlPLE1BQU0sRUFBRTtRQUNSLE9BQU9ILElBQUk7TUFDZixDQUFDLE1BQ0k7UUFDRCxPQUFPLEtBQUs7TUFDaEI7SUFDSjtJQUNBLE9BQU8sS0FBSztFQUNoQjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSxNQUFNSyxZQUFZLENBQUNILEtBQUssRUFBRTtJQUN0QixNQUFNRixJQUFJLEdBQUcsTUFBTVQsa0JBQVMsQ0FBQ1UsT0FBTyxDQUFDO01BQUVDO0lBQU0sQ0FBQyxDQUFDO0lBQy9DLElBQUlGLElBQUksRUFBRTtNQUNSLE9BQU9BLElBQUk7SUFDYixDQUFDLE1BQU07TUFDTCxPQUFPLEtBQUs7SUFDZDtFQUNGO0VBRUYsTUFBTU0sa0JBQWtCLENBQUNDLEVBQUUsRUFBRTtJQUN6QixNQUFNUCxJQUFJLEdBQUcsTUFBTVQsa0JBQVMsQ0FBQ1UsT0FBTyxDQUFDO01BQUVPLEdBQUcsRUFBRUQ7SUFBRyxDQUFDLENBQUM7SUFDakQsSUFBSVAsSUFBSSxFQUFFO01BQ04sT0FBT0EsSUFBSTtJQUNmLENBQUMsTUFDSTtNQUNELE9BQU8sS0FBSztJQUNoQjtFQUNKO0FBR0o7QUFBQztBQUFBLGVBS2MsSUFBSWIsdUJBQXVCLEVBQUU7QUFBQSJ9