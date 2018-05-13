import { getConsumeRecord, getMembersById, getClassRecord, setClassOver,cancelAppointClass,
  teacherComment,studentComment, cancelAppointGroupClass, addRestTime, addAskForLeave,
  getTeacherDisableTime, teacherOverGroupClass, groupClassTeacherComment, getGroupClassSchedule } from '../../services/gymServices'
import { getSession } from '../../utils';
import { Modal } from 'antd';
import moment from 'moment-timezone';

function success() {
  const modal = Modal.success({
    title: '温馨提示',
    content: '休息时间设置成功',
  });
  setTimeout(() => modal.destroy(), 1000);
}
function warning() {
  const modal = Modal.warning({
    title: '温馨提示',
    content: '休息时间设置失败',
  });
  setTimeout(() => modal.destroy(), 1000);
}

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
  commentVisible:false,
  classlogid: null,
  comment: '',
  teacherDisableTime:[],
  date: moment().format('YYYY-MM-DD'),
  teacherComment:'',
}

export default {
  namespace : 'personalCenter',
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
      let { page_number } = yield select(state => state.personalCenter);
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
        pageSize: payload&&payload.pageSize ? payload.pageSize : 10*page_number,
      };
      const { contents } = yield call(getClassRecord,{ payload:{ ..._payload } });
      yield put({type:'setClassRecord',payload:{ classRecord: contents }});
    },
    *getTeacherClassRecord({ payload }, { put, call, select }) {
      let _payload = {
        //0预约，1结课，2撤销预约
        isover: payload&&payload.isover ? payload.isover : null,
        starttime: payload&&payload.starttime ? payload.starttime : null,
        endtime: payload&&payload.endtime ? payload.endtime : null,
        classtime:-1,
        classtecherid: payload&&payload.classtecherid ? payload.classtecherid : null,
        classstudentid:null,
        classname:null,
        classstudent:null,
        classtecher:null,
        classdefineid: payload&&payload.classdefineid ? payload.classdefineid : -1,
        shoplogid:-1,
        pageNo: 1,
        pageSize: 1000,
      };
      //返回值中type：1团课，2私教，3休息，4请假
      const { contents } = yield call(getClassRecord,{ payload:{ ..._payload } });
      yield put({type:'setClassRecord',payload:{ classRecord: contents }});
    },
    *setClassOver({ payload:{classlogid} }, { put, call, select }){
      yield call(setClassOver,{ payload:{ classlogid } });
      yield put({type:'getClassRecord'});
    },
    *cancelAppointClass({ payload:{classlogid} }, { put, call, select }){
      yield call(cancelAppointClass,{ payload:{ classlogid } });
      yield put({type:'getClassRecord'});
    },
    *classComment({ payload }, { put, call, select }){
      let { comment,classlogid, usertype } = yield select(state => state.personalCenter);
      if(usertype === '3'){
        yield call(studentComment,{ payload:{ id:classlogid,studentsay:comment } });
      }
      yield put({type:'init'});
      yield put({type:'getClassRecord'});
    },
    *cancelAppointGroupClass({ payload:{classtimetableid, classlogid} }, { put, call, select }){
      yield call(cancelAppointGroupClass,{ payload:{ classtimetableid, classlogid } });
      yield put({type:'getClassRecord'});
    },
    *addRestTime({ payload:{postData} }, { put, call, select }){
      const result = yield call(addRestTime,{ payload:{ techerid:getSession('id'), techername:getSession('realname'), ...postData } });
      if(result.state==='success'){
        success()
        yield put({type:'getTeacherClassRecord',payload:{
          starttime:postData.todaystart,
          endtime: moment(postData.todaystart).format('YYYY-MM-DD')+" 23:59:59",
          classtecherid:getSession('id'),
        }});
      } else{
        warning()
      }
    },
    *addAskForLeave({ payload:{postData} }, { put, call, select }){
      const result = yield call(addAskForLeave,{ payload:{ techerid:getSession('id'), techername:getSession('realname'), ...postData } });
      if(result.state==='success'){
        success()
        const { contents } = yield put({type:'getTeacherClassRecord',payload:{
          starttime:postData.todaystart,
          endtime: moment(postData.todaystart).format('YYYY-MM-DD')+" 23:59:59",
          classtecherid:getSession('id'),
        }});
        yield put({type:'setClassRecord',payload:{ classRecord:contents }});
      } else{
        warning()
      }
    },
    *getTeacherDisableTime({ payload:{todaystart, techerid} }, { put, call, select }){
      const teacherDisableTime = yield call(getTeacherDisableTime,{ payload:{ todaystart, techerid } });
      yield put({type:'setTeacherDisableTime',payload:{ teacherDisableTime }});
    },
    *teacherOverGroupClass({ payload:{classtimetableid} }, { put, call, select }){
      let { date } = yield select(state => state.personalCenter);
      yield call(teacherOverGroupClass,{ payload:{ classtimetableid } });
      yield put({type:'getTeacherClassRecord',payload:{
        classtecherid: getSession('id'),
        starttime:date+" 00:00:00",
        endtime:date+" 23:59:59", }});
    },
    *groupClassTeacherComment({ payload:{id, techersay} }, { put, call, select }){
      let { date } = yield select(state => state.personalCenter);
      yield call(groupClassTeacherComment,{ payload:{ id, techersay } });
      yield put({type:'getTeacherClassRecord',payload:{
        classtecherid: getSession('id'),
        starttime:date+" 00:00:00",
        endtime:date+" 23:59:59", }});
      yield put({type:'getGroupClassSchedule'})
    },
    *personalClassTeacherComment({ payload:{id, techersay} }, { put, call, select }){
      let { date } = yield select(state => state.personalCenter);
      yield call(teacherComment,{ payload:{ id,techersay } });
      yield put({type:'getTeacherClassRecord',payload:{
        classtecherid: getSession('id'),
        starttime:date+" 00:00:00",
        endtime:date+" 23:59:59", }});
      yield put({type:'getGroupClassSchedule'});
    },
    *getGroupClassSchedule({ payload },{put, call, select} ){
      let { date } = yield select(state => state.personalCenter);
      let _payload = {
        classname: null,
        classdefineid: -1,
        techerid: getSession('id'),
        studentid: null,
        techername: null,
        starttime: date+" 00:00:00",
        endtime: date+" 23:59:59",
        classtime: -1,
        isover: null,
        pageNo: 1,
        pageSize: 1000
      }
      const { contents } = yield call(getGroupClassSchedule,{ payload:{ ..._payload } });
      yield put({type:'setGroupClassSchedule',payload:{ groupClassSchedule:contents }});
    },
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
    setGroupClassSchedule(state, { payload:{ groupClassSchedule } }){
      return {...state, groupClassSchedule }
    },
    setCommentVisible(state, { payload:{ commentVisible,classlogid } }){
      return {...state, commentVisible,classlogid }
    },
    setComment(state, { payload:{ comment } }){
      return {...state, comment }
    },
    setTeacherDisableTime(state, { payload:{ teacherDisableTime }}){
      return {...state, teacherDisableTime }
    },
    setDate(state, { payload:{ date }}){
      return {...state, date }
    },
    setTeacherComment(state, { payload:{ teacherComment }}){
      console.log(2222,teacherComment)
      return {...state, teacherComment }
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
        if(pathname === '/reservationRecord'){
          dispatch({type:'init'})
          dispatch({type:'getTeacherClassRecord',payload:{
            classtecherid: getSession('id'),
            starttime:moment().format('YYYY-MM-DD')+" 00:00:00",
            endtime:moment().format('YYYY-MM-DD')+" 23:59:59",
          }})
          dispatch({type:'getGroupClassSchedule'})
        }
        if(pathname === '/setBreaks'){
          dispatch({type:'init'})
          dispatch({type:'getTeacherDisableTime',payload:{
            todaystart: moment().format('YYYY-MM-DD')+" 00:00:00",
            techerid: getSession('id'),
          }})
          dispatch({type:'getTeacherClassRecord',payload:{
            starttime: moment().format('YYYY-MM-DD')+" 00:00:00",
            endtime: moment().format('YYYY-MM-DD')+" 23:59:59",
            classtecherid:getSession('id'),
          }});
        }
      });
    }
  }
}
