const System = {
  "common.System.title": "STAROTT",
};

const Login = {
  "common.login.title":  System["common.System.title"],
  "common.login.username.label": "Username",
  "common.login.username.vtype": "Username Is Required",
  "common.login.password.label": "Password",
  "common.login.password.vtype": "Password Is Required",
  "common.login.remember": "Remember Me",
  "common.login.forgotPass": "Forgot Password",
  "common.login.login": "Login",
  'common.login.password.title': 'Change Password',
  'common.login.password.oldpassword': 'Please input your old password',
  'common.login.password.confirmpassword': 'Please confirm your password',
  'common.login.password.passwordnotsame': 'Two passwords that you enter is inconsistent',
  'common.login.password.change_passwd': 'Change',
  'common.login.password.oldpassword.label': 'Old Password',
  'common.login.password.newpasswd.label': 'New Password',
  'common.login.password.confirmppasswd.label': 'Confirm Password',
  'company':'Beijing StarTimes software technology Limited by Share Ltd',
};

const Home = {
  'common.home.welcome.title': `Welcome To ${System["common.System.title"]}`,
};

const errorResult = {
  //10 酒店管理
  "10400": "Request parmeter is error.",
  "10500": "Account Or Password Error.",
  //other
  "204": "Success.",
  "error": "Error",
  "commom.Error.nologin.title": "Sorry",
  "commom.Error.nologin.content": "Sorry,your session has expired,please re-login",
  "no.select.rows": "Please select the data to be operated.",
  "common.Error.PageNotFound": "Page Not Found.",
};
const changePasswd = {
  "common.changePasswd.changePwdSuccess":"Password modifies success"
};
export default {...Login, ...Home, ...errorResult,...changePasswd};
