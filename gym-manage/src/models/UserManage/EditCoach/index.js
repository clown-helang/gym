import { getCoachById, getCourses } from '../../../services/gymServices';
import { routerRedux } from 'dva/router';
const messages = window.appLocale.messages;

const init = {
  loginname: "",
  phone: "",
  realname: "",
  id: "",
  vipclass: "",
  status: "",
  money: '',
  introduce: [{
    description:'',
    resource_url:'',
    original_name:''
  }],
  topimg: [{
    resource_url:'',
    original_name:''
  }],

  data:{},

  visible: false,
  selectedRows:[],
};

export default {
  namespace: 'editCoach',
  state : {},
  effects : {
    *getCoachById({ payload: { id } }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      const editData = yield call(getCoachById, { payload: { token, id } });
      if(!editData.introduce){
        editData.introduce = [{
          description:'',
          resource_url:'',
          original_name:''
        }]
      }
      yield put({type:'setEditData',payload:{ editData }});
    },
    *getCourses({ payload }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      let _payload = {
        token,
        id:-1,
        iscommend:null,
        classname:null,
        pageNo:1,
        pageSize:1000,
        isshop: null
      };
      const { total, contents } = yield call(getCourses,{ payload:{ ..._payload } });
      yield put({type:'setData',payload:{ data:{ total, contents } }});
    },
  },
  reducers : {
    init(state,{ payload }){
      return init;
    },
    setData(state,{ payload:{ data } }){
      return { ...state, data };
    },
    setEditData(state,{ payload:{ editData } }){
      return { ...state, ...editData };
    },
    setVisible(state,{ payload:{visible} }){
      return {...state, visible};
    },
    setSelectedRows(state,{ payload:{ selectedRows } }){
      return {...state, selectedRows};
    },
    setCourseList(state,{ payload:{ courseList } }){
      return { ...state, courseList };
    },
  },
  subscriptions : {
    setup({dispatch, history}){
      return history.listen(({pathname, query}) => {
        if (pathname === '/userManage/coachManage/edit') {
          dispatch({type:'init'});
          if(query.id){
            dispatch({type:'getCoachById',payload:{id:query.id}})
          }
        }
      });
    }
  }
}
