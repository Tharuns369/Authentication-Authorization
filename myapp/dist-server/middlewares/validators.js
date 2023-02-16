"use strict";

var _joi = _interopRequireWildcard(require("joi"));
var _userModel = _interopRequireDefault(require("../models/userModel"));
var _userDataServiceProvider = _interopRequireDefault(require("../services/userDataServiceProvider"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const signupSchema = _joi.default.object({
  name: _joi.default.string().min(5),
  email: _joi.default.string().email().required().email({
    minDomainSegments: 2,
    tlds: {
      allow: ['com', 'net']
    }
  }),
  password: _joi.default.string().min(8).required().pattern(new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$')),
  confirmpassword: _joi.default.string().required().valid(_joi.default.ref('password'))
});
const siginSchema = _joi.default.object({
  email: _joi.default.string().email().required(),
  password: _joi.default.string().required()
});
const updataeSchema = _joi.default.object({
  name: _joi.default.string().required()
});
const passwordSchema = _joi.default.object({
  oldpassword: _joi.default.string().required().pattern(new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$')),
  newpassword: _joi.default.string().required().pattern(new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$'))
});
const forgotpasswordrequestSchema = _joi.default.object({
  email: _joi.default.string().email().required()
});
const resetpasswordSchema = _joi.default.object({
  password: _joi.default.string().required().pattern(new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$')),
  token: _joi.default.string()
});
const validateSignup = async (req, res, next) => {
  try {
    const {
      error,
      value
    } = await signupSchema.validate(req.body, {
      abortEarly: false
    });
    if (error) {
      console.log(error);
      console.log(req.body.password);
      return res.send(error.details);
    }
    const checkingUser = await _userModel.default.findOne({
      email: req.body.email
    });
    if (checkingUser) {
      return res.status(401).send({
        success: "false",
        message: "user already exsists"
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong"
    });
  }
  next();
};
const validateSignin = async (req, res, next) => {
  try {
    const {
      error,
      value
    } = await siginSchema.validate(req.body, {
      abortEarly: false
    });
    if (error) {
      console.log(error);
      console.log(req.body.password);
      return res.send(error.details);
    }
    const checkingUser = await _userModel.default.findOne({
      email: req.body.email
    });
    if (!checkingUser) {
      return res.status(401).send({
        success: "false",
        message: "Invalid credintials"
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong"
    });
  }
  next();
};
const validateprofile = async (req, res, next) => {
  try {
    const {
      error,
      value
    } = await updataeSchema.validate(req.body, {
      abortEarly: false
    });
    if (error) {
      console.log(error);
      console.log(req.body.password);
      return res.send(error.details);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong"
    });
  }
  next();
};
const validatepassword = async (req, res, next) => {
  try {
    const {
      error,
      value
    } = await passwordSchema.validate(req.body, {
      abortEarly: false
    });
    if (error) {
      console.log(error);
      console.log(req.body.password);
      return res.send(error.details);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong"
    });
  }
  next();
};
const vallidateforgotpasswordrequest = async (req, res, next) => {
  try {
    const {
      error,
      value
    } = await forgotpasswordrequestSchema.validate(req.body, {
      abortEarly: false
    });
    if (error) {
      console.log(error);
      console.log(req.body.password);
      return res.send(error.details);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong"
    });
  }
  next();
};
const validateresetpassword = async (req, res, next) => {
  try {
    const {
      error,
      value
    } = await resetpasswordSchema.validate(req.body, {
      abortEarly: false
    });
    if (error) {
      console.log(error);
      console.log(req.body.password);
      return res.send(error.details);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong"
    });
  }
  next();
};
module.exports = {
  validateSignup,
  validateSignin,
  validateprofile,
  validatepassword,
  vallidateforgotpasswordrequest,
  validateresetpassword
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJzaWdudXBTY2hlbWEiLCJKb2kiLCJvYmplY3QiLCJuYW1lIiwic3RyaW5nIiwibWluIiwiZW1haWwiLCJyZXF1aXJlZCIsIm1pbkRvbWFpblNlZ21lbnRzIiwidGxkcyIsImFsbG93IiwicGFzc3dvcmQiLCJwYXR0ZXJuIiwiUmVnRXhwIiwiY29uZmlybXBhc3N3b3JkIiwidmFsaWQiLCJyZWYiLCJzaWdpblNjaGVtYSIsInVwZGF0YWVTY2hlbWEiLCJwYXNzd29yZFNjaGVtYSIsIm9sZHBhc3N3b3JkIiwibmV3cGFzc3dvcmQiLCJmb3Jnb3RwYXNzd29yZHJlcXVlc3RTY2hlbWEiLCJyZXNldHBhc3N3b3JkU2NoZW1hIiwidG9rZW4iLCJ2YWxpZGF0ZVNpZ251cCIsInJlcSIsInJlcyIsIm5leHQiLCJlcnJvciIsInZhbHVlIiwidmFsaWRhdGUiLCJib2R5IiwiYWJvcnRFYXJseSIsImNvbnNvbGUiLCJsb2ciLCJzZW5kIiwiZGV0YWlscyIsImNoZWNraW5nVXNlciIsInVzZXJNb2RlbCIsImZpbmRPbmUiLCJzdGF0dXMiLCJzdWNjZXNzIiwibWVzc2FnZSIsImVyciIsImpzb24iLCJ2YWxpZGF0ZVNpZ25pbiIsInZhbGlkYXRlcHJvZmlsZSIsInZhbGlkYXRlcGFzc3dvcmQiLCJ2YWxsaWRhdGVmb3Jnb3RwYXNzd29yZHJlcXVlc3QiLCJ2YWxpZGF0ZXJlc2V0cGFzc3dvcmQiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vc2VydmVyL21pZGRsZXdhcmVzL3ZhbGlkYXRvcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEpvaSwgeyBhbnkgfSBmcm9tICdqb2knXHJcbmltcG9ydCB1c2VyTW9kZWwgZnJvbSBcIi4uL21vZGVscy91c2VyTW9kZWxcIjtcclxuaW1wb3J0IHVzZXJEYXRhU2VydmljZVByb3ZpZGVyIGZyb20gXCIuLi9zZXJ2aWNlcy91c2VyRGF0YVNlcnZpY2VQcm92aWRlclwiO1xyXG5cclxuXHJcbmNvbnN0IHNpZ251cFNjaGVtYSA9IEpvaS5vYmplY3Qoe1xyXG4gIG5hbWU6IEpvaS5zdHJpbmcoKVxyXG4gICAgLm1pbig1KSxcclxuICBlbWFpbDogSm9pLnN0cmluZygpXHJcbiAgICAuZW1haWwoKVxyXG4gICAgLnJlcXVpcmVkKClcclxuICAgIC5lbWFpbCh7IG1pbkRvbWFpblNlZ21lbnRzOiAyLCB0bGRzOiB7IGFsbG93OiBbJ2NvbScsICduZXQnXSB9IH0pLFxyXG4gIHBhc3N3b3JkOiBKb2kuc3RyaW5nKClcclxuICAgIC5taW4oOClcclxuICAgIC5yZXF1aXJlZCgpXHJcbiAgICAucGF0dGVybihuZXcgUmVnRXhwKCdeKD89LipcXFxcZCkoPz0uKlthLXpdKSg/PS4qW0EtWl0pKD89LipbIUAjJCVeJipdKSg/PS4qW2EtekEtWl0pLns4LH0kJykpLFxyXG4gIGNvbmZpcm1wYXNzd29yZDogSm9pLnN0cmluZygpXHJcbiAgICAucmVxdWlyZWQoKVxyXG4gICAgLnZhbGlkKEpvaS5yZWYoJ3Bhc3N3b3JkJykpXHJcblxyXG59KTtcclxuXHJcblxyXG5jb25zdCBzaWdpblNjaGVtYSA9IEpvaS5vYmplY3Qoe1xyXG4gIGVtYWlsOiBKb2kuc3RyaW5nKClcclxuICAgIC5lbWFpbCgpXHJcbiAgICAucmVxdWlyZWQoKSxcclxuICBwYXNzd29yZDogSm9pLnN0cmluZygpXHJcbiAgICAucmVxdWlyZWQoKVxyXG5cclxuXHJcbn0pO1xyXG5cclxuY29uc3QgdXBkYXRhZVNjaGVtYSA9IEpvaS5vYmplY3Qoe1xyXG4gIG5hbWU6IEpvaS5zdHJpbmcoKVxyXG4gICAgLnJlcXVpcmVkKCksXHJcbn0pO1xyXG5cclxuY29uc3QgcGFzc3dvcmRTY2hlbWEgPSBKb2kub2JqZWN0KFxyXG4gIHtcclxuICAgIG9sZHBhc3N3b3JkOiBKb2kuc3RyaW5nKClcclxuICAgICAgLnJlcXVpcmVkKClcclxuICAgICAgLnBhdHRlcm4obmV3IFJlZ0V4cCgnXig/PS4qXFxcXGQpKD89LipbYS16XSkoPz0uKltBLVpdKSg/PS4qWyFAIyQlXiYqXSkoPz0uKlthLXpBLVpdKS57OCx9JCcpKSxcclxuICAgIG5ld3Bhc3N3b3JkOiBKb2kuc3RyaW5nKClcclxuICAgICAgLnJlcXVpcmVkKClcclxuICAgICAgLnBhdHRlcm4obmV3IFJlZ0V4cCgnXig/PS4qXFxcXGQpKD89LipbYS16XSkoPz0uKltBLVpdKSg/PS4qWyFAIyQlXiYqXSkoPz0uKlthLXpBLVpdKS57OCx9JCcpKVxyXG4gIH1cclxuKVxyXG5jb25zdCBmb3Jnb3RwYXNzd29yZHJlcXVlc3RTY2hlbWEgPSBKb2kub2JqZWN0KHtcclxuICBlbWFpbDogSm9pLnN0cmluZygpXHJcbiAgICAuZW1haWwoKVxyXG4gICAgLnJlcXVpcmVkKCksXHJcblxyXG59KTtcclxuY29uc3QgcmVzZXRwYXNzd29yZFNjaGVtYSA9IEpvaS5vYmplY3QoXHJcbiAge1xyXG4gICAgcGFzc3dvcmQ6IEpvaS5zdHJpbmcoKVxyXG4gICAgICAucmVxdWlyZWQoKVxyXG4gICAgICAucGF0dGVybihuZXcgUmVnRXhwKCdeKD89LipcXFxcZCkoPz0uKlthLXpdKSg/PS4qW0EtWl0pKD89LipbIUAjJCVeJipdKSg/PS4qW2EtekEtWl0pLns4LH0kJykpLFxyXG4gICAgdG9rZW46IEpvaS5zdHJpbmcoKVxyXG5cclxuICB9XHJcbilcclxuXHJcbmNvbnN0IHZhbGlkYXRlU2lnbnVwID0gYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcbiAgdHJ5IHtcclxuXHJcbiAgICBjb25zdCB7IGVycm9yLCB2YWx1ZSB9ID0gYXdhaXQgc2lnbnVwU2NoZW1hLnZhbGlkYXRlKHJlcS5ib2R5LFxyXG4gICAgICB7XHJcbiAgICAgICAgYWJvcnRFYXJseTogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIGlmIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcS5ib2R5LnBhc3N3b3JkKVxyXG4gICAgICByZXR1cm4gcmVzLnNlbmQoZXJyb3IuZGV0YWlscyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2hlY2tpbmdVc2VyID0gYXdhaXQgdXNlck1vZGVsLmZpbmRPbmUoeyBlbWFpbDogcmVxLmJvZHkuZW1haWwgfSlcclxuICAgIGlmIChjaGVja2luZ1VzZXIpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5zZW5kKHtcclxuICAgICAgICBzdWNjZXNzOiBcImZhbHNlXCIsXHJcbiAgICAgICAgbWVzc2FnZTogXCJ1c2VyIGFscmVhZHkgZXhzaXN0c1wiXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gIH1cclxuICBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcclxuICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlIHx8IFwiU29tZXRoaW5nIHdlbnQgd3JvbmdcIlxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIG5leHQoKVxyXG59XHJcblxyXG5cclxuY29uc3QgdmFsaWRhdGVTaWduaW4gPSBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICB0cnkge1xyXG5cclxuICAgIGNvbnN0IHsgZXJyb3IsIHZhbHVlIH0gPSBhd2FpdCBzaWdpblNjaGVtYS52YWxpZGF0ZShyZXEuYm9keSxcclxuICAgICAge1xyXG4gICAgICAgIGFib3J0RWFybHk6IGZhbHNlLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXEuYm9keS5wYXNzd29yZClcclxuICAgICAgcmV0dXJuIHJlcy5zZW5kKGVycm9yLmRldGFpbHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNoZWNraW5nVXNlciA9IGF3YWl0IHVzZXJNb2RlbC5maW5kT25lKHsgZW1haWw6IHJlcS5ib2R5LmVtYWlsIH0pXHJcbiAgICBpZiAoIWNoZWNraW5nVXNlcikge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLnNlbmQoe1xyXG4gICAgICAgIHN1Y2Nlc3M6IFwiZmFsc2VcIixcclxuICAgICAgICBtZXNzYWdlOiBcIkludmFsaWQgY3JlZGludGlhbHNcIlxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICB9XHJcbiAgY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7XHJcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZSB8fCBcIlNvbWV0aGluZyB3ZW50IHdyb25nXCJcclxuICAgIH0pO1xyXG4gIH1cclxuICBuZXh0KClcclxufVxyXG5jb25zdCB2YWxpZGF0ZXByb2ZpbGUgPSBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICB0cnkge1xyXG5cclxuICAgIGNvbnN0IHsgZXJyb3IsIHZhbHVlIH0gPSBhd2FpdCB1cGRhdGFlU2NoZW1hLnZhbGlkYXRlKHJlcS5ib2R5LFxyXG4gICAgICB7XHJcbiAgICAgICAgYWJvcnRFYXJseTogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIGlmIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcS5ib2R5LnBhc3N3b3JkKVxyXG4gICAgICByZXR1cm4gcmVzLnNlbmQoZXJyb3IuZGV0YWlscyk7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcclxuICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlIHx8IFwiU29tZXRoaW5nIHdlbnQgd3JvbmdcIlxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuICBuZXh0KClcclxufVxyXG5jb25zdCB2YWxpZGF0ZXBhc3N3b3JkID0gYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcbiAgdHJ5IHtcclxuXHJcbiAgICBjb25zdCB7IGVycm9yLCB2YWx1ZSB9ID0gYXdhaXQgcGFzc3dvcmRTY2hlbWEudmFsaWRhdGUocmVxLmJvZHksXHJcbiAgICAgIHtcclxuICAgICAgICBhYm9ydEVhcmx5OiBmYWxzZSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgaWYgKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgY29uc29sZS5sb2cocmVxLmJvZHkucGFzc3dvcmQpXHJcbiAgICAgIHJldHVybiByZXMuc2VuZChlcnJvci5kZXRhaWxzKTtcclxuICAgIH1cclxuICB9XHJcbiAgY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7XHJcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZSB8fCBcIlNvbWV0aGluZyB3ZW50IHdyb25nXCJcclxuICAgIH0pO1xyXG4gIH1cclxuICBuZXh0KClcclxufVxyXG5cclxuY29uc3QgdmFsbGlkYXRlZm9yZ290cGFzc3dvcmRyZXF1ZXN0ID0gYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcbiAgdHJ5IHtcclxuXHJcbiAgICBjb25zdCB7IGVycm9yLCB2YWx1ZSB9ID0gYXdhaXQgZm9yZ290cGFzc3dvcmRyZXF1ZXN0U2NoZW1hLnZhbGlkYXRlKHJlcS5ib2R5LFxyXG4gICAgICB7XHJcbiAgICAgICAgYWJvcnRFYXJseTogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIGlmIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcS5ib2R5LnBhc3N3b3JkKVxyXG4gICAgICByZXR1cm4gcmVzLnNlbmQoZXJyb3IuZGV0YWlscyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oe1xyXG4gICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfHwgXCJTb21ldGhpbmcgd2VudCB3cm9uZ1wiXHJcbiAgICB9KTtcclxuICB9XHJcbiAgbmV4dCgpXHJcbn1cclxuXHJcbmNvbnN0IHZhbGlkYXRlcmVzZXRwYXNzd29yZCA9IGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gIHRyeSB7XHJcblxyXG4gICAgY29uc3QgeyBlcnJvciwgdmFsdWUgfSA9IGF3YWl0IHJlc2V0cGFzc3dvcmRTY2hlbWEudmFsaWRhdGUocmVxLmJvZHksXHJcbiAgICAgIHtcclxuICAgICAgICBhYm9ydEVhcmx5OiBmYWxzZSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgaWYgKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgY29uc29sZS5sb2cocmVxLmJvZHkucGFzc3dvcmQpXHJcbiAgICAgIHJldHVybiByZXMuc2VuZChlcnJvci5kZXRhaWxzKTtcclxuICAgIH1cclxuICB9XHJcbiAgY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7XHJcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZSB8fCBcIlNvbWV0aGluZyB3ZW50IHdyb25nXCJcclxuICAgIH0pO1xyXG4gIH1cclxuICBuZXh0KClcclxufVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID1cclxue1xyXG4gIHZhbGlkYXRlU2lnbnVwLFxyXG4gIHZhbGlkYXRlU2lnbmluLFxyXG4gIHZhbGlkYXRlcHJvZmlsZSxcclxuICB2YWxpZGF0ZXBhc3N3b3JkLFxyXG4gIHZhbGxpZGF0ZWZvcmdvdHBhc3N3b3JkcmVxdWVzdCxcclxuICB2YWxpZGF0ZXJlc2V0cGFzc3dvcmRcclxufVxyXG5cclxuXHJcblxyXG5cclxuIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUEwRTtBQUFBO0FBQUE7QUFHMUUsTUFBTUEsWUFBWSxHQUFHQyxZQUFHLENBQUNDLE1BQU0sQ0FBQztFQUM5QkMsSUFBSSxFQUFFRixZQUFHLENBQUNHLE1BQU0sRUFBRSxDQUNmQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ1RDLEtBQUssRUFBRUwsWUFBRyxDQUFDRyxNQUFNLEVBQUUsQ0FDaEJFLEtBQUssRUFBRSxDQUNQQyxRQUFRLEVBQUUsQ0FDVkQsS0FBSyxDQUFDO0lBQUVFLGlCQUFpQixFQUFFLENBQUM7SUFBRUMsSUFBSSxFQUFFO01BQUVDLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLO0lBQUU7RUFBRSxDQUFDLENBQUM7RUFDbkVDLFFBQVEsRUFBRVYsWUFBRyxDQUFDRyxNQUFNLEVBQUUsQ0FDbkJDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FDTkUsUUFBUSxFQUFFLENBQ1ZLLE9BQU8sQ0FBQyxJQUFJQyxNQUFNLENBQUMsc0VBQXNFLENBQUMsQ0FBQztFQUM5RkMsZUFBZSxFQUFFYixZQUFHLENBQUNHLE1BQU0sRUFBRSxDQUMxQkcsUUFBUSxFQUFFLENBQ1ZRLEtBQUssQ0FBQ2QsWUFBRyxDQUFDZSxHQUFHLENBQUMsVUFBVSxDQUFDO0FBRTlCLENBQUMsQ0FBQztBQUdGLE1BQU1DLFdBQVcsR0FBR2hCLFlBQUcsQ0FBQ0MsTUFBTSxDQUFDO0VBQzdCSSxLQUFLLEVBQUVMLFlBQUcsQ0FBQ0csTUFBTSxFQUFFLENBQ2hCRSxLQUFLLEVBQUUsQ0FDUEMsUUFBUSxFQUFFO0VBQ2JJLFFBQVEsRUFBRVYsWUFBRyxDQUFDRyxNQUFNLEVBQUUsQ0FDbkJHLFFBQVE7QUFHYixDQUFDLENBQUM7QUFFRixNQUFNVyxhQUFhLEdBQUdqQixZQUFHLENBQUNDLE1BQU0sQ0FBQztFQUMvQkMsSUFBSSxFQUFFRixZQUFHLENBQUNHLE1BQU0sRUFBRSxDQUNmRyxRQUFRO0FBQ2IsQ0FBQyxDQUFDO0FBRUYsTUFBTVksY0FBYyxHQUFHbEIsWUFBRyxDQUFDQyxNQUFNLENBQy9CO0VBQ0VrQixXQUFXLEVBQUVuQixZQUFHLENBQUNHLE1BQU0sRUFBRSxDQUN0QkcsUUFBUSxFQUFFLENBQ1ZLLE9BQU8sQ0FBQyxJQUFJQyxNQUFNLENBQUMsc0VBQXNFLENBQUMsQ0FBQztFQUM5RlEsV0FBVyxFQUFFcEIsWUFBRyxDQUFDRyxNQUFNLEVBQUUsQ0FDdEJHLFFBQVEsRUFBRSxDQUNWSyxPQUFPLENBQUMsSUFBSUMsTUFBTSxDQUFDLHNFQUFzRSxDQUFDO0FBQy9GLENBQUMsQ0FDRjtBQUNELE1BQU1TLDJCQUEyQixHQUFHckIsWUFBRyxDQUFDQyxNQUFNLENBQUM7RUFDN0NJLEtBQUssRUFBRUwsWUFBRyxDQUFDRyxNQUFNLEVBQUUsQ0FDaEJFLEtBQUssRUFBRSxDQUNQQyxRQUFRO0FBRWIsQ0FBQyxDQUFDO0FBQ0YsTUFBTWdCLG1CQUFtQixHQUFHdEIsWUFBRyxDQUFDQyxNQUFNLENBQ3BDO0VBQ0VTLFFBQVEsRUFBRVYsWUFBRyxDQUFDRyxNQUFNLEVBQUUsQ0FDbkJHLFFBQVEsRUFBRSxDQUNWSyxPQUFPLENBQUMsSUFBSUMsTUFBTSxDQUFDLHNFQUFzRSxDQUFDLENBQUM7RUFDOUZXLEtBQUssRUFBRXZCLFlBQUcsQ0FBQ0csTUFBTTtBQUVuQixDQUFDLENBQ0Y7QUFFRCxNQUFNcUIsY0FBYyxHQUFHLE9BQU9DLEdBQUcsRUFBRUMsR0FBRyxFQUFFQyxJQUFJLEtBQUs7RUFDL0MsSUFBSTtJQUVGLE1BQU07TUFBRUMsS0FBSztNQUFFQztJQUFNLENBQUMsR0FBRyxNQUFNOUIsWUFBWSxDQUFDK0IsUUFBUSxDQUFDTCxHQUFHLENBQUNNLElBQUksRUFDM0Q7TUFDRUMsVUFBVSxFQUFFO0lBQ2QsQ0FBQyxDQUFDO0lBRUosSUFBSUosS0FBSyxFQUFFO01BQ1RLLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDTixLQUFLLENBQUM7TUFDbEJLLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDVCxHQUFHLENBQUNNLElBQUksQ0FBQ3JCLFFBQVEsQ0FBQztNQUM5QixPQUFPZ0IsR0FBRyxDQUFDUyxJQUFJLENBQUNQLEtBQUssQ0FBQ1EsT0FBTyxDQUFDO0lBQ2hDO0lBRUEsTUFBTUMsWUFBWSxHQUFHLE1BQU1DLGtCQUFTLENBQUNDLE9BQU8sQ0FBQztNQUFFbEMsS0FBSyxFQUFFb0IsR0FBRyxDQUFDTSxJQUFJLENBQUMxQjtJQUFNLENBQUMsQ0FBQztJQUN2RSxJQUFJZ0MsWUFBWSxFQUFFO01BQ2hCLE9BQU9YLEdBQUcsQ0FBQ2MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDTCxJQUFJLENBQUM7UUFDMUJNLE9BQU8sRUFBRSxPQUFPO1FBQ2hCQyxPQUFPLEVBQUU7TUFDWCxDQUFDLENBQUM7SUFDSjtFQUVGLENBQUMsQ0FDRCxPQUFPQyxHQUFHLEVBQUU7SUFDVlYsT0FBTyxDQUFDQyxHQUFHLENBQUNTLEdBQUcsQ0FBQztJQUNoQixPQUFPakIsR0FBRyxDQUFDYyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNJLElBQUksQ0FBQztNQUMxQkgsT0FBTyxFQUFFLEtBQUs7TUFDZEMsT0FBTyxFQUFFQyxHQUFHLENBQUNELE9BQU8sSUFBSTtJQUMxQixDQUFDLENBQUM7RUFDSjtFQUNBZixJQUFJLEVBQUU7QUFDUixDQUFDO0FBR0QsTUFBTWtCLGNBQWMsR0FBRyxPQUFPcEIsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksS0FBSztFQUMvQyxJQUFJO0lBRUYsTUFBTTtNQUFFQyxLQUFLO01BQUVDO0lBQU0sQ0FBQyxHQUFHLE1BQU1iLFdBQVcsQ0FBQ2MsUUFBUSxDQUFDTCxHQUFHLENBQUNNLElBQUksRUFDMUQ7TUFDRUMsVUFBVSxFQUFFO0lBQ2QsQ0FBQyxDQUFDO0lBRUosSUFBSUosS0FBSyxFQUFFO01BQ1RLLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDTixLQUFLLENBQUM7TUFDbEJLLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDVCxHQUFHLENBQUNNLElBQUksQ0FBQ3JCLFFBQVEsQ0FBQztNQUM5QixPQUFPZ0IsR0FBRyxDQUFDUyxJQUFJLENBQUNQLEtBQUssQ0FBQ1EsT0FBTyxDQUFDO0lBQ2hDO0lBRUEsTUFBTUMsWUFBWSxHQUFHLE1BQU1DLGtCQUFTLENBQUNDLE9BQU8sQ0FBQztNQUFFbEMsS0FBSyxFQUFFb0IsR0FBRyxDQUFDTSxJQUFJLENBQUMxQjtJQUFNLENBQUMsQ0FBQztJQUN2RSxJQUFJLENBQUNnQyxZQUFZLEVBQUU7TUFDakIsT0FBT1gsR0FBRyxDQUFDYyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNMLElBQUksQ0FBQztRQUMxQk0sT0FBTyxFQUFFLE9BQU87UUFDaEJDLE9BQU8sRUFBRTtNQUNYLENBQUMsQ0FBQztJQUNKO0VBRUYsQ0FBQyxDQUNELE9BQU9DLEdBQUcsRUFBRTtJQUNWVixPQUFPLENBQUNDLEdBQUcsQ0FBQ1MsR0FBRyxDQUFDO0lBQ2hCLE9BQU9qQixHQUFHLENBQUNjLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0ksSUFBSSxDQUFDO01BQzFCSCxPQUFPLEVBQUUsS0FBSztNQUNkQyxPQUFPLEVBQUVDLEdBQUcsQ0FBQ0QsT0FBTyxJQUFJO0lBQzFCLENBQUMsQ0FBQztFQUNKO0VBQ0FmLElBQUksRUFBRTtBQUNSLENBQUM7QUFDRCxNQUFNbUIsZUFBZSxHQUFHLE9BQU9yQixHQUFHLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxLQUFLO0VBQ2hELElBQUk7SUFFRixNQUFNO01BQUVDLEtBQUs7TUFBRUM7SUFBTSxDQUFDLEdBQUcsTUFBTVosYUFBYSxDQUFDYSxRQUFRLENBQUNMLEdBQUcsQ0FBQ00sSUFBSSxFQUM1RDtNQUNFQyxVQUFVLEVBQUU7SUFDZCxDQUFDLENBQUM7SUFFSixJQUFJSixLQUFLLEVBQUU7TUFDVEssT0FBTyxDQUFDQyxHQUFHLENBQUNOLEtBQUssQ0FBQztNQUNsQkssT0FBTyxDQUFDQyxHQUFHLENBQUNULEdBQUcsQ0FBQ00sSUFBSSxDQUFDckIsUUFBUSxDQUFDO01BQzlCLE9BQU9nQixHQUFHLENBQUNTLElBQUksQ0FBQ1AsS0FBSyxDQUFDUSxPQUFPLENBQUM7SUFDaEM7RUFDRixDQUFDLENBQUMsT0FBT08sR0FBRyxFQUFFO0lBQ1pWLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDUyxHQUFHLENBQUM7SUFDaEIsT0FBT2pCLEdBQUcsQ0FBQ2MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDSSxJQUFJLENBQUM7TUFDMUJILE9BQU8sRUFBRSxLQUFLO01BQ2RDLE9BQU8sRUFBRUMsR0FBRyxDQUFDRCxPQUFPLElBQUk7SUFDMUIsQ0FBQyxDQUFDO0VBRUo7RUFDQWYsSUFBSSxFQUFFO0FBQ1IsQ0FBQztBQUNELE1BQU1vQixnQkFBZ0IsR0FBRyxPQUFPdEIsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksS0FBSztFQUNqRCxJQUFJO0lBRUYsTUFBTTtNQUFFQyxLQUFLO01BQUVDO0lBQU0sQ0FBQyxHQUFHLE1BQU1YLGNBQWMsQ0FBQ1ksUUFBUSxDQUFDTCxHQUFHLENBQUNNLElBQUksRUFDN0Q7TUFDRUMsVUFBVSxFQUFFO0lBQ2QsQ0FBQyxDQUFDO0lBRUosSUFBSUosS0FBSyxFQUFFO01BQ1RLLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDTixLQUFLLENBQUM7TUFDbEJLLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDVCxHQUFHLENBQUNNLElBQUksQ0FBQ3JCLFFBQVEsQ0FBQztNQUM5QixPQUFPZ0IsR0FBRyxDQUFDUyxJQUFJLENBQUNQLEtBQUssQ0FBQ1EsT0FBTyxDQUFDO0lBQ2hDO0VBQ0YsQ0FBQyxDQUNELE9BQU9PLEdBQUcsRUFBRTtJQUNWVixPQUFPLENBQUNDLEdBQUcsQ0FBQ1MsR0FBRyxDQUFDO0lBQ2hCLE9BQU9qQixHQUFHLENBQUNjLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0ksSUFBSSxDQUFDO01BQzFCSCxPQUFPLEVBQUUsS0FBSztNQUNkQyxPQUFPLEVBQUVDLEdBQUcsQ0FBQ0QsT0FBTyxJQUFJO0lBQzFCLENBQUMsQ0FBQztFQUNKO0VBQ0FmLElBQUksRUFBRTtBQUNSLENBQUM7QUFFRCxNQUFNcUIsOEJBQThCLEdBQUcsT0FBT3ZCLEdBQUcsRUFBRUMsR0FBRyxFQUFFQyxJQUFJLEtBQUs7RUFDL0QsSUFBSTtJQUVGLE1BQU07TUFBRUMsS0FBSztNQUFFQztJQUFNLENBQUMsR0FBRyxNQUFNUiwyQkFBMkIsQ0FBQ1MsUUFBUSxDQUFDTCxHQUFHLENBQUNNLElBQUksRUFDMUU7TUFDRUMsVUFBVSxFQUFFO0lBQ2QsQ0FBQyxDQUFDO0lBRUosSUFBSUosS0FBSyxFQUFFO01BQ1RLLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDTixLQUFLLENBQUM7TUFDbEJLLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDVCxHQUFHLENBQUNNLElBQUksQ0FBQ3JCLFFBQVEsQ0FBQztNQUM5QixPQUFPZ0IsR0FBRyxDQUFDUyxJQUFJLENBQUNQLEtBQUssQ0FBQ1EsT0FBTyxDQUFDO0lBQ2hDO0VBQ0YsQ0FBQyxDQUNELE9BQU9PLEdBQUcsRUFBRTtJQUNWVixPQUFPLENBQUNDLEdBQUcsQ0FBQ1MsR0FBRyxDQUFDO0lBQ2hCLE9BQU9qQixHQUFHLENBQUNjLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0ksSUFBSSxDQUFDO01BQzFCSCxPQUFPLEVBQUUsS0FBSztNQUNkQyxPQUFPLEVBQUVDLEdBQUcsQ0FBQ0QsT0FBTyxJQUFJO0lBQzFCLENBQUMsQ0FBQztFQUNKO0VBQ0FmLElBQUksRUFBRTtBQUNSLENBQUM7QUFFRCxNQUFNc0IscUJBQXFCLEdBQUcsT0FBT3hCLEdBQUcsRUFBRUMsR0FBRyxFQUFFQyxJQUFJLEtBQUs7RUFDdEQsSUFBSTtJQUVGLE1BQU07TUFBRUMsS0FBSztNQUFFQztJQUFNLENBQUMsR0FBRyxNQUFNUCxtQkFBbUIsQ0FBQ1EsUUFBUSxDQUFDTCxHQUFHLENBQUNNLElBQUksRUFDbEU7TUFDRUMsVUFBVSxFQUFFO0lBQ2QsQ0FBQyxDQUFDO0lBRUosSUFBSUosS0FBSyxFQUFFO01BQ1RLLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDTixLQUFLLENBQUM7TUFDbEJLLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDVCxHQUFHLENBQUNNLElBQUksQ0FBQ3JCLFFBQVEsQ0FBQztNQUM5QixPQUFPZ0IsR0FBRyxDQUFDUyxJQUFJLENBQUNQLEtBQUssQ0FBQ1EsT0FBTyxDQUFDO0lBQ2hDO0VBQ0YsQ0FBQyxDQUNELE9BQU9PLEdBQUcsRUFBRTtJQUNWVixPQUFPLENBQUNDLEdBQUcsQ0FBQ1MsR0FBRyxDQUFDO0lBQ2hCLE9BQU9qQixHQUFHLENBQUNjLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0ksSUFBSSxDQUFDO01BQzFCSCxPQUFPLEVBQUUsS0FBSztNQUNkQyxPQUFPLEVBQUVDLEdBQUcsQ0FBQ0QsT0FBTyxJQUFJO0lBQzFCLENBQUMsQ0FBQztFQUNKO0VBQ0FmLElBQUksRUFBRTtBQUNSLENBQUM7QUFHRHVCLE1BQU0sQ0FBQ0MsT0FBTyxHQUNkO0VBQ0UzQixjQUFjO0VBQ2RxQixjQUFjO0VBQ2RDLGVBQWU7RUFDZkMsZ0JBQWdCO0VBQ2hCQyw4QkFBOEI7RUFDOUJDO0FBQ0YsQ0FBQyJ9