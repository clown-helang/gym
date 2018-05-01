import { getClassRecord } from '../../../services/gymServices';

const init = {
  sort_direction: 'DESC',
  page_number: 1,
  page_size: 10,
  search_value: '',

  data: {
    total:2,
    contents:[{
      id: 1,
      courseName:'精品瑜伽课',
      coachName:'安西教练',
      appointmentMember: '安琪',
      courseType: 'groupClass',
      classTime: '2017-08-09 12:00:00 - 2017-08-09 14:00:00',
    },{
      id: 2,
      courseName:'腹肌塑型课',
      coachName:'麦克海尔教练',
      appointmentMember: '安琪',
      courseType: 'personalClass',
      classTime: '2017-08-10 12:00:00 - 2017-08-10 14:00:00',
    }]
  },
  starttime:null,
  endtime:null,
  username:null,
  techername:null,
};

export default {
  namespace: 'classRecordQuery',
  state : {},
  effects : {
    *getClassRecord({ payload }, { put, call, select }) {
      console.log(1111)
      const token = yield select(state => state.home.token);
      let { username, techername, starttime, endtime, search_value, page_number, page_size } = yield select(state => state.classRecordQuery);
      if (payload !== undefined) {
        page_number = payload.page_number === undefined ? page_number : payload.page_number;
        page_size = payload.page_size === undefined ? page_size : payload.page_size;
        const payload_search_value = payload.search_value;
        if(payload_search_value===undefined){
          page_number = payload.page_number || page_number;
        }else{
          page_number = 1;
          search_value = payload_search_value;
        }
        page_size = payload.page_size || page_size;
      }
      let _payload = {
        token,
        isover:null,
        starttime,
        endtime,
        classtime:-1,
        techerid:null,
        userid:null,
        classname:null,
        username,
        techername,
        pageNo:page_number,
        pageSize:page_size,
      };
      const { total, contents } = yield call(getClassRecord,{ payload:{ ..._payload } });
      yield put({type:'setData',payload:{ data:{ total, contents }, page_number, page_size }});
    },
  },
  reducers : {
    init(state,{ payload }){
      return init;
    },
    setOwnCourse(state,{ payload:{ownCourse, sort_direction, page_number, page_size} }){
      return {...state, ownCourse, sort_direction, page_number, page_size};
    },
    setSearchValue(state,{ payload:{search_value} }){
      return {...state, search_value};
    },
  },
  subscriptions : {
    setup({dispatch, history}){
      return history.listen(({pathname, query}) => {
        if (pathname === '/statisticalManage/classRecordQuery') {
          dispatch({type:'init'});
          //dispatch({type:'getZones'});
        }
      });
    }
  }
}
