import { getCoaches } from '../../services/gymServices';
const appLocale = window.appLocale;

const init = {
  coaches: []
}

export default {
  namespace : 'coachList',
  state : {},
  effects : {
    *getCoaches({ payload }, { put, call, select }) {
      let _payload = {
        techername:null,
        pageNo:1,
        pageSize:1000,
      };
      const { total, contents } = yield call(getCoaches,{ payload:{ ..._payload } });
      yield put({type:'setCoachList',payload:{ coaches:contents }});
    },
  },
  reducers : {
    init(state){
      return init;
    },
    setCoachList(state,{ payload:{coaches} }){
      return {...state, coaches }
    },
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        if(pathname === '/coachList'){
          dispatch({type: 'init'});
          dispatch({type: 'getCoaches'})
        }
      });
    }
  }
}
