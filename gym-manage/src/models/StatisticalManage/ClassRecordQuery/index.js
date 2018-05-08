import { getClassRecord } from '../../../services/gymServices';

const init = {
  page_number: 1,
  page_size: 10,

  data: {},
  starttime:null,
  endtime:null,
  username:null,
  teachername:null,
};

export default {
  namespace: 'classRecordQuery',
  state : {},
  effects : {
    *getClassRecord({ payload }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      let { username, teachername, starttime, endtime, search_value, page_number, page_size } = yield select(state => state.classRecordQuery);
      if (payload !== undefined) {
        page_number = payload.page_number === undefined ? page_number : payload.page_number;
        page_size = payload.page_size === undefined ? page_size : payload.page_size;
        const payload_search_value = payload.search_value;
        if(payload_search_value===undefined){
          page_number = payload.page_number || page_number;
        }else{
          page_number = 1;
          search_value = payload_search_value;
        }
        page_size = payload.page_size || page_size;
      }
      let _payload = {
        token,
        isover:null,
        starttime:starttime||null,
        endtime:endtime||null,
        classtime:-1,
        classtecherid:null,
        classstudentid:null,
        classname:null,
        classstudent:username,
        classtecher:teachername,
        classdefineid:-1,
        shoplogid:-1,
        pageNo:page_number,
        pageSize:page_size,
      };
      const { total, contents } = yield call(getClassRecord,{ payload:{ ..._payload } });
      yield put({type:'setData',payload:{ data:{ total, contents }, page_number, page_size }});
    },
  },
  reducers : {
    init(state,{ payload }){
      return init;
    },
    setData(state,{ payload:{data, page_number, page_size} }){
      return {...state, data, page_number, page_size};
    },
    setUserName(state,{ payload:{username} }){
      return {...state, username};
    },
    setTeacherName(state,{ payload:{teachername} }){
      return {...state, teachername};
    },
    setRangeTime(state,{ payload:{timeRange} }){
      return {...state, starttime:timeRange[0]?`${timeRange[0]} 00:00:00`:null , endtime:timeRange[1]? `${timeRange[1]} 23:59:59`: null};
    }
  },
  subscriptions : {
    setup({dispatch, history}){
      return history.listen(({pathname, query}) => {
        if (pathname === '/statisticalManage/classRecordQuery') {
          dispatch({type:'init'});
          dispatch({type:'getClassRecord'});
        }
      });
    }
  }
}
