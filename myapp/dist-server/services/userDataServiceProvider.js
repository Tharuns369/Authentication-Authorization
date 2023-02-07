"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserDataServiceProvider = void 0;
class UserDataServiceProvider {
  async createUser(userObject) {
    await userModel.create(userObject);
  }
}
exports.UserDataServiceProvider = UserDataServiceProvider;