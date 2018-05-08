import { getCoachKPI } from '../../../services/gymServices';

const init = {
  page_number: 1,
  page_size: 10,

  data: {},
  starttime:null,
  endtime:null,
};

export default {
  namespace: 'coachKPIQuery',
  state : {},
  effects : {
    *getCoachKPI({ payload }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      let { starttime, endtime, page_number, page_size } = yield select(state => state.coachKPIQuery);
      if (payload !== undefined) {
        page_number = payload.page_number === undefined ? page_number : payload.page_number;
        page_size = payload.page_size === undefined ? page_size : payload.page_size;
      }
      let _payload = {
        token,
        starttime,
        endtime,
        pageNo:page_number,
        pageSize:page_size,
      };
      const { total, contents } = yield call(getCoachKPI,{ payload:{ ..._payload } });
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
    setRangeTime(state,{ payload:{timeRange} }){
      return {...state, starttime:timeRange[0]?`${timeRange[0]} 00:00:00`:null , endtime:timeRange[1]? `${timeRange[1]} 23:59:59`: null};
    }
  },
  subscriptions : {
    setup({dispatch, history}){
      return history.listen(({pathname}) => {
        if (pathname === '/statisticalManage/coachKPIQuery') {
          dispatch({type:'init'});
          dispatch({type:'getCoachKPI'});
        }
      });
    }
  }
}
