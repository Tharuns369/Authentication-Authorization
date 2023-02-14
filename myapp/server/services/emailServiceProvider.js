require('dotenv').config();
const Sib = require('sib-api-v3-sdk')
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.YOUR_API_KEY;

class emailServiceProvider {
  async sendVerifyEmail(email) {
    const sender = {
      email: 'sundar@labsquire.com',
      name: 'Tharun',
    };
    const receivers = [{ email }]
    const transactionalEmailApi = new Sib.TransactionalEmailsApi();
    try {
      await transactionalEmailApi.sendTransacEmail({
        subject: 'Sending verification Email',
        sender,
        to: receivers,
        htmlContent: `
        <h1>Become a {{params.role}} developer</h1>
        <a href='http://localhost:3000/users/email-verification?email={{params.email}}'>Please verify your Email</a>
                 
      `,
        params: {
          role: 'Pro Backend',
          email: email
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default new emailServiceProvider();