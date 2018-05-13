import { getCoaches, getCourseByTeacherId, getCoachById } from '../../services/gymServices';
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
    *getCoachById({ payload:{id} }, { put, call, select }){
      const coach = yield call(getCoachById,{ payload:{ id } });
      yield put({type:'setCoach', payload:{ coach}});
      yield put({type:'getCourseByTeacherId'});
    },
    *getCourseByTeacherId({ payload }, { put, call, select }){
      const { id, realname } = yield select(state => state.coachList.coach)
      const { contents } = yield call(getCourseByTeacherId,{ payload:{ id, techername: realname} });
      yield put({type:'setCourseList', payload:{ courseList:contents}});
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
          dispatch({type: 'init'});
          console.log(query.id)
          dispatch({type: 'getCoachById',payload:{id:query.id}})
        }
      });
    }
  }
}
