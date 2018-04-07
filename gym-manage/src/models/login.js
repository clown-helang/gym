import {login} from '../services/userManage';
import { setLocalStorage } from '../utils';

export default {
  namespace : 'login',
  state : {
    loginLoading: false
  },
  effects : {
    *login({payload}, {put, call, select}) {
      let url = '/';
      yield put({type: 'showLoginLoading'});
      const result = yield call(login, {payload});
      const { name, token, tenant_id } = result;
      setLocalStorage('user', name);
      setLocalStorage('token', token);
      setLocalStorage('tenant_id',tenant_id);
      setLocalStorage('activeHeadMenu', url);
      setLocalStorage('openKeys', []);
      setLocalStorage('rootSubmenuKeys',[]);
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
