require('dotenv').config();
const Sib = require('sib-api-v3-sdk')
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.YOUR_API_KEY;

class emailServiceProvider {
  async sendVerifyEmail(email, token) {
    const sender = {
      email: 'sundar@labsquire.com',
      name: 'Tharun',
    };
    const receivers = [{ email }]
    const transactionalEmailApi = new Sib.TransactionalEmailsApi();
    try {
      await transactionalEmailApi.sendTransacEmail({
        subject: 'VERIFICATION LINK',
        sender,
        to: receivers,
        htmlContent: `
        <h1>click Verify your mail to register </h1>
        <a href='http://localhost:3000/users/email-verification?token=${token}'>Please verify your Email</a>
                 
      `,
        params: {
          token: token
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async sendresetlink(email, token) {
    const sender = {
      email: 'sundar@labsquire.com',
      name: 'Tharun',
    };
    const receivers = [{ email }]
    const transactionalEmailApi = new Sib.TransactionalEmailsApi();
    try {
      await transactionalEmailApi.sendTransacEmail({
        subject: 'RESET PASSWORD',
        sender,
        to: receivers,
        htmlContent: `
        <h1>click RESET to change password </h1>
        <a href='http://localhost:3000/users/resetemailverify?token=${token}'>RESET</a>
                 
      `,
        params: {
          token: token
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default new emailServiceProvider();