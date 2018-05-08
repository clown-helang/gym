import { routerRedux } from 'dva/router';
import { getSession, setSession } from '../../utils';
import { getMembersById } from '../../services/gymServices'

const appLocale = window.appLocale;

export default {
  namespace : 'home',
  state : {},
  effects : {
    *getMembersById({ payload:{ id } }, { put, call, select }){
      const data = yield call(getMembersById, { payload: { id } });
      if(data){
        setSession('id',data.id)
        setSession('name',data.nickName)
        setSession('headimgurl',data.headimgurl)
        setSession('usertype',data.usertype)
      }
    },
  },
  reducers : {},
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname,query}) => {
        if(pathname === '/'){
          dispatch({type:'getMembersById',payload:{id:'or9F0xJw5Xv_c8C6qcYEVjDSNDyg'}})
          dispatch(routerRedux.push('/indexPage'));
        }
      });
    }
  }
}
