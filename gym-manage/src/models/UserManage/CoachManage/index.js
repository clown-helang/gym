import { getCoaches } from '../../../services/gymServices';

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
      account:'bbwq@qq.com',
      name: '波波维奇',
      phone: '15991234567',
    }]},
};

export default {
  namespace: 'coachManage',
  state : {},
  effects : {
    *getCoaches({ payload }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      let { search_value, page_number, page_size } = yield select(state => state.coachManage);
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
        techername:null,
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
      const { total, contents } = yield call(getCoaches,{ payload:{ ..._payload } });
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
    setSearchValue(state,{ payload:{search_value} }){
      return {...state, search_value};
    },
    setSelectedRows(state,{ payload:{selectedRows} }){
      return {...state, selectedRows};
    }
  },
  subscriptions : {
    setup({dispatch, history}){
      return history.listen(({pathname}) => {
        if (pathname === '/userManage/coachManage') {
          dispatch({type:'init'});
          dispatch({type:'getCoaches'});
        }
      });
    }
  }
}
