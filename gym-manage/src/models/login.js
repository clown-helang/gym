import { Login } from '../services/gymServices';
import { getBytes,setSession } from '../utils';
import { Modal } from 'antd';
import md5 from 'md5';

export default {
  namespace : 'login',
  state : {
    loginLoading: false
  },
  effects : {
    *login({payload}, {put, call, select}) {
      let url = '/';
      yield put({type: 'showLoginLoading'});
      const result = yield call(Login, {payload:{loginname:payload.loginname, password:md5(getBytes(payload.password))}});
      if(result.code === '10453'){
        Modal.warning({title:appLocale.messages.error,content:'账号或密码错误'});
      } else{
        setSession('token', result.token);
        setSession('user', result.userinfo.realname);
        setSession('usertype', result.userinfo.usertype);
        setSession('user_id', result.userinfo.id);
        setSession('activeHeadMenu', url);
        setSession('openKeys', []);
        setSession('rootSubmenuKeys',[]);
        window.location.href = url;
      }
    }
  },
  reducers : {
    showLoginLoading(state) {
      return {...state,loginLoading: true}
    },
    hideLoginLoading(state) {
      return {...state,loginLoading: false}
    }
  }
}
