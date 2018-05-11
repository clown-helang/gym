import { getCourses, getCoaches } from '../../services/gymServices'

const init = {
  courses: [],
  coaches:[],
  course:{}
}

export default {
  namespace : 'courseList',
  state : {},
  effects : {
    *getCourses({ payload }, { put, call, select }) {
      let _payload = {
        id:-1,
        iscommend: null,
        classname: null,
        pageNo:1,
        pageSize:1000,
        isshop: '1'
      };
      const { contents } = yield call(getCourses,{ payload:{ ..._payload } });
      yield put({type:'setCourseList', payload:{ courses:contents}});
    },
    *getCoaches({ payload }, { put, call, select }) {
      let _payload = {
        techername:null,
        pageNo:1,
        pageSize:1000,
      };
      const { contents } = yield call(getCoaches,{ payload:{ ..._payload } });
      yield put({type:'setCoachList',payload:{ coaches:contents }});
    },
  },
  reducers : {
    init(state){
      return init;
    },
    setCourseList(state,{ payload:{ courses } }){
      return { ...state, courses }
    },
    setCoachList(state,{ payload:{coaches} }){
      return {...state, coaches }
    },
    setCourse(state,{ payload:{course}} ){
      return {...state, course }
    }
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname,query}) => {
        if(pathname === '/courseList'){
          dispatch({type: 'init'});
          dispatch({type: 'getCourses'})
        }
        if(pathname === '/courseDetail'){
          if(query.course){
            dispatch({type: 'setCourse',payload:{course:JSON.parse(query.course)}})
          }
        }
      });
    }
  }
}
