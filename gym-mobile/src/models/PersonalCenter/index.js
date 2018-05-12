import { getConsumeRecord, getMembersById, getClassRecord, setClassOver,cancelAppointClass,teacherComment,studentComment } from '../../services/gymServices'
import { getSession } from '../../utils';

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
  comment: ''
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
        pageSize: 2*page_number,
      };

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
      } else{
        yield call(teacherComment,{ payload:{ id:classlogid,studentsay:comment } });
      }
      yield put({type:'init'});
      yield put({type:'getClassRecord'});
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
    setGroupClassSchedule(state, { payload:{ groupClassSchedule } }){
      return {...state, groupClassSchedule }
    },
    setCommentVisible(state, { payload:{ commentVisible,classlogid } }){
      return {...state, commentVisible,classlogid }
    },
    setComment(state, { payload:{ comment } }){
      console.log(comment)
      return {...state, comment }
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
      });
    }
  }
}
