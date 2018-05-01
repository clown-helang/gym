import { getAdmins } from '../../../services/gymServices';

const init = {
  search_value: '',
  sort_direction: 'DESC',
  page_number: 1,
  page_size: 10,
  selectedRows: [],
  data: {
    total:1,
    contents:[{
      id: 1,
      account:'admin@qq.com',
      name: '店长',
      phone: '15991234567',
      rule: 'admin'
    }],
  },
  visible: false,
  editData:{},
};

export default {
  namespace: 'adminManage',
  state : {},
  effects : {
    *getAdmins({ payload }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      let { search_value, page_number, page_size } = yield select(state => state.adminManage);
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
        adminname:null,
        pageNo:page_number,
        pageSize:page_size,
      };
      if (!(!search_value)) {
        if (search_value.indexOf('%') > -1 || search_value.indexOf('#') > -1) {
          _payload.adminname = encodeURIComponent(search_value);
        }else {
          _payload.adminname = search_value
        }
      }
      const { total, contents } = yield call(getAdmins,{ payload:{ ..._payload } });
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
    setVisible(state,{ payload:{visible} }){
      return {...state, visible};
    },
    setEditData(state,{ payload:{ editData }}){
      return {...state, editData};
    },
  },
  subscriptions : {
    setup({dispatch, history}){
      return history.listen(({pathname}) => {
        if (pathname === '/userManage/adminManage') {
          dispatch({type:'init'});
          dispatch({type:'getAdmins'});
        }
      });
    }
  }
}
