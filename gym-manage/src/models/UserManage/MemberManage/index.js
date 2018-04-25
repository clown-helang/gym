import { getMembers } from '../../../services/gymServices';

const init = {
  search_value: '',
  page_number: 1,
  page_size: 10,
  selectedRows: [],
  data: {},
  editData:{},
  editVisible: false,
  rechargeVisible: false,
};

export default {
  namespace: 'memberManage',
  state : {},
  effects : {
    *getMembers({ payload }, { put, call, select }) {
      console.log(1111)
      const token = yield select(state => state.home.token);
      let { search_value, page_number, page_size } = yield select(state => state.memberManage);
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
        username:null,
        pageNo:page_number,
        pageSize:page_size,
      };
      if (!(!search_value)) {
        if (search_value.indexOf('%') > -1 || search_value.indexOf('#') > -1) {
          _payload.username = encodeURIComponent(search_value);
        }else {
          _payload.username = search_value
        }
      }
      console.log(2222)
      const { total, contents } = yield call(getMembers,{ payload:{ ..._payload } });
      console.log(3333)
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
    setSelectedRows(state,{ payload:{selectedRows} }){
      return {...state, selectedRows};
    },
    setEditData(state,{ payload:{ editData }}){
      return {...state, editData};
    },
    setEditVisible(state,{ payload:{ editVisible }}){
      return {...state, editVisible};
    },
    setRechargeVisible(state,{ payload:{ rechargeVisible }}){
      return {...state, rechargeVisible};
    },
  },
  subscriptions : {
    setup({dispatch, history}){
      return history.listen(({pathname}) => {
        if (pathname === '/userManage/memberManage') {
          dispatch({type:'init'});
          dispatch({type:'getMembers'});
        }
      });
    }
  }
}
