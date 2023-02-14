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
  async sendVerifyEmail(email) {
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
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}
var _default = new emailServiceProvider();
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZXF1aXJlIiwiY29uZmlnIiwiU2liIiwiY2xpZW50IiwiQXBpQ2xpZW50IiwiaW5zdGFuY2UiLCJhcGlLZXkiLCJhdXRoZW50aWNhdGlvbnMiLCJwcm9jZXNzIiwiZW52IiwiWU9VUl9BUElfS0VZIiwiZW1haWxTZXJ2aWNlUHJvdmlkZXIiLCJzZW5kVmVyaWZ5RW1haWwiLCJlbWFpbCIsInNlbmRlciIsIm5hbWUiLCJyZWNlaXZlcnMiLCJ0cmFuc2FjdGlvbmFsRW1haWxBcGkiLCJUcmFuc2FjdGlvbmFsRW1haWxzQXBpIiwic2VuZFRyYW5zYWNFbWFpbCIsInN1YmplY3QiLCJ0byIsImh0bWxDb250ZW50IiwicGFyYW1zIiwicm9sZSIsImVycm9yIiwiY29uc29sZSJdLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9zZXJ2aWNlcy9lbWFpbFNlcnZpY2VQcm92aWRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCdkb3RlbnYnKS5jb25maWcoKTtcclxuY29uc3QgU2liID0gcmVxdWlyZSgnc2liLWFwaS12My1zZGsnKVxyXG5jb25zdCBjbGllbnQgPSBTaWIuQXBpQ2xpZW50Lmluc3RhbmNlO1xyXG5jb25zdCBhcGlLZXkgPSBjbGllbnQuYXV0aGVudGljYXRpb25zWydhcGkta2V5J107XHJcbmFwaUtleS5hcGlLZXkgPSBwcm9jZXNzLmVudi5ZT1VSX0FQSV9LRVk7XHJcblxyXG5jbGFzcyBlbWFpbFNlcnZpY2VQcm92aWRlciB7XHJcbiAgYXN5bmMgc2VuZFZlcmlmeUVtYWlsKGVtYWlsKSB7XHJcbiAgICBjb25zdCBzZW5kZXIgPSB7XHJcbiAgICAgIGVtYWlsOiAnc3VuZGFyQGxhYnNxdWlyZS5jb20nLFxyXG4gICAgICBuYW1lOiAnVGhhcnVuJyxcclxuICAgIH07XHJcbiAgICBjb25zdCByZWNlaXZlcnMgPSBbeyBlbWFpbCB9XVxyXG4gICAgY29uc3QgdHJhbnNhY3Rpb25hbEVtYWlsQXBpID0gbmV3IFNpYi5UcmFuc2FjdGlvbmFsRW1haWxzQXBpKCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCB0cmFuc2FjdGlvbmFsRW1haWxBcGkuc2VuZFRyYW5zYWNFbWFpbCh7XHJcbiAgICAgICAgc3ViamVjdDogJ1NlbmRpbmcgdmVyaWZpY2F0aW9uIEVtYWlsJyxcclxuICAgICAgICBzZW5kZXIsXHJcbiAgICAgICAgdG86IHJlY2VpdmVycyxcclxuICAgICAgICBodG1sQ29udGVudDogYFxyXG4gICAgICAgIDxoMT5CZWNvbWUgYSB7e3BhcmFtcy5yb2xlfX0gZGV2ZWxvcGVyPC9oMT5cclxuICAgICAgICA8YSBocmVmPSdodHRwOi8vbG9jYWxob3N0OjMwMDAvdXNlcnMvZW1haWwtdmVyaWZpY2F0aW9uP2VtYWlsPXt7cGFyYW1zLmVtYWlsfX0nPlBsZWFzZSB2ZXJpZnkgeW91ciBFbWFpbDwvYT5cclxuICAgICAgICAgICAgICAgICBcclxuICAgICAgYCxcclxuICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgIHJvbGU6ICdQcm8gQmFja2VuZCcsXHJcbiAgICAgICAgICBlbWFpbDogZW1haWxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IGVtYWlsU2VydmljZVByb3ZpZGVyKCk7Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDQyxNQUFNLEVBQUU7QUFDMUIsTUFBTUMsR0FBRyxHQUFHRixPQUFPLENBQUMsZ0JBQWdCLENBQUM7QUFDckMsTUFBTUcsTUFBTSxHQUFHRCxHQUFHLENBQUNFLFNBQVMsQ0FBQ0MsUUFBUTtBQUNyQyxNQUFNQyxNQUFNLEdBQUdILE1BQU0sQ0FBQ0ksZUFBZSxDQUFDLFNBQVMsQ0FBQztBQUNoREQsTUFBTSxDQUFDQSxNQUFNLEdBQUdFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxZQUFZO0FBRXhDLE1BQU1DLG9CQUFvQixDQUFDO0VBQ3pCLE1BQU1DLGVBQWUsQ0FBQ0MsS0FBSyxFQUFFO0lBQzNCLE1BQU1DLE1BQU0sR0FBRztNQUNiRCxLQUFLLEVBQUUsc0JBQXNCO01BQzdCRSxJQUFJLEVBQUU7SUFDUixDQUFDO0lBQ0QsTUFBTUMsU0FBUyxHQUFHLENBQUM7TUFBRUg7SUFBTSxDQUFDLENBQUM7SUFDN0IsTUFBTUkscUJBQXFCLEdBQUcsSUFBSWYsR0FBRyxDQUFDZ0Isc0JBQXNCLEVBQUU7SUFDOUQsSUFBSTtNQUNGLE1BQU1ELHFCQUFxQixDQUFDRSxnQkFBZ0IsQ0FBQztRQUMzQ0MsT0FBTyxFQUFFLDRCQUE0QjtRQUNyQ04sTUFBTTtRQUNOTyxFQUFFLEVBQUVMLFNBQVM7UUFDYk0sV0FBVyxFQUFHO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLE9BQU87UUFDQ0MsTUFBTSxFQUFFO1VBQ05DLElBQUksRUFBRSxhQUFhO1VBQ25CWCxLQUFLLEVBQUVBO1FBQ1Q7TUFDRixDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsT0FBT1ksS0FBSyxFQUFFO01BQ2RDLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDQSxLQUFLLENBQUM7SUFDdEI7RUFDRjtBQUNGO0FBQUMsZUFFYyxJQUFJZCxvQkFBb0IsRUFBRTtBQUFBIn0=