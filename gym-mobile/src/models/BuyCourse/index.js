import { routerRedux } from 'dva/router';
import { getSession } from '../../utils';
import { buyClass } from '../../services/gymServices';
import { Modal } from 'antd'

const appLocale = window.appLocale;

const init = {
  course: {},
  techerid:null
}

export default {
  namespace : 'buyCourse',
  state : {},
  effects : {
    *buyClass({ payload },{ put, call, select }){
      const { techerid,course } = yield select(state => state.buyCourse);
      const result = yield call(buyClass,{ payload:{ studentid:getSession('id'), techerid, classdefineid:course.id } });
      if(result.state === 'success'){
        Modal.info({
          title: '课程购买成功',
        })
      }
      yield put(routerRedux.push({pathname:'/myCourse'}));
    }
  },
  reducers : {
    init(state){
      return init;
    },
    setCourse(state,{ payload:{ course } }){
      console.log(6666,course)
      return {...state, course }
    },
    setCoachList(state,{ payload:{coaches} }){
      return {...state, coaches }
    },
    setTeacherId(state,{ payload:{techerid} }){
      return {...state, techerid }
    },
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if ( pathname === '/buyCourse') {
          dispatch({ type: "init"})
          if(query.course){
            console.log(5555)
            dispatch({ type: "setCourse", payload:{course:JSON.parse(query.course)}})
          }
        }
      });
    }
  }
}
