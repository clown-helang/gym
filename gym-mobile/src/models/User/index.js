import { getConsumeRecord, getMembersById, getClassRecord, getCourseById,appointClass, getGroupClassSchedule } from '../../services/gymServices'
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
        pageSize: 2*page_number,
      };

      const { contents } = yield call(getClassRecord,{ payload:{ ..._payload } });
      yield put({type:'setClassRecord',payload:{ classRecord: contents }});
    },
    *getCourseById({ payload:{id,techerid} }, { put, call, select }){
      const course = yield call(getCourseById,{ payload:{ id } });
      course.classimg = JSON.parse(course.classimg)
      course.introduce = JSON.parse(course.introduce)
      yield put({type:'setCourseBooking',payload:{ course }});
      console.log('course--',course)
      if(parseInt(course.type)===1){
        let _payload = {
          classname: course.classname,
          classdefineid: course.id,
          techerid,
          techername: null,
          starttime: moment().format('YYYY-MM-DD HH:mm:ss').toString(),
          endtime: moment().add(3,'d').format('YYYY-MM-DD').toString()+' 23:00:00',
          classtime: null,
          isover: null,
          pageNo: 1,
          pageSize: 1000
        }
        console.log(_payload)
        const result = yield call(getGroupClassSchedule,{payload:{ ..._payload }});
        //console.log('result---',result)
        //yield put({type:'setGroupClassSchedule',payload:{ course }});
      }
    },
    *appointClass({ payload:{classshoplogid, classtime, starttime, endtime}}, { put, call, select }){
      yield call(appointClass,{ payload:{ classshoplogid, classtime, starttime, endtime } });
      yield put(routerRedux.push({pathname:'/classRecord'}));
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
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname,query}) => {
        if(pathname === '/myCourse' ){
          dispatch({type:'init'})
          dispatch({type:'getConsumeRecord'})
        }
        if(pathname === '/personalCenter' ){
          dispatch({type:'init'})
          dispatch({type:'getMembersById'})
        }
        if(pathname === '/classRecord'){
          dispatch({type:'init'})
          dispatch({type:'getClassRecord'})
        }
        if(pathname === '/courseBooking'){
          dispatch({type:'init'})
          if(query.classid){
            dispatch({type:'getCourseById',payload:{ id:query.classid,techerid:query.techerid }})
          }
          if(query.id){
            dispatch({type:'setClassShopLogId',payload:{ classshoplogid:query.id }})
          }
        }
      });
    }
  }
}
