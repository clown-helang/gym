import { routerRedux } from 'dva/router';
import { getSession } from '../../utils';
import { buyClass, getCourseById } from '../../services/gymServices';
import { Modal } from 'antd'
const warning = Modal.warning;
const init = {
  course: {
    classimg:[],
    classmoney:'',
    classname:'',
    introduce:[],
    classtecher:'',
    classsize:'',
    type:'1',
  },
  techerid:null,
  available_flag:false
}

export default {
  namespace : 'buyCourse',
  state : {},
  effects : {
    *buyClass({ payload },{ put, call, select }){
      const { techerid,course } = yield select(state => state.buyCourse);
      const result = yield call(buyClass,{ payload:{ studentid:getSession('id'), techerid, classdefineid:course.id } });
      if(result.error_message){
        if(result.code === '10522'){
          warning({
            title: '温馨提示',
            content: '账户余额不足！',
            okText: '确定',
          });
        } else{
          warning({
            title: '温馨提示',
            content: '购买失败！',
          });
        }
      } else {
        yield put(routerRedux.push({pathname:'/myCourse'}));
      }
    },
    *getCourseById({ payload:{ id } }, { put, call, select }){
      const course = yield call(getCourseById,{ payload:{ id } });
      course.classimg = JSON.parse(course.classimg);
      course.introduce = JSON.parse(course.introduce);
      console.log('course----',course)
      yield put({type:'setCourse', payload:{ course }});
    }
  },
  reducers : {
    init(state){
      return init;
    },
    setCourse(state,{ payload:{ course } }){
      return {...state, course }
    },
    setCoachList(state,{ payload:{coaches} }){
      return {...state, coaches }
    },
    setTeacherId(state,{ payload:{techerid} }){
      return {...state, techerid }
    },
    setAvailableFlag(state,{ payload:{available_flag} }){
      return {...state, available_flag }
    }
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if ( pathname === '/buyCourse') {
          dispatch({ type: "init"})
          dispatch({ type: "getCourseById", payload:{id: query.id}})
        }
      });
    }
  }
}
