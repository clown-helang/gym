//import { getZones, delZones } from '../../services/';

const init = {
  sort_direction: 'DESC',
  page_number: 1,
  page_size: 10,

  search_value: '',
  classRecord: {
    total:2,
    contents:[{
      id: 1,
      courseName:'精品瑜伽课',
      appointmentMember: '安琪',
      courseType: 'groupClass',
      classTime: '2017-08-09 12:00:00 - 2017-08-09 14:00:00',
    },{
      id: 2,
      courseName:'腹肌塑型课',
      appointmentMember: '安琪',
      courseType: 'personalClass',
      classTime: '2017-08-10 12:00:00 - 2017-08-10 14:00:00',
    }]
  },
  salesRecord:{
    total:2,
    contents:[{
      id: 1,
      account: 'anq@qq.com',
      rechargeAmount:'5000',
      adminName:'admin',
      rechargeTime: '2017-08-09 12:00:00',
    },{
      id: 2,
      account: 'anq@qq.com',
      rechargeAmount:'3000',
      adminName:'admin',
      rechargeTime: '2017-06-09 12:00:00',
    }]
  },
};

export default {
  namespace: 'coachKPIDetail',
  state : {},
  effects : {
    // *getZones({ payload }, { put, call, select }) {
    //   const token = yield select(state => state.home.token);
    //   let { search_value, sort_direction, page_number, page_size } = yield select(state => state.zoneConfiguration);
    //   if (payload !== undefined) {
    //     sort_direction = payload.sort_direction === undefined ? sort_direction : payload.sort_direction;
    //     const payload_search_value = payload.search_value;
    //     if(payload_search_value===undefined){
    //       page_number = payload.page_number || page_number;
    //     }else{
    //       page_number = 1;
    //       search_value = payload_search_value;
    //     }
    //     page_size = payload.page_size || page_size;
    //   }
    //   sort_direction = (sort_direction === 'descend' || sort_direction === 'DESC') ? 'DESC' : 'ASC';
    //   let _payload = {
    //     token,
    //     sort_direction,
    //     page_number,
    //     page_size,
    //   };
    //   if (!(!search_value)) {
    //     if (search_value.indexOf('%') > -1 || search_value.indexOf('#') > -1) {
    //       _payload.search_value = encodeURIComponent(search_value);
    //     }else {
    //       _payload.search_value = search_value
    //     }
    //   }
    //   const { total, contents } = yield call(getZones,{ payload:{ ..._payload } });
    //   yield put({type:'setData',payload:{ data:{ total, contents }, sort_direction, page_number, page_size }});
    // },
    // *delZones({ payload }, { put, call, select }) {
    //   const token = yield select(state => state.home.token);
    //   let { selectedRows, data, page_number } = yield select(state => state.zoneConfiguration);
    //   if(data.contents.length===selectedRows.length){
    //     page_number --
    //   }
    //   yield call(delZones, { payload: { token, selectedRows } });
    //   yield put({type:'setSelectedRows',payload:{ selectedRows:[] }});
    //   yield put({type:'getZones',payload:{ page_number }});
    // },
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
        if (pathname === '/statisticalManage/coachKPIQuery/detail') {
          dispatch({type:'init'});
          //dispatch({type:'getZones'});
        }
      });
    }
  }
}
