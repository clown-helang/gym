import { getCourses, getCourseById } from '../../services/gymServices'
import { getSession } from '../../utils'

const init = {
  courses: [],
  coaches:[],
  course:{
    classimg:[],
    classmoney:'',
    classname:'',
    introduce:[],
  },
  classname:'',
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
        isshop: '1',
        techerid:null,
        techername:null
      };
      if(getSession('usertype').toString()==="2"){
        _payload.techerid = getSession('id');
        _payload.techername = getSession('realname');
      }
      const { contents } = yield call(getCourses,{ payload:{ ..._payload } });
      yield put({type:'setCourseList', payload:{ courses:contents}});
    },
    *getCourseById({ payload:{ id } }, { put, call, select }){
      const course = yield call(getCourseById,{ payload:{ id } });
      course.classimg = JSON.parse(course.classimg);
      course.introduce = JSON.parse(course.introduce);
      yield put({type:'setCourse', payload:{ course }});
    }
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
          dispatch({type: 'init'});
          if(query.id){
            dispatch({type: 'getCourseById',payload:{id:query.id}});
          }
        }
      });
    }
  }
}
