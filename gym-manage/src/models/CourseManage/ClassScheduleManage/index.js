import { getCourses, changeClassIsShop } from '../../../services/gymServices';

const init = {
  search_value: '',
  page_number: 1,
  page_size: 10,
  data: {
    total:10,
    contents:[
      {
        id: 1,
        data:'2018-5-11',
        schedule:[{
          classname: '精品团体瑜伽课',
          techername: '安琪',
          mixpeopelsize: 16,
          takepeopelsize: 5,
          starttime: '2018-5-11 13:00:00',
          endtime: '2018-5-11 15:00:00',
          classtime: 2
        },{
          classname: '精品团体瑜伽课',
          techername: '安琪',
          mixpeopelsize: 16,
          takepeopelsize: 5,
          starttime: '2018-5-11 13:00:00',
          endtime: '2018-5-11 15:00:00',
          classtime: 2
        },{
          classname: '精品团体瑜伽课',
          techername: '安琪',
          mixpeopelsize: 16,
          takepeopelsize: 5,
          starttime: '2018-5-11 13:00:00',
          endtime: '2018-5-11 15:00:00',
          classtime: 2
        },{
          classname: '精品团体瑜伽课',
          techername: '安琪',
          mixpeopelsize: 16,
          takepeopelsize: 5,
          starttime: '2018-5-11 13:00:00',
          endtime: '2018-5-11 15:00:00',
          classtime: 2
        },{
          classname: '精品团体瑜伽课',
          techername: '安琪',
          mixpeopelsize: 16,
          takepeopelsize: 5,
          starttime: '2018-5-11 13:00:00',
          endtime: '2018-5-11 15:00:00',
          classtime: 2
        },{
          classname: '精品团体瑜伽课',
          techername: '安琪',
          mixpeopelsize: 16,
          takepeopelsize: 5,
          starttime: '2018-5-11 13:00:00',
          endtime: '2018-5-11 15:00:00',
          classtime: 2
        },{
          classname: '精品团体瑜伽课',
          techername: '安琪',
          mixpeopelsize: 16,
          takepeopelsize: 5,
          starttime: '2018-5-11 13:00:00',
          endtime: '2018-5-11 15:00:00',
          classtime: 2
        }
        ]
      },
      {
        id: 2,
        data:'2018-5-12',
        schedule:[{
          classname: '精品团体瑜伽课',
          techername: '安琪',
          mixpeopelsize: 16,
          takepeopelsize: 0,
          starttime: '2018-5-11 10:00:00',
          endtime: '2018-5-11 12:00:00',
          classtime: 2
        }]
      }
    ]
  },

  starttime:null,
  endtime:null,
};

export default {
  namespace: 'classSchedule',
  state : {},
  effects : {
    *getCourses({ payload }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      let { search_value, page_number, page_size } = yield select(state => state.courseManage);
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
        id:-1,
        iscommend:null,
        classname:null,
        pageNo:page_number,
        pageSize:page_size,
        isshop: null
      };
      if (!(!search_value)) {
        if (search_value.indexOf('%') > -1 || search_value.indexOf('#') > -1) {
          _payload.classname = encodeURIComponent(search_value);
        }else {
          _payload.classname = search_value
        }
      }
      const { total, contents } = yield call(getCourses,{ payload:{ ..._payload } });
      yield put({type:'setData',payload:{ data:{ total, contents }, page_number, page_size }});
    },
    *changeClassIsShop({ payload:{id, isshop} }, { put, call, select }){
      const token = yield select(state => state.home.token);
      yield call(changeClassIsShop,{ payload:{ token, id, isshop } });
      yield put({type:'getCourses'});
    }
  },
  reducers : {
    init(state,{ payload }){
      return init;
    },
    setData(state,{ payload:{data, sort_direction, page_number, page_size} }){
      return {...state, data, sort_direction, page_number, page_size};
    },
    setSearchValue(state,{ payload:{search_value} }){
      return {...state, search_value};
    },
    setRangeTime(state,{ payload:{timeRange} }){
      return {...state, starttime:timeRange[0]?`${timeRange[0]} 00:00:00`:null , endtime:timeRange[1]? `${timeRange[1]} 23:59:59`: null};
    }
  },
  subscriptions : {
    setup({dispatch, history}){
      return history.listen(({pathname,query}) => {
        if(pathname === '/classSchedule'){
          dispatch({type:'init'});
        }
      });
    }
  }
}
