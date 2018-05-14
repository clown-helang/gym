import { routerRedux } from 'dva/router';
import { getSession } from '../../utils';
import { getMembersById, changeUserInfor } from '../../services/gymServices';
import { Modal } from 'antd'

const warning = Modal.warning;
const init = {
  realname:'',
  phone:'',
  worktime:'',
  profession:'',
  wanttechersex:'男性教练',
  wanttobe:'',
  sourceUrl:''
}

export default {
  namespace : 'editPersonalInfor',
  state : {},
  effects : {
    *getMembersById({ payload }, { put, call, select }){
      const user = yield call(getMembersById, { payload: { id:getSession('id') } });
      yield put({type:'setUser',payload:{ user }});
    },
    *changeUserInfor({ payload:{postData} }, { put, call, select }){
      const { sourceUrl } = yield select(state => state.editPersonalInfor);
      yield call(changeUserInfor, { payload: { id:getSession('id'),...postData } });
      if(sourceUrl){
        yield put(routerRedux.push(`/${sourceUrl}`));
      }else{
        yield put(routerRedux.push('/indexPage'));
      }
    },
  },
  reducers : {
    init(state){
      return init;
    },
    setUser(state,{ payload:{ user } }){
      console.log('user--',user)
      return {...state, ...user }
    },
    setSourceUrl(state,{ payload:{ sourceUrl } }){
      return {...state, sourceUrl }
    },
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if ( pathname === '/editPersonalInfor') {
          dispatch({ type: "init"})
          dispatch({ type: "getMembersById" })
          if(query.sourceUrl){
            dispatch({ type: "setSourceUrl",payload:{sourceUrl: query.sourceUrl} })
          }
        }
      });
    }
  }
}
