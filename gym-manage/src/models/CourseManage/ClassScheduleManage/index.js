import { getAllClassScheduleByTime, cancelGroupClass, deleteGroupClass } from '../../../services/gymServices';
import moment from 'moment-timezone';

const init = {
  search_value: '',
  page_number: 1,
  page_size: 10,
  data: {},

  starttime: moment().format('YYYY-MM-DD').toString()+' 00:00:00',
  endtime: moment().add(6,'d').format('YYYY-MM-DD').toString()+' 23:59:59',

};

export default {
  namespace: 'classSchedule',
  state : {},
  effects : {
    *getAllClassScheduleByTime({ payload }, { put, call, select }){
      const token = yield select(state => state.home.token);
      const {starttime,endtime} = yield select(state => state.classSchedule);
      const data = yield call(getAllClassScheduleByTime,{ payload:{ token, starttime, endtime } });
      yield put({type:'setData',payload:{ data }});
    },
    *cancelGroupClass({ payload:{classtimetableid} }, { put, call, select }){
      const token = yield select(state => state.home.token);
      yield call(cancelGroupClass,{ payload:{ token, classtimetableid } });
      yield put({type:'getAllClassScheduleByTime'});
    },
    *deleteGroupClass({ payload:{Id} }, { put, call, select }){
      const token = yield select(state => state.home.token);
      yield call(deleteGroupClass,{ payload:{ token, Id } });
      yield put({type:'getAllClassScheduleByTime'});
    },
  },
  reducers : {
    init(state,{ payload }){
      return init;
    },
    setData(state,{ payload:{ data } }){
      return {...state, data };
    },
    setSearchValue(state,{ payload:{search_value} }){
      return {...state, search_value};
    },
    setRangeTime(state,{ payload:{timeRange} }){
      return {...state, starttime:timeRange[0]?`${timeRange[0]} 00:00:00`:null , endtime:timeRange[1]? `${timeRange[1]} 23:59:59`: null};
    },
    setStartAndEndTime(state,{ payload:{starttime, endtime} }){
      return {...state, starttime, endtime};
    },
  },
  subscriptions : {
    setup({dispatch, history}){
      return history.listen(({pathname,query}) => {
        if(pathname === '/classSchedule'){
          dispatch({type:'init'});
          dispatch({type:'getAllClassScheduleByTime'});
        }
      });
    }
  }
}
