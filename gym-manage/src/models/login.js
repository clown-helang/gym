import {login} from '../services/gymServices';
import { setSession } from '../utils';

export default {
  namespace : 'login',
  state : {
    loginLoading: false
  },
  effects : {
    *login({payload}, {put, call, select}) {
      let url = '/';
      yield put({type: 'showLoginLoading'});
      //const result = yield call(login, {payload});
      // const { name, token, tenant_id } = payload;
      setSession('user', 'admin');
      setSession('token', 'token');
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
