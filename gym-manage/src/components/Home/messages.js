import {defineMessages} from 'react-intl';

const messages = defineMessages({
  logoTitle: {
    id: 'common.login.title',
    defaultMessage: '酒店管理云平台'
  },
  title: {
    id: 'common.home.header.logout.title',
    defaultMessage: '提示'
  },
  content: {
    id: 'common.home.header.logout.content',
    defaultMessage: '确定退出登录？'
  },
  userinfo: {
    id: 'common.home.header.userinfo',
    defaultMessage: '用户信息'
  },
  change_passwd: {
    id: 'common.home.header.change_passwd',
    defaultMessage: '密码修改'
  },
  logout: {
    id: 'common.home.header.logout',
    defaultMessage: '退出'
  },
  appManagement: {
    id: 'common.home.header.menu.appManagement',
    defaultMessage: '应用和镜像'
  },
  hotel_manage: {
    id: "common.home.header.menu.hotel_manage",
    defaultMessage: '酒店管理'
  },
  guestRoom_manage: {
    id: "common.home.header.menu.guestRoom_manage",
    defaultMessage: '客房管理'
  },
  message_manage: {
    id: "common.home.header.menu.message_manage",
    defaultMessage: '消息管理'
  },
  terminal_manage: {
    id: 'common.home.header.menu.terminal_manage',
    defaultMessage: '终端管理'
  },
  mediaCapitalManagement: {
    id: 'common.home.header.menu.mediaCapitalManagement',
    defaultMessage: '媒资管理'
  },
  businessManagement: {
    id: 'common.home.header.menu.businessManagement',
    defaultMessage: '业务管理'
  },
  contentManagement: {
    id: 'common.home.header.menu.contentManagement',
    defaultMessage: '视频管理'
  },
  tenants_manage:{
    id: 'common.home.header.menu.tenants_manage',
    defaultMessage: '租户管理'
  },
  information_manage:{
    id: 'common.home.header.menu.information_manage',
    defaultMessage: '图文管理'
  },
  portalManagement:{
    id: 'common.home.header.menu.portalManagement',
    defaultMessage: '门户管理'
  },
  user_manage:{
    id: 'common.home.header.menu.user_manage',
    defaultMessage: '用户管理'
  },
  analyticsManagement:{
    id: 'common.home.header.menu.analyticsManagement',
    defaultMessage: '统计分析'
  },
  operator_manage:{
    id: 'common.home.header.menu.operator_manage',
    defaultMessage: '系统管理'
  },
  editUser:{
    id: 'common.Account.title',
    defaultMessage: '帐号修改'
  },
  password: {
    title: {
      id: 'common.login.password.title',
      defaultMessage: '密码修改'
    },
    password_illegal:{
      id: 'common.login.password.password_illegal',
      defaultMessage: '密码长度不合法，请输入6~12位密码'
    },
    newpassword_illegal:{
      id: 'common.login.password.newpassword_illegal',
      defaultMessage: '新密码不允许包含特殊字符'
    },
    label: {
      id: 'common.login.password.label',
      defaultMessage: '请输入密码'
    },
    vtype: {
      id: 'common.login.password.vtype',
      defaultMessage: '密码必填'
    },
    oldpassword: {
      id: 'common.login.password.oldpassword',
      defaultMessage: '请输入旧密码'
    },
    confirmpassword: {
      id: 'common.login.password.confirmpassword',
      defaultMessage: '请输入确认密码'
    },
    passwordnotsame: {
      id: 'common.login.password.passwordnotsame',
      defaultMessage: '两次输入的密码不一致'
    },
    changepasswd: {
      id: 'common.login.password.change_passwd',
      defaultMessage: '密码修改'
    },
    oldpasswordlabel: {
      id: 'common.login.password.oldpassword.label',
      defaultMessage: '旧密码'
    },
    newpasswdlabel: {
      id: 'common.login.password.newpasswd.label',
      defaultMessage: '新密码'
    },
    confirmppasswdlabel: {
      id: 'common.login.password.confirmppasswd.label',
      defaultMessage: '确认密码'
    },
  },
  account: {
    title:{
      id: 'common.Account.title',
      defaultMessage: '帐号修改'
    },
    account:{
      id: 'common.Account.account',
      defaultMessage: '帐号'
    },
    name:{
      id: 'common.Account.name',
      defaultMessage: '名称'
    },
    phone:{
      id: 'common.Account.phone',
      defaultMessage: '电话'
    },
    email:{
      id: 'common.Account.email',
      defaultMessage: '邮箱'
    },
    email_illegal:{
      id: 'common.Account.email_illegal',
      defaultMessage: '邮箱格式不正确'
    },
    nameNotNull:{
      id: 'common.Account.nameNotNull',
      defaultMessage: '名称不能为空'
    },
    phone_illegal: {
      id: 'common.Account.form.phone_illegal',
      defaultMessage: '输入电话号码不合法'
    },
  }
});

export default messages;
