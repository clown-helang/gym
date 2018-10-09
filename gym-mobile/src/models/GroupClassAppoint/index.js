import { getCourses, getCourseById } from '../../services/gymServices'
import { getSession } from '../../utils'

const init = {
  courses: [
    {
      "id": 2,
      "data": "2018-10-10 00:00:00",
      "schedule": [
        {
          "id": 5,
          "classname": "瑜伽",
          "classdefineid": 11,
          "techerid": "or9F0xJOaFFQafYX2t0ca33RMg4o",
          "techeridname": "å®‰ç\u0090ªÃ\u0081",
          "mixpeopelsize": 20,
          "takepeopelsize": 5,
          "starttime": "2018-10-10 20:00:00",
          "endtime": "2018-10-10 22:00:00",
          "isover": "0",
          "techersay": null,
          teacherName: '安琪'
        },
        {
          "id": 6,
          "classname": "瑜伽",
          "classdefineid": 11,
          "techerid": "or9F0xJOaFFQafYX2t0ca33RMg4o",
          "techeridname": "å®‰ç\u0090ªÃ\u0081",
          "mixpeopelsize": 20,
          "takepeopelsize": 10,
          "starttime": "2018-10-12 20:00:00",
          "endtime": "2018-10-12 22:00:00",
          "isover": "0",
          "techersay": null,
          teacherName: '安琪'
        }
      ]
    },
    {
      "id": 3,
      "data": "2018-10-11 00:00:00",
      "schedule": []
    },
    {
      "id": 4,
      "data": "2018-10-12 00:00:00",
      "schedule": [
        {
          "id": 6,
          "classname": "瑜伽",
          "classdefineid": 11,
          "techerid": "or9F0xJOaFFQafYX2t0ca33RMg4o",
          "techeridname": "å®‰ç\u0090ªÃ\u0081",
          "mixpeopelsize": 20,
          "takepeopelsize": 10,
          "starttime": "2018-10-12 20:00:00",
          "endtime": "2018-10-12 22:00:00",
          "isover": "0",
          "techersay": null,
          teacherName: '安琪'
        }
      ]
    },
  ],

};

export default {
  namespace : 'groupClassAppoint',
  state : {},
  effects : {
    *getCourses({ payload }, { put, call, select }) {
      let _payload = {
        id:-1,
        iscommend: null,
        classname: null,
        pageNo:1,
        pageSize:1000,
        isshop: '1',
        techerid:null,
        techername:null
      };
      if(getSession('usertype').toString()==="2"){
        _payload.techerid = getSession('id');
        _payload.techername = getSession('realname');
      }
      const { contents } = yield call(getCourses,{ payload:{ ..._payload } });
      yield put({type:'setCourseList', payload:{ courses:contents}});
    },
    *getCourseById({ payload:{ id } }, { put, call, select }){
      const course = yield call(getCourseById,{ payload:{ id } });
      course.classimg = JSON.parse(course.classimg);
      course.introduce = JSON.parse(course.introduce);
      yield put({type:'setCourse', payload:{ course }});
    }
  },
  reducers : {
    init(state){
      return init;
    },
    setCourseList(state,{ payload:{ courses } }){
      return { ...state, courses }
    },
    setCoachList(state,{ payload:{coaches} }){
      return {...state, coaches }
    },
    setCourse(state,{ payload:{course}} ){
      return {...state, course }
    }
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname,query}) => {
        if(pathname === '/groupClassAppoint'){
          dispatch({type: 'init'});
          //dispatch({type: 'getCourses'})
        }
      });
    }
  }
}
