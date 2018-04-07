import {defineMessages} from 'react-intl';

const messages = defineMessages({
    title: {
        id: 'common.login.title',
        defaultMessage: 'STAROTT'
    },
    username: {
        label: {
            id: 'common.login.username.label',
            defaultMessage: '请输入帐号'
        },
        vtype: {
            id: 'common.login.username.vtype',
            defaultMessage: '帐号必填'
        }
    },
    password: {
        label: {
            id: 'common.login.password.label',
            defaultMessage: '请输入密码'
        },
        vtype: {
            id: 'common.login.password.vtype',
            defaultMessage: '密码必填'
        }
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
});

export default messages;
