import { getCourses } from '../../services/gymServices'

const init = {
  course: []
}

export default {
  namespace : 'indexPage',
  state : {},
  effects : {
    *getCourses({ payload }, { put, call, select }) {
      let _payload = {
        id:-1,
        iscommend:'1',
        classname:null,
        pageNo:1,
        pageSize:1000,
        isshop: '1',
        techerid:null,
        techername:null
      };
      const { contents } = yield call(getCourses,{ payload:{ ..._payload } });
      yield put({type:'setCourse', payload:{ course:contents}});
    },
  },
  reducers : {
    init(state){
      return init;
    },
    setCourse(state,{ payload:{ course } }){
      return { ...state, course }
    },
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname,query}) => {
        if(pathname === '/indexPage'){
          dispatch({type: 'init'});
          dispatch({type: 'getCourses'})
        }
      });
    }
  }
}
