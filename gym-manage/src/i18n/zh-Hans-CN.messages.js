const common = {
  "common.home.header.userinfo": "用户信息",
  "common.home.header.change_passwd": "密码修改",
  "common.home.header.logout": "退出",
  "common.home.header.logout.title": "提示",
  "common.home.header.logout.content": "确定退出登录？",
  "common.Account.title": "帐号修改",
  "common.Account.account": "帐号",
  "common.Account.name": "姓名",
  "common.Account.phone": "联系电话",
  "common.Account.email": "邮箱",
  "common.Account.email_illegal": "邮箱格式不正确",
  "common.Account.nameNotNull": "名称不能为空",
  'common.Account.form.phone_illegal': '输入电话号码不合法',
  'common.home.welcome.title':`欢迎使用后台管理系统`,
  'common.BaseUI.table.total': '共',
  'common.BaseUI.table.result': '条数据',
  'common.operation':'操作',
  'common.edit':'编辑',
  'common.recharge':'充值',
  'common.detail':'详情',
  'common.search': '搜索',
  'common.delete': '删除',
  'common.add': '添加',
  'common.ok': '确定',
  'common.cancel': '取消',
  'common.inputTip': '请输入',
  'common.selectTip': '请选择',
  'common.picture':'图片',
  'common.uploadPicture':'上传图片',
  'common.uploadPictureTip':'支持扩展名：.png .jpg',
};
const Login = {
  "common.login.title": System["common.System.title"],
  "common.login.username.label": "请输入帐号",
  "common.login.username.vtype": "帐号必填",
  "common.login.password.label": "请输入密码",
  "common.login.password.vtype": "密码必填",
  "common.login.remember": "记住密码",
  "common.login.forgotPass": "忘记密码",
  "common.login.login": "登录",
  'common.login.password.title': '密码修改',
  'common.login.password.oldpassword': '请输入旧密码',
  'common.login.password.confirmpassword': '请输入确认密码',
  'common.login.password.passwordnotsame': '两次输入的密码不一致',
  'common.login.password.change_passwd': '密码修改',
  'common.login.password.oldpassword.label': '旧密码',
  'common.login.password.newpasswd.label': '新密码',
  'common.login.password.confirmppasswd.label': '确认密码',
  'common.login.password.password_illegal': '密码长度不合法，请输入6~12位密码',
  'common.login.password.newpassword_illegal': '新密码不允许包含特殊字符',
  'company':'北京四达时代软件技术股份有限公司',
};


const errorResult = {
  "noPermissions": "您没有当前操作请求的权限！",
  //10 帐号权限管理
  "10400": "请求参数错误.",
  "10453": "帐号或密码错误",
  "10454": "用户不存在",
  "10455": "原密码错误",
  "10500": "服务异常",
  //other
  "204": "操作成功.",
  '400': '请求参数错误.',
  "error": "提示信息",
  "commom.Error.nologin.title": "重新登录",
  "commom.Error.nologin.content": "对不起，登录会话超时，请重新登录",
  "no.select.rows": "请选择要操作的数据.",
  "common.Error.PageNotFound": "您要请求的页面不存在.",
  "common.changePasswd.changePwdSuccess":"密码修改成功"
};

const userManage = {
  'userManage': '用户管理',
  'userManage.memberManage':'会员管理',
  'userManage.memberDetail':'会员详情',
  'userManage.memberManage.name':'会员姓名',
  'userManage.memberManage.account':'会员账号',
  'userManage.memberManage.balance':'账户余额（单位：元）',
  'userManage.memberManage.balanceNotUnit':'账户余额',
  'userManage.memberManage.type':'用户类型',
  'userManage.memberManage.member':'普通会员',
  'userManage.memberManage.coach':'教练',
  'userManage.memberManage.admin':'管理员',
  'userManage.memberManage.rechargeAmount':'充值金额',
  'userManage.memberManage.rechargeUnit':'元',
  'userManage.memberManage.rechargeAmountWithUnit':'充值金额（单位：元）',
  'userManage.memberManage.salesMan':'销售人',
  'userManage.memberManage.baseInformation':'基本信息',
  'userManage.memberManage.classRecord':'上课记录',
  'userManage.memberManage.rechargeRecord':'充值记录',
  'userManage.memberManage.rule':'角色',
  'userManage.memberManage.createTime':'注册时间',
  'userManage.memberManage.ownCourse':'拥有课程',
  'userManage.memberManage.payTime':'购买时间',
  'userManage.memberManage.selectData':'选择日期',
  'userManage.memberManage.classTime':'上课时间',
  'userManage.memberManage.rechargeTime':'充值时间',

  'userManage.coachManage':'教练管理',
  'userManage.coachManage.name':'教练姓名',
  'userManage.coachManage.uploadPhoto':'上传头像',
  'userManage.coachManage.coachDescription':'教练介绍',
  'userManage.coachManage.addCoachDescription':'添加教练介绍',
  'userManage.coachManage.relatedCourses':'关联课程',

  'userManage.adminManage':'管理员管理',
  'userManage.adminManage.name':'管理员姓名',
  'userManage.adminManage.account':'管理员账号',

};
const courseManage = {
  'courseManage': '课程管理',
  'courseManage.name': '课程名称',
  'courseManage.lengthOfTime': '课时（单位：小时）',
  'courseManage.type': '课程类型',
  'courseManage.groupClass': '团课',
  'courseManage.personalClass': '私教',
  'courseManage.coursePrice': '课程单价',
  'courseManage.state': '状态',
  'courseManage.effective': '有效',
  'courseManage.invalid': '无效',
  'courseManage.courseBackground': '课程背景图',
  'courseManage.courseDescription': '课程介绍',
  'courseManage.addCourseDescription': '添加课程介绍',
  'courseManage.selectCoach': '选择教练',
  'courseManage.priceUnit': '元/人民币',
};
const statisticalManage = {
  'statisticalManage': '统计管理',
  'statisticalManage.rechargeRecordQuery': '充值记录查询',
  'statisticalManage.rechargeRecordQuery.account': '充值账号',

  'statisticalManage.coachKPIQuery': '教练业绩查询',
  'statisticalManage.coachKPIQuery.durationOfClass': '上课总时长（单位：小时）',
  'statisticalManage.coachKPIQuery.salesTotal': '销售总额（单位：元）',
  'statisticalManage.coachKPIQuery.salesRecord': '销售记录',
  'statisticalManage.coachKPIQuery.appointmentMember': '预约人',
};

export default {...Login, ...errorResult,...common,...userManage,...courseManage,...statisticalManage};
