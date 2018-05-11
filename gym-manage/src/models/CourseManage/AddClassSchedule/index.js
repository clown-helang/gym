import { getCourses, getCourseById } from '../../../services/gymServices';
import { routerRedux } from 'dva/router'

const init = {
  classname:'',
  iscommend:'1',
  isshop:'',
  classmoney:'',
  classtecher:'',
  classsize:'',
  introduce:[{
    description:'',
    resource_url:'',
    original_name:''
  }],
  type:'1',

  selectedRows: [],
  data:{},

  coachList:{},
  visible:false
};

export default {
  namespace: 'addClassSchedule',
  state : {},
  effects : {
    *getCourses({ payload }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      let _payload = {
        token,
        id:-1,
        iscommend:null,
        classname:null,
        pageNo:1,
        pageSize: 1000,
        isshop: null
      };
      const { total, contents } = yield call(getCourses,{ payload:{ ..._payload } });
      yield put({type:'setData',payload:{ data:{ total, contents }, page_number, page_size }});
    },


  },
  reducers : {
    init(state,{ payload }){
      return init;
    },
    setData(state,{ payload:{data} }){
      return {...state, data};
    },
  },
  subscriptions : {
    setup({dispatch, history}){
      return history.listen(({pathname,query}) => {
        if (pathname === '/classSchedule/add') {
          dispatch({type:'init'});
        } else if(pathname === '/courseManage/edit') {
          dispatch({type:'init'});
          if(query.id){
            dispatch({type:'getCourseById',payload:{id: query.id}});
          }
        }
      });
    }
  }
}
