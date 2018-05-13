import { Login } from '../services/gymServices';
import { setSession } from '../utils';
import { Modal } from 'antd';

export default {
  namespace : 'login',
  state : {
    loginLoading: false
  },
  effects : {
    *login({payload}, {put, call, select}) {
      let url = '/';
      yield put({type: 'showLoginLoading'});
      const result = yield call(Login, {payload});
      console.log('result---',result)
      if(result.code === '10453'){
        Modal.warning({title:appLocale.messages.error,content:'账号或密码错误'});
      } else{
        setSession('token', result.token);
        setSession('user', result.userinfo.realname);
        setSession('usertype', result.userinfo.usertype);
        setSession('id', result.userinfo.id);
      }
      setSession('activeHeadMenu', url);
      setSession('openKeys', []);
      setSession('rootSubmenuKeys',[]);
      window.location.href = url;
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
