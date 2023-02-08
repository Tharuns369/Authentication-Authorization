"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.EmailServiceProvider = void 0;
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
  const receivers = [{
    email: userEmail
  }];
  return transactionalEmailApi.sendTransacEmail({
    subject: 'Welcome To OROTRON',
    sender,
    to: receivers,
    htmlContent: `
      <h1>Hi ${userName} chance to become a {{params.role}} developer</h1>
      <a href='https://cules-coding.vercel.app/'>Cules Coding</a>
    `,
    params: {
      role: 'Backend '
    }
  });
};
var _default = EmailServiceProvider;
exports.default = _default;