import { getMembers, getCoaches, rechargeMoney, getMembersById, changeUserType} from '../../../services/gymServices';
import { getSession } from '../../../utils';
const init = {
  search_value: '',
  page_number: 1,
  page_size: 10,

  data: {},
  editData:{},

  editVisible: false,
  rechargeVisible: false,
  // 充值
  memberId:'',
  memberAccount:'',
  memberName:'',
  coachList:[],
};

export default {
  namespace: 'memberManage',
  state : {},
  effects : {
    *getMembers({ payload }, { put, call, select }) {
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
      const { total, contents } = yield call(getMembers,{ payload:{ ..._payload } });
      yield put({type:'setData',payload:{ data:{ total, contents }, page_number, page_size }});
    },
    *getMembersById({ payload:{ id } }, { put, call, select }){
      const token = yield select(state => state.home.token);
      const editData = yield call(getMembersById, { payload: { token,id } });
      yield put({type:'setEditData', payload:{ editData }});
    },
    *changeUserType({ payload:{ type } }, { put, call, select }){
      const token = yield select(state => state.home.token);
      const { id } = yield select(state => state.memberManage.editData);
      yield call(changeUserType, { payload: { token, id, type } });
      yield put({type:'getMembers'});
    },
    *getCoaches({ payload }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      let coachList = [];
      let _payload = {
        token,
        techername:null,
        pageNo: 1,
        pageSize: 1000,
      };
      const { contents } = yield call(getCoaches,{ payload:{ ..._payload } });

      contents.map(item =>{
        coachList.push({
          value: item.id,
          text: item.realname
        })
      })

      yield put({type:'setCoachList',payload:{ coachList }});
    },
    *rechargeMoney({ payload:{ postData } }, { put, call, select }) {
      let adminid = getSession('user_id');
      const token = yield select(state => state.home.token);
      let { memberId } = yield select(state => state.memberManage);
      yield call(rechargeMoney, { payload: { studentid:memberId, techerid:postData.salesMan, money: postData.rechargeAmount,adminid  } });
      yield put({type:'setMemberInformation',payload:{ memberId:'', memberAccount:'', memberName:'' }});
      yield put({type:'getMembers'});
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
    setMemberInformation(state,{ payload:{ memberId, memberAccount, memberName } }){
      return {...state, memberId, memberAccount, memberName};
    },
    setCoachList(state,{ payload:{ coachList }}){
      return {...state, coachList};
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
