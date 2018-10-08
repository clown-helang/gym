import {defineMessages} from 'react-intl';

const messages = defineMessages({
    welcometitle: {
        id: 'common.home.welcome.title',
        defaultMessage: '欢迎使用后台管理系统'
    },
    title: {
        id: 'common.login.title',
        defaultMessage: 'STAROTT'
    },
    username: {
        label: {
            id: 'common.login.username.label',
            defaultMessage: '请输入用户名'
        },
        vtype: {
            id: 'common.login.username.vtype',
            defaultMessage: '用户名必填'
        }
    },
    password: {
        title: {
          id: 'common.login.password.title',
          defaultMessage: '密码修改'
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
    remember: {
        id: 'common.login.remember',
        defaultMessage: '记住',
    },
    forgotPass: {
        id: 'common.login.forgotPass',
        defaultMessage: '忘记密码'
    },
    login: {
        id: 'common.login.login',
        defaultMessage: '登录'
    },
  BreadcrumbUI:{
    userManage: {
      id: 'userManage',
      defaultMessage: '用户管理'
    },
    memberManage: {
      id: 'userManage.memberManage',
      defaultMessage: '会员管理'
    },
    memberDetail: {
      id: 'userManage.memberDetail',
      defaultMessage: '会员详情'
    },
    coachManage: {
      id: 'userManage.coachManage',
      defaultMessage: '教练管理'
    },
    edit: {
      id: 'common.edit',
      defaultMessage: '编辑'
    },
    add: {
      id: 'common.add',
      defaultMessage: '添加'
    },
    adminManage: {
      id: 'userManage.adminManage',
      defaultMessage: '管理员管理'
    },
    courseManage: {
      id: 'courseManage',
      defaultMessage: '课程管理'
    },
    statisticalManage: {
      id: 'statisticalManage',
      defaultMessage: '统计管理'
    },
    rechargeRecordQuery: {
      id: 'statisticalManage.rechargeRecordQuery',
      defaultMessage: '充值记录查询'
    },
    coachKPIQuery: {
      id: 'statisticalManage.coachKPIQuery',
      defaultMessage: '教练业绩查询'
    },
    consumeRecordQuery: {
      id: 'statisticalManage.consumeRecordQuery',
      defaultMessage: '消费记录查询'
    },
    classRecordQuery: {
      id: 'statisticalManage.classRecordQuery',
      defaultMessage: '上课记录查询'
    },
    detail: {
      id: 'common.detail',
      defaultMessage: '详情'
    },
    classSchedule: {
      id: 'courseManage.classSchedule',
      defaultMessage: '课表管理'
    },
    userCourseManage:{
      id: 'courseManage.userCourseManage',
      defaultMessage: '会员课程管理'
    }
  }
});

export default messages;
