import { getAllClassScheduleByTime, getCoaches, appointGroupClass } from '../../services/gymServices';
import moment from 'moment-timezone';

const init = {
  courses: [],
  current: moment(),
};

export default {
  namespace : 'groupClassAppoint',
  state : {},
  effects : {
    //缺少classshoplogid无法约课

    *getAllClassScheduleByTime({ payload }, { put, call, select }){
      const { current } = yield select(state => state.groupClassAppoint);
      const { contents } = yield call(getAllClassScheduleByTime,{ payload:{
          starttime: moment(current).format("YYYY-MM-DD")+" 00:00:00",
          endtime: moment(current).add("2", "days").format("YYYY-MM-DD")+" 23:59:59"
      } });
      const coaches = yield call(getCoaches,{ payload:{techername: null, pageNo:1, pageSize: 1000}});
      contents.map(content=>{
        content.schedule.map(item=>{
          coaches.contents.map(i=>{
            if(item.techerid === i.id){
              item.teacherName = i.realname;
              item.topimg = i.topimg;
            }
          })
        });
      });
      yield put({type:'setCourseList',payload:{ courses:contents }});
    },
    *appointGroupClass({ payload:{ classtimetableid, classtime,starttime,endtime } }, { put, call, select }){
      // let { classshoplogid } = yield select(state => state.groupClassAppoint);
      // yield call(appointGroupClass,{ payload:{ classtimetableid, classtime, starttime,endtime, classshoplogid } });
      // yield put(routerRedux.push({pathname:'/classRecord'}));
    },
  },
  reducers : {
    init(state){
      return init;
    },
    setCourseList(state,{ payload:{ courses } }){
      return { ...state, courses }
    },
    setCurrent(state,{ payload:{ current } }){
      return { ...state, current }
    },
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname,query}) => {
        if(pathname === '/groupClassAppoint'){
          dispatch({type: 'init'});
          dispatch({type: 'getAllClassScheduleByTime'})
        }
      });
    }
  }
}
