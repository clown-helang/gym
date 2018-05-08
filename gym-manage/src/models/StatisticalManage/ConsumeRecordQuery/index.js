import { getConsumeRecord } from '../../../services/gymServices';

const init = {
  search_value: '',
  page_number: 1,
  page_size: 10,

  data: {},
  starttime:null,
  endtime:null,
};

export default {
  namespace: 'consumeRecordQuery',
  state : {},
  effects : {
    *getConsumeRecord({ payload }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      let { starttime, endtime, search_value, page_number, page_size } = yield select(state => state.consumeRecordQuery);
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
        techerid:null,
        studentid:null,
        studentname:null,
        techername:null,
        starttime:starttime||null,
        endtime:endtime||null,
        classid:-1,
        classname:null,
        pageNo:page_number,
        pageSize:page_size,
      };
      if (!(!search_value)) {
        if (search_value.indexOf('%') > -1 || search_value.indexOf('#') > -1) {
          _payload.techername = encodeURIComponent(search_value);
        }else {
          _payload.techername = search_value
        }
      }
      const { total, contents } = yield call(getConsumeRecord,{ payload:{ ..._payload } });
      yield put({type:'setData',payload:{ data:{ total, contents }, page_number, page_size }});
    },
    *delZones({ payload }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      let { selectedRows, data, page_number } = yield select(state => state.zoneConfiguration);
      if(data.contents.length===selectedRows.length){
        page_number --
      }
      yield call(delZones, { payload: { token, selectedRows } });
      yield put({type:'setSelectedRows',payload:{ selectedRows:[] }});
      yield put({type:'getZones',payload:{ page_number }});
    },
  },
  reducers : {
    init(state,{ payload }){
      return init;
    },
    setData(state,{ payload:{data, page_number, page_size} }){
      return {...state, data, page_number, page_size};
    },
    setSearchValue(state,{ payload:{search_value} }){
      return {...state, search_value};
    },
    setRangeTime(state,{ payload:{timeRange} }){
      return {...state, starttime:timeRange[0]?`${timeRange[0]} 00:00:00`:null , endtime:timeRange[1]? `${timeRange[1]} 23:59:59`: null};
    }
  },
  subscriptions : {
    setup({dispatch, history}){
      return history.listen(({pathname}) => {
        if (pathname === '/statisticalManage/consumeRecordQuery') {
          dispatch({type:'init'});
          dispatch({type:'getConsumeRecord'});
        }
      });
    }
  }
}
