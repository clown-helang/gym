import { gitAllGroupClass, addGroupClass, editGroupClass, getGroupClassById, getCourseById } from '../../../services/gymServices';
import { routerRedux } from 'dva/router'

const init = {
  courseList:[],
  classname: '',
  coachList:[],
  selectTeacher: '',
  visible:false,
  date:null,
  model:'add',
  scheduleDate:{},
};

export default {
  namespace: 'addClassSchedule',
  state : {},
  effects : {
    *gitAllGroupClass({ payload }, { put, call, select }){
      const token = yield select(state => state.home.token);
      const { contents } = yield call(gitAllGroupClass,{ payload:{ token } });
      yield put({type:'setData',payload:{ courseList:contents}});
    },
    *addGroupClass({payload:{postData}}, { put, call, select }){
      const token = yield select(state => state.home.token);
      const { scheduleDate } = yield select(state => state.addClassSchedule);
      yield call(addGroupClass,{ payload:{ token,...postData } });
      yield put(routerRedux.push({pathname:'/classSchedule',query:{...scheduleDate}}));
    },
    *editGroupClass({payload:{postData}}, { put, call, select }){
      const token = yield select(state => state.home.token);
      const { id,scheduleDate } = yield select(state => state.addClassSchedule);
      yield call(editGroupClass,{ payload:{ token,id,...postData } });
      yield put(routerRedux.push({pathname:'/classSchedule',query:{...scheduleDate}}));
    },
    *getGroupClassById({payload:{id}}, { put, call, select }){
      const token = yield select(state => state.home.token);
      const editData = yield call(getGroupClassById,{ payload:{ token, id } });
      const { classtecher } = yield call(getCourseById,{ payload:{ token, id:editData.classdefineid } });
      editData.coachList = classtecher.split(',');
      editData.selectTeacher = editData.techerid+':'+editData.techername
      console.log(editData.starttime.split(' ')[0])
      yield put({type:'setEditData',payload:{ editData }});
      yield put({type:'setDate',payload:{ date:editData.starttime.split(' ')[0] }});
    }
  },
  reducers : {
    init(state,{ payload }){
      return init;
    },
    setData(state,{ payload:{courseList} }){
      return {...state, courseList};
    },
    setCoachList(state,{ payload:{coachList} }){
      return {...state, coachList};
    },
    setEditData(state,{ payload:{editData} }){
      return {...state, ...editData};
    },
    setModel(state,{ payload:{ model } }){
      return {...state, model};
    },
    setDate(state,{ payload:{ date } }){
      return {...state, date};
    },
    setScheduleDate(state,{ payload:{ scheduleDate } }){
      return {...state, scheduleDate};
    },
  },
  subscriptions : {
    setup({dispatch, history}){
      return history.listen(({pathname,query}) => {
        if (pathname === '/classSchedule/add') {
          dispatch({type:'init'});
          dispatch({type:'setDate',payload:{ date:query.date }});
          dispatch({type:'setScheduleDate',payload:{ scheduleDate:{starttime:query.starttime,endtime:query.endtime} }});
          dispatch({type:'gitAllGroupClass'});
        } else if(pathname === '/classSchedule/edit') {
          dispatch({type:'init'});
          dispatch({type:'setModel',payload:{model:'edit'}});
          dispatch({type:'setScheduleDate',payload:{ scheduleDate:{starttime:query.starttime,endtime:query.endtime} }});
          dispatch({type:'gitAllGroupClass'});
          dispatch({type:'getGroupClassById',payload:{id: query.id}});
        }
      });
    }
  }
}
