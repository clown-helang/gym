import { routerRedux } from 'dva/router';
import { getBytes, getSession } from '../../utils';

const appLocale = window.appLocale;

export default {
  namespace : 'home',
  state : {
    user: getSession("user"),
    token: getSession("token"),
  },
  effects : {},
  reducers : {
    init(state,{ payload:{ user, token, path } }){
      return {...state, user, token, path };
    },
    setUser(state,{ user }){
      return {...state,user }
    },
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname,query}) => {
        if(pathname === '/'){
          dispatch(routerRedux.push('/index'));
        }
      });
    }
  }
}
