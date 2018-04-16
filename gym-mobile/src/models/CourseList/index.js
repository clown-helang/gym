import { routerRedux } from 'dva/router';
import { getBytes, getSession } from '../../utils';

const appLocale = window.appLocale;

export default {
  namespace : 'courseList',
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
      return history.listen(({pathname}) => {
        // const token = getSession("token");
        // const user = getSession("user");
        // if ( (!token) && pathname !== '/login') {
        //   dispatch(routerRedux.push("/login"));
        // } else{
        //   const path = pathname.split('/');
        //   dispatch({type:'init', payload:{user, token,path: path.filter(item => item !== '') }});
        // }
      });
    }
  }
}
