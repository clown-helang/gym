import { defineMessages } from 'react-intl';

const messages = defineMessages({
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
  operation:{
    id: 'common.operation',
    defaultMessage: '操作'
  },
  edit:{
    id: 'common.edit',
    defaultMessage: '编辑'
  },
  notNull:{
    id: 'common.Account.notNull',
    defaultMessage: '***不能为空'
  },
  addAdministrator:{
    id: 'userManage.adminManage.addAdministrator',
    defaultMessage: '添加管理员'
  },
});

export default messages;
