import { getMembersById, getConsumeRecord } from '../../../services/gymServices';

const init = {
  sort_direction: 'DESC',
  page_number: 1,
  page_size: 10,
  ownCourse: {},

  id: "",
  money: '',
  phone: "",
  realname: "",
  status: "",
  usertype: "",
  vipclass: "",
};

export default {
  namespace: 'memberDetail',
  state : {},
  effects : {
    *getMembersById({ payload:{ id } }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      const data = yield call(getMembersById,{ payload:{ token, id } });
      yield put({type:'setData',payload:{ data }});
    },
    *getConsumeRecord({ payload:{ id } }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      let _payload = {
        token,
        techerid:null,
        studentid:id||null,
        studentname:null,
        techername:null,
        starttime:null,
        endtime:null,
        classid:-1,
        classname:null,
        pageNo:1,
        pageSize:1000,
      };
      const { total, contents } = yield call(getConsumeRecord,{ payload:{ ..._payload } });
      yield put({type:'setOwnCourse',payload:{ ownCourse:{ total, contents } }});
    },

  },
  reducers : {
    init(state,{ payload }){
      return init;
    },
    setData(state,{ payload:{ data } }){
      return { ...state, ...data };
    },
    setOwnCourse(state,{ payload:{ ownCourse } }){
      return { ...state, ownCourse };
    },
    setSearchValue(state,{ payload:{ search_value } }){
      return { ...state, search_value };
    },
  },
  subscriptions : {
    setup({dispatch, history}){
      return history.listen(({pathname, query}) => {
        if (pathname === '/userManage/memberManage/memberDetail') {
          dispatch({type:'init'});
          if(query.id){
            dispatch({type:'getMembersById',payload:{ id: query.id }});
            dispatch({type:'getConsumeRecord',payload:{ id: query.id }});
          }
        }
      });
    }
  }
}
