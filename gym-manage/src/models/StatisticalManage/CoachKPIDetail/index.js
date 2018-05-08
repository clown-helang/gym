import { getClassRecord,getRechargeRecord } from '../../../services/gymServices';

const init = {
  page_number: 1,
  page_size: 10,

  classRecord: {},
  salesRecord:{},
  classtecherid:null,
  starttime:null,
  endtime:null,

  salesStartTime:null,
  salesEndTime:null,
};

export default {
  namespace: 'coachKPIDetail',
  state : {},
  effects : {
    *getClassRecord({ payload }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      let { classtecherid,starttime, endtime, page_number, page_size } = yield select(state => state.coachKPIDetail);
      if (payload !== undefined) {
        page_number = payload.page_number === undefined ? page_number : payload.page_number;
        page_size = payload.page_size === undefined ? page_size : payload.page_size;
        classtecherid = payload.classtecherid === undefined ? classtecherid : payload.classtecherid;
      }
      let _payload = {
        token,
        isover:null,
        starttime:starttime||null,
        endtime:endtime||null,
        classtime:-1,
        classtecherid,
        classstudentid:null,
        classname:null,
        classstudent:null,
        classtecher:null,
        classdefineid:-1,
        shoplogid:-1,
        pageNo:page_number,
        pageSize:page_size,
      };
      const { total, contents } = yield call(getClassRecord,{ payload:{ ..._payload } });
      yield put({type:'setClassRecord',payload:{ classRecord:{ total, contents }, page_number, page_size }});
    },
    *getRechargeRecord({ payload }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      let { classtecherid,salesStartTime, salesEndTime, page_number, page_size } = yield select(state => state.coachKPIDetail);
      if (payload !== undefined) {
        page_number = payload.page_number === undefined ? page_number : payload.page_number;
        page_size = payload.page_size === undefined ? page_size : payload.page_size;
        classtecherid = payload.classtecherid === undefined ? classtecherid : payload.classtecherid;
      }
      let _payload = {
        token,
        techerid:classtecherid,
        studentid:null,
        adminid:null,
        studentname:null,
        techername:null,
        adminname:null,
        starttime:salesStartTime||null,
        endtime:salesEndTime||null,
        pageNo:page_number,
        pageSize:page_size,
      };
      const { total, contents } = yield call(getRechargeRecord,{ payload:{ ..._payload } });
      yield put({type:'setSalesRecord',payload:{ salesRecord:{ total, contents }, page_number, page_size }});
    },
  },
  reducers : {
    init(state,{ payload }){
      return init;
    },
    setTeacherID(state,{ payload:{ classtecherid } }){
      return {...state, classtecherid}
    },
    setClassRecord(state,{ payload:{ classRecord } }){
      return {...state, classRecord};
    },
    setSalesRecord(state,{ payload:{ salesRecord } }){
      return {...state, salesRecord};
    },
    setRangeTime(state,{ payload:{timeRange} }){
      return {...state, starttime:timeRange[0]?`${timeRange[0]} 00:00:00`:null , endtime:timeRange[1]? `${timeRange[1]} 23:59:59`: null};
    },
    setSalesRangeTime(state,{ payload:{timeRange} }){
      return {...state, salesStartTime:timeRange[0]?`${timeRange[0]} 00:00:00`:null , salesEndTime:timeRange[1]? `${timeRange[1]} 23:59:59`: null};
    }
  },
  subscriptions : {
    setup({dispatch, history}){
      return history.listen(({pathname, query}) => {
        if (pathname === '/statisticalManage/coachKPIQuery/detail') {
          dispatch({type:'init'});
          if(query.id){
            dispatch({type:'setTeacherID',payload:{classtecherid: query.id }});
            dispatch({type:'getClassRecord',payload:{classtecherid: query.id }});
            dispatch({type:'getRechargeRecord',payload:{classtecherid: query.id }});
          }
        }
      });
    }
  }
}
