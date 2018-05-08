import { getAdmins, changeUserType, getMembersById } from '../../../services/gymServices';

const init = {
  search_value: '',

  page_number: 1,
  page_size: 10,

  data: {},
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
    *getMembersById({ payload:{ id } }, { put, call, select }){
      const token = yield select(state => state.home.token);
      const editData = yield call(getMembersById, { payload: { token,id } });
      yield put({type:'setEditData', payload:{ editData }});
    },
    *changeUserType({ payload:{ type } }, { put, call, select }){
      const token = yield select(state => state.home.token);
      const { id } = yield select(state => state.adminManage.editData);
      yield call(changeUserType, { payload: { token, id, type } });
      yield put({type:'getAdmins'});
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
