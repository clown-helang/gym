//import { getZones, delZones } from '../../services/';

const init = {
  search_value: '',
  sort_direction: 'DESC',
  page_number: 1,
  page_size: 10,
  selectedRows: [],
  data: {
    total:2,
    contents:[{
      id: 1,
      account:'zhangs@qq.com',
      name: '张三',
      phone: '15991234567',
      rule: 'member',
      balance: '5000'
    },{
      id: 2,
      account:'lisi@qq.com',
      name: '李四',
      phone: '15991238888',
      rule: 'member',
      balance: '10000'
    }
    ]
  },
  editData:{},
  editVisible: false,
  rechargeVisible: false,
};

export default {
  namespace: 'memberManage',
  state : {},
  effects : {
    *getZones({ payload }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      let { search_value, sort_direction, page_number, page_size } = yield select(state => state.zoneConfiguration);
      if (payload !== undefined) {
        sort_direction = payload.sort_direction === undefined ? sort_direction : payload.sort_direction;
        const payload_search_value = payload.search_value;
        if(payload_search_value===undefined){
          page_number = payload.page_number || page_number;
        }else{
          page_number = 1;
          search_value = payload_search_value;
        }
        page_size = payload.page_size || page_size;
      }
      sort_direction = (sort_direction === 'descend' || sort_direction === 'DESC') ? 'DESC' : 'ASC';
      let _payload = {
        token,
        sort_direction,
        page_number,
        page_size,
      };
      if (!(!search_value)) {
        if (search_value.indexOf('%') > -1 || search_value.indexOf('#') > -1) {
          _payload.search_value = encodeURIComponent(search_value);
        }else {
          _payload.search_value = search_value
        }
      }
      const { total, contents } = yield call(getZones,{ payload:{ ..._payload } });
      yield put({type:'setData',payload:{ data:{ total, contents }, sort_direction, page_number, page_size }});
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
    setData(state,{ payload:{data, sort_direction, page_number, page_size} }){
      return {...state, data, sort_direction, page_number, page_size};
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
          //dispatch({type:'getZones'});
        }
      });
    }
  }
}
