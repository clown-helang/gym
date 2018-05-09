import { getCoaches, getCourseByTeacherId } from '../../services/gymServices';
const appLocale = window.appLocale;

const init = {
  coaches: [],
  courseList: [],
  coach:{},
}

export default {
  namespace : 'coachList',
  state : {},
  effects : {
    *getCoaches({ payload }, { put, call, select }) {
      let _payload = {
        techername:null,
        pageNo:1,
        pageSize:1000,
      };
      const { contents } = yield call(getCoaches,{ payload:{ ..._payload } });
      yield put({type:'setCoachList',payload:{ coaches:contents }});
    },
    *getCourseByTeacherId({ payload:{id, techername} }, { put, call, select }){
      const contents = yield call(getCourseByTeacherId,{ payload:{ id, techername } });
      yield put({type:'courseList', payload:{ course:contents}});
    }
  },
  reducers : {
    init(state){
      return init;
    },
    setCoachList(state,{ payload:{coaches} }){
      return {...state, coaches }
    },
    setCourseList(state,{ payload:{courseList} }){
      return {...state, courseList }
    },
    setCoach(state,{ payload:{ coach } }){
      return {...state, coach }
    }
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname,query}) => {
        if(pathname === '/coachList'){
          dispatch({type: 'init'});
          dispatch({type: 'getCoaches'})
        }
        if(pathname === '/coachDetail'){
          if(query.coach){
            dispatch({type: 'setCoach',payload:{coach: query.coach}})
            dispatch({type: 'getCourseByTeacherId',payload:{id: query.coach.id, techername:query.coach.realname}})
          }
        }
      });
    }
  }
}
