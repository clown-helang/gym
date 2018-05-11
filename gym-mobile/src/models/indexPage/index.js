import { getCourses } from '../../services/gymServices'
import fuji from '../../assets/fuji2.jpg'
import yujia from '../../assets/yujia.jpg'


const init = {
  course: [
    {
      classimg: yujia,
      classname: '团体瑜伽课30节 ',
      classmoney: 2000,
      type: "2"
    },
    {
      classimg: fuji,
      classname: '腹肌撕裂者初级 ',
      classmoney: 2000,
      type: "1"
    }
  ]
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
        isshop: '1'
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
