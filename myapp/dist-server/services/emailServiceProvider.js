"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.EmailServiceProvider = void 0;
var _userConotroller = _interopRequireDefault(require("../controllers/userConotroller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Sib = require('sib-api-v3-sdk');
require('dotenv').config();
class EmailServiceProvider {}
exports.EmailServiceProvider = EmailServiceProvider;
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.YOUR_API_KEY;
const sender = {
  email: 'sundar@labsquire.com'
};
const transactionalEmailApi = new Sib.TransactionalEmailsApi();
EmailServiceProvider.sendTransacEmail = async (userName, userEmail) => {
  try {
    const receivers = [{
      email: userEmail
    }];
    return transactionalEmailApi.sendTransacEmail({
      subject: 'Welcome To OROTRON',
      sender,
      to: receivers,
      htmlContent: `
        <h1>Hi {{params.name}} chance to become a {{params.role}} developer</h1>
        <h1>click here to <a href='http://localhost:3000/users/verify-email?email={{params.email}}'> verify </a>your email</h1>
      `,
      params: {
        name: userName,
        role: 'Backend ',
        email: userEmail
      }
    });
  } catch (error) {
    console.error(error);
  }
  ;
};
var _default = EmailServiceProvider;
exports.default = _default;