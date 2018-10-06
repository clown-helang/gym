import { routerRedux } from 'dva/router';
import { getSession, setSession } from '../../utils';
import { getMembersById } from '../../services/gymServices'
import { Modal } from 'antd'
const appLocale = window.appLocale;

export default {
  namespace : 'home',
  state : {},
  effects : {
    *getMembersById({ payload:{ id } }, { put, call, select }){
      //console.log('拿到id',id)
      const data = yield call(getMembersById, { payload: { id } });
      if(data){
        setSession('id',data.id)
        setSession('name',data.nickName)
        setSession('headimgurl',data.headimgurl)
        setSession('usertype',data.usertype)
        setSession('realname',data.realname)
      }
      if(!data.realname){
        yield put(routerRedux.push({pathname:'/editPersonalInfor'}));
      } else{
        yield put(routerRedux.push('/indexPage'));
      }
    },
  },
  reducers : {},
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname,query}) => {
        if(pathname === '/'){
          /*----测试使用----*/
          //dispatch({type:'getMembersById',payload:{id:'or9F0xJw5Xv_c8C6qcYEVjDSNDyg'}}) //何浪
          //dispatch({type:'getMembersById',payload:{id:'or9F0xJOaFFQafYX2t0ca33RMg4o'}}) //安琪
          /*----正式环境----*/
          dispatch({type:'getMembersById',payload:{id:query.id}});
          if(query.accesstoken){
            setSession('token',query.accesstoken)
          }
        }
      });
    }
  }
}
