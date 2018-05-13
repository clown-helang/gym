import { getConsumeRecord, getMembersById, getClassRecord, getCourseById,appointClass,
  getGroupClassSchedule, appointGroupClass, getTeacherDisableTime } from '../../services/gymServices'
import { getSession } from '../../utils';
import { routerRedux } from 'dva/router';
import moment from 'moment-timezone';

const init = {
  city: "",
  country: "",
  headimgurl: getSession('headimgurl'),
  id: "",
  money: '0',
  nickName: getSession('name'),
  phone: "",
  province: "",
  realname: "",
  sex: "",
  status: "",
  usertype: getSession('usertype'),
  vipclass: "",

  page_number:1,
  classRecord:[],
  consumeRecord:[],

  myCourse: [],
  course:{},
  classshoplogid:null,
  groupClassSchedule:[],
  disableTime:[],
}

export default {
  namespace : 'user',
  state : {},
  effects : {
    *getConsumeRecord({ payload }, { put, call, select }) {
      let _payload = {
        techerid:null,
        studentid: getSession('id'),
        studentname:null,
        techername:null,
        starttime:null,
        endtime:null,
        classid:-1,
        classname:null,
        pageNo:1,
        pageSize:1000,
      };
      const { contents } = yield call(getConsumeRecord,{ payload:{ ..._payload } });
      yield put({type:'setMyCourse',payload:{ myCourse: contents }});
    },
    *getMembersById({ payload }, { put, call, select }){
      const user = yield call(getMembersById, { payload: { id:getSession('id') } });
      yield put({type:'setUser',payload:{ user }});
    },
    *getClassRecord({ payload }, { put, call, select }) {
      let { page_number } = yield select(state => state.user);
      let _payload = {
        //0预约，1结课，2撤销预约
        isover: payload&&payload.isover ? payload.isover : null,
        starttime: payload&&payload.starttime ? payload.starttime : null,
        endtime: payload&&payload.endtime ? payload.endtime : null,
        classtime:-1,
        classtecherid: payload&&payload.classtecherid ? payload.classtecherid : null,
        classstudentid:getSession('id'),
        classname:null,
        classstudent:null,
        classtecher:null,
        classdefineid: payload&&payload.classdefineid ? payload.classdefineid : -1,
        shoplogid:-1,
        pageNo: 1,
        pageSize: payload&&payload.pageSize ? payload.pageSize :10*page_number,
      };
      const { contents } = yield call(getClassRecord,{ payload:{ ..._payload } });
      yield put({type:'setClassRecord',payload:{ classRecord: contents }});
    },

    *getCourseById({ payload:{id,techerid} }, { put, call, select }){
      const course = yield call(getCourseById,{ payload:{ id } });
      course.classimg = JSON.parse(course.classimg)
      course.introduce = JSON.parse(course.introduce)
      yield put({type:'setCourseBooking',payload:{ course }});
      if(parseInt(course.type)===1){
        let _payload = {
          classname: course.classname,
          classdefineid: course.id,
          techerid,
          studentid:getSession('id'),
          techername: null,
          starttime: moment().format('YYYY-MM-DD HH:mm:ss').toString(),
          endtime: moment().add(6,'d').format('YYYY-MM-DD').toString()+' 23:59:59',
          classtime: -1,
          isover: null,
          pageNo: 1,
          pageSize: 1000
        }
        const { contents } = yield call(getGroupClassSchedule,{payload:{ ..._payload }});
        yield put({type:'setGroupClassSchedule',payload:{ groupClassSchedule:contents }});
      }
    },
    *appointClass({ payload:{classshoplogid, classtime, starttime, endtime}}, { put, call, select }){
      yield call(appointClass,{ payload:{ classshoplogid, classtime, starttime, endtime } });
      yield put(routerRedux.push({pathname:'/classRecord'}));
    },
    *appointGroupClass({ payload:{ classtimetableid, classtime,starttime,endtime } }, { put, call, select }){
      let { classshoplogid } = yield select(state => state.user);
      yield call(appointGroupClass,{ payload:{ classtimetableid, classtime, starttime,endtime, classshoplogid } });
      yield put(routerRedux.push({pathname:'/classRecord'}));
    },
    *getTeacherDisableTime({ payload:{todaystart, techerid} }, { put, call, select }){
      const disableTime = yield call(getTeacherDisableTime,{ payload:{ todaystart, techerid } });
      yield put({type:'setDisableTime',payload:{ disableTime }});
    }
  },
  reducers : {
    init(state){
      return init;
    },
    setUser(state,{ payload:{ user } }){
      return {...state, ...user }
    },
    setMyCourse(state, { payload:{ myCourse }}){
      return {...state, myCourse }
    },
    setPageNumber(state,{ payload:{ page_number }}){
      return {...state, page_number}
    },
    setClassRecord(state,{ payload:{ classRecord }}){
      return {...state, classRecord}
    },
    setConsumeRecord(state,{ payload:{ consumeRecord }}){
      return {...state, consumeRecord}
    },
    setCourseBooking(state, { payload:{ course } }){
      return {...state, course }
    },
    setClassShopLogId(state, { payload:{ classshoplogid } }){
      return {...state, classshoplogid }
    },
    setGroupClassSchedule(state, { payload:{ groupClassSchedule } }){
      return {...state, groupClassSchedule }
    },
    setDisableTime(state, { payload:{ disableTime } }){
      return {...state, disableTime }
    },
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname,query}) => {
        if(pathname === '/myCourse' ){
          dispatch({type:'init'})
          dispatch({type:'getConsumeRecord'})
        }
        if(pathname === '/courseBooking'){
          dispatch({type:'init'})
          dispatch({type:'getTeacherDisableTime',payload:{
            todaystart: moment().format('YYYY-MM-DD')+" 00:00:00",
            techerid: query.techerid,
          }})
          if(query.classid){
            dispatch({type:'getCourseById',payload:{ id:query.classid,techerid:query.techerid }})
            dispatch({type:'getClassRecord',payload:{
              starttime: moment().format('YYYY-MM-DD')+" 00:00:00",
              endtime: moment().format('YYYY-MM-DD')+" 23:59:59",
              classtecherid:query.techerid,
              classdefineid:query.classid,
              pageSize:1000
            }})
          }
          if(query.id){
            dispatch({type:'setClassShopLogId',payload:{ classshoplogid:query.id }})
          }
        }
      });
    }
  }
}
