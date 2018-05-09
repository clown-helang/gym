import { getConsumeRecord, getMembersById, getClassRecord } from '../../services/gymServices'
import { getSession } from '../../utils';
import fuji from '../../assets/fuji2.jpg'
import yujia from '../../assets/yujia.jpg'
import TX from '../../assets/touxiang.jpg'

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
  reservationRecord:[
    {
      courseName:'腹肌完美塑形',
      reservation:[{
        start_time: '08:00',
        end_time:'10:00',
        name:'彭于晏'
      },{
        start_time: '08:00',
        end_time:'10:00',
        name:'彭于晏'
      }]
    },
    {
      courseName:'团体瑜伽课',
      reservation:[{
        start_time: '08:00',
        end_time:'10:00',
        name:'彭于晏'
      },{
        start_time: '08:00',
        end_time:'10:00',
        name:'彭于晏'
      }]
    }
  ],
  myCourse: [
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
  ],
  bookingCourse:{}
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
        isover:null,
        starttime:null,
        endtime:null,
        classtime:-1,
        classtecherid:null,
        classstudentid:getSession('id'),
        classname:null,
        classstudent:null,
        classtecher:null,
        classdefineid:-1,
        shoplogid:-1,
        pageNo: 1,
        pageSize: 2*page_number,
      };
      const { contents } = yield call(getClassRecord,{ payload:{ ..._payload } });
      yield put({type:'setClassRecord',payload:{ classRecord: contents }});
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
    setBookingCourse(state, { payload:{ id } }){
      let bookingCourse = {}
      state.course.map(item=>{
        if(parseInt(item.id) === parseInt(id)){
          bookingCourse = item
        }
      })
      return {...state, bookingCourse }
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
