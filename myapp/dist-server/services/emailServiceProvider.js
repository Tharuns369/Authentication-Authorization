"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require('dotenv').config();
const Sib = require('sib-api-v3-sdk');
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.YOUR_API_KEY;
class emailServiceProvider {
  async sendVerifyEmail(email, token) {
    const sender = {
      email: 'sundar@labsquire.com',
      name: 'Tharun'
    };
    const receivers = [{
      email
    }];
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
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  async sendresetlink(email, token) {
    const sender = {
      email: 'sundar@labsquire.com',
      name: 'Tharun'
    };
    const receivers = [{
      email
    }];
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
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}
var _default = new emailServiceProvider();
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZXF1aXJlIiwiY29uZmlnIiwiU2liIiwiY2xpZW50IiwiQXBpQ2xpZW50IiwiaW5zdGFuY2UiLCJhcGlLZXkiLCJhdXRoZW50aWNhdGlvbnMiLCJwcm9jZXNzIiwiZW52IiwiWU9VUl9BUElfS0VZIiwiZW1haWxTZXJ2aWNlUHJvdmlkZXIiLCJzZW5kVmVyaWZ5RW1haWwiLCJlbWFpbCIsInRva2VuIiwic2VuZGVyIiwibmFtZSIsInJlY2VpdmVycyIsInRyYW5zYWN0aW9uYWxFbWFpbEFwaSIsIlRyYW5zYWN0aW9uYWxFbWFpbHNBcGkiLCJzZW5kVHJhbnNhY0VtYWlsIiwic3ViamVjdCIsInRvIiwiaHRtbENvbnRlbnQiLCJwYXJhbXMiLCJlcnJvciIsImNvbnNvbGUiLCJzZW5kcmVzZXRsaW5rIl0sInNvdXJjZXMiOlsiLi4vLi4vc2VydmVyL3NlcnZpY2VzL2VtYWlsU2VydmljZVByb3ZpZGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJ2RvdGVudicpLmNvbmZpZygpO1xyXG5jb25zdCBTaWIgPSByZXF1aXJlKCdzaWItYXBpLXYzLXNkaycpXHJcbmNvbnN0IGNsaWVudCA9IFNpYi5BcGlDbGllbnQuaW5zdGFuY2U7XHJcbmNvbnN0IGFwaUtleSA9IGNsaWVudC5hdXRoZW50aWNhdGlvbnNbJ2FwaS1rZXknXTtcclxuYXBpS2V5LmFwaUtleSA9IHByb2Nlc3MuZW52LllPVVJfQVBJX0tFWTtcclxuXHJcbmNsYXNzIGVtYWlsU2VydmljZVByb3ZpZGVyIHtcclxuICBhc3luYyBzZW5kVmVyaWZ5RW1haWwoZW1haWwsIHRva2VuKSB7XHJcbiAgICBjb25zdCBzZW5kZXIgPSB7XHJcbiAgICAgIGVtYWlsOiAnc3VuZGFyQGxhYnNxdWlyZS5jb20nLFxyXG4gICAgICBuYW1lOiAnVGhhcnVuJyxcclxuICAgIH07XHJcbiAgICBjb25zdCByZWNlaXZlcnMgPSBbeyBlbWFpbCB9XVxyXG4gICAgY29uc3QgdHJhbnNhY3Rpb25hbEVtYWlsQXBpID0gbmV3IFNpYi5UcmFuc2FjdGlvbmFsRW1haWxzQXBpKCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCB0cmFuc2FjdGlvbmFsRW1haWxBcGkuc2VuZFRyYW5zYWNFbWFpbCh7XHJcbiAgICAgICAgc3ViamVjdDogJ1ZFUklGSUNBVElPTiBMSU5LJyxcclxuICAgICAgICBzZW5kZXIsXHJcbiAgICAgICAgdG86IHJlY2VpdmVycyxcclxuICAgICAgICBodG1sQ29udGVudDogYFxyXG4gICAgICAgIDxoMT5jbGljayBWZXJpZnkgeW91ciBtYWlsIHRvIHJlZ2lzdGVyIDwvaDE+XHJcbiAgICAgICAgPGEgaHJlZj0naHR0cDovL2xvY2FsaG9zdDozMDAwL3VzZXJzL2VtYWlsLXZlcmlmaWNhdGlvbj90b2tlbj0ke3Rva2VufSc+UGxlYXNlIHZlcmlmeSB5b3VyIEVtYWlsPC9hPlxyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICBgLFxyXG4gICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgdG9rZW46IHRva2VuXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHNlbmRyZXNldGxpbmsoZW1haWwsIHRva2VuKSB7XHJcbiAgICBjb25zdCBzZW5kZXIgPSB7XHJcbiAgICAgIGVtYWlsOiAnc3VuZGFyQGxhYnNxdWlyZS5jb20nLFxyXG4gICAgICBuYW1lOiAnVGhhcnVuJyxcclxuICAgIH07XHJcbiAgICBjb25zdCByZWNlaXZlcnMgPSBbeyBlbWFpbCB9XVxyXG4gICAgY29uc3QgdHJhbnNhY3Rpb25hbEVtYWlsQXBpID0gbmV3IFNpYi5UcmFuc2FjdGlvbmFsRW1haWxzQXBpKCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCB0cmFuc2FjdGlvbmFsRW1haWxBcGkuc2VuZFRyYW5zYWNFbWFpbCh7XHJcbiAgICAgICAgc3ViamVjdDogJ1JFU0VUIFBBU1NXT1JEJyxcclxuICAgICAgICBzZW5kZXIsXHJcbiAgICAgICAgdG86IHJlY2VpdmVycyxcclxuICAgICAgICBodG1sQ29udGVudDogYFxyXG4gICAgICAgIDxoMT5jbGljayBSRVNFVCB0byBjaGFuZ2UgcGFzc3dvcmQgPC9oMT5cclxuICAgICAgICA8YSBocmVmPSdodHRwOi8vbG9jYWxob3N0OjMwMDAvdXNlcnMvcmVzZXRlbWFpbHZlcmlmeT90b2tlbj0ke3Rva2VufSc+UkVTRVQ8L2E+XHJcbiAgICAgICAgICAgICAgICAgXHJcbiAgICAgIGAsXHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICB0b2tlbjogdG9rZW5cclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IGVtYWlsU2VydmljZVByb3ZpZGVyKCk7Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDQyxNQUFNLEVBQUU7QUFDMUIsTUFBTUMsR0FBRyxHQUFHRixPQUFPLENBQUMsZ0JBQWdCLENBQUM7QUFDckMsTUFBTUcsTUFBTSxHQUFHRCxHQUFHLENBQUNFLFNBQVMsQ0FBQ0MsUUFBUTtBQUNyQyxNQUFNQyxNQUFNLEdBQUdILE1BQU0sQ0FBQ0ksZUFBZSxDQUFDLFNBQVMsQ0FBQztBQUNoREQsTUFBTSxDQUFDQSxNQUFNLEdBQUdFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxZQUFZO0FBRXhDLE1BQU1DLG9CQUFvQixDQUFDO0VBQ3pCLE1BQU1DLGVBQWUsQ0FBQ0MsS0FBSyxFQUFFQyxLQUFLLEVBQUU7SUFDbEMsTUFBTUMsTUFBTSxHQUFHO01BQ2JGLEtBQUssRUFBRSxzQkFBc0I7TUFDN0JHLElBQUksRUFBRTtJQUNSLENBQUM7SUFDRCxNQUFNQyxTQUFTLEdBQUcsQ0FBQztNQUFFSjtJQUFNLENBQUMsQ0FBQztJQUM3QixNQUFNSyxxQkFBcUIsR0FBRyxJQUFJaEIsR0FBRyxDQUFDaUIsc0JBQXNCLEVBQUU7SUFDOUQsSUFBSTtNQUNGLE1BQU1ELHFCQUFxQixDQUFDRSxnQkFBZ0IsQ0FBQztRQUMzQ0MsT0FBTyxFQUFFLG1CQUFtQjtRQUM1Qk4sTUFBTTtRQUNOTyxFQUFFLEVBQUVMLFNBQVM7UUFDYk0sV0FBVyxFQUFHO0FBQ3RCO0FBQ0Esd0VBQXdFVCxLQUFNO0FBQzlFO0FBQ0EsT0FBTztRQUNDVSxNQUFNLEVBQUU7VUFDTlYsS0FBSyxFQUFFQTtRQUNUO01BQ0YsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLE9BQU9XLEtBQUssRUFBRTtNQUNkQyxPQUFPLENBQUNELEtBQUssQ0FBQ0EsS0FBSyxDQUFDO0lBQ3RCO0VBQ0Y7RUFFQSxNQUFNRSxhQUFhLENBQUNkLEtBQUssRUFBRUMsS0FBSyxFQUFFO0lBQ2hDLE1BQU1DLE1BQU0sR0FBRztNQUNiRixLQUFLLEVBQUUsc0JBQXNCO01BQzdCRyxJQUFJLEVBQUU7SUFDUixDQUFDO0lBQ0QsTUFBTUMsU0FBUyxHQUFHLENBQUM7TUFBRUo7SUFBTSxDQUFDLENBQUM7SUFDN0IsTUFBTUsscUJBQXFCLEdBQUcsSUFBSWhCLEdBQUcsQ0FBQ2lCLHNCQUFzQixFQUFFO0lBQzlELElBQUk7TUFDRixNQUFNRCxxQkFBcUIsQ0FBQ0UsZ0JBQWdCLENBQUM7UUFDM0NDLE9BQU8sRUFBRSxnQkFBZ0I7UUFDekJOLE1BQU07UUFDTk8sRUFBRSxFQUFFTCxTQUFTO1FBQ2JNLFdBQVcsRUFBRztBQUN0QjtBQUNBLHNFQUFzRVQsS0FBTTtBQUM1RTtBQUNBLE9BQU87UUFDQ1UsTUFBTSxFQUFFO1VBQ05WLEtBQUssRUFBRUE7UUFDVDtNQUNGLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxPQUFPVyxLQUFLLEVBQUU7TUFDZEMsT0FBTyxDQUFDRCxLQUFLLENBQUNBLEtBQUssQ0FBQztJQUN0QjtFQUNGO0FBQ0Y7QUFBQyxlQUVjLElBQUlkLG9CQUFvQixFQUFFO0FBQUEifQ==