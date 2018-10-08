import { getConsumeRecord, getCourseById, changeUserCourseCoach } from '../../../services/gymServices';

const init = {
  search_value: '',
  page_number: 1,
  page_size: 10,
  data: {},

  coaches:[],

  changeUserCourse: {},
  visible: false,
};

export default {
  namespace: 'userCourseManage',
  state : {},
  effects : {
    *getConsumeRecord({ payload }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      let { search_value, page_number, page_size } = yield select(state => state.userCourseManage);
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
        techerid:null,
        studentid:null,
        studentname:null,
        techername:null,
        starttime:null,
        endtime:null,
        classid:-1,
        classname:null,
        pageNo:page_number,
        pageSize:page_size,
      };
      if (!(!search_value)) {
        if (search_value.indexOf('%') > -1 || search_value.indexOf('#') > -1) {
          _payload.studentname = encodeURIComponent(search_value);
        }else {
          _payload.studentname = search_value
        }
      }
      const { total, contents } = yield call(getConsumeRecord,{ payload:{ ..._payload } });
      yield put({type:'setData',payload:{ data:{ total, contents }, page_number, page_size }});
    },
    *getCoaches({ payload:{ id } }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      const { classtecher } = yield call(getCourseById, { payload: { token, id } });
      let coaches = [];
      classtecher.split(',').map(item=>{
        coaches.push({
          id: item.split(':')[0],
          realname: item.split(':')[1],
        })
      });
      yield put({type:'setCoaches',payload:{ coaches}});
    },
    *changeUserCourseCoach({ payload:{ techerid } }, { put, call, select }){
      const token = yield select(state => state.home.token);
      let { coaches, changeUserCourse } = yield select(state => state.userCourseManage);
      changeUserCourse.techerid = techerid;
      coaches.map(item => {
        if(item.id === techerid){
          changeUserCourse.techername = item.realname;
        }
      })
      changeUserCourse.introduce = JSON.stringify(changeUserCourse.introduce);
      changeUserCourse.classimg = JSON.stringify(changeUserCourse.classimg);

      yield call(changeUserCourseCoach,{ payload:{ token, ...changeUserCourse } });
      yield put({type:'setVisible', payload:{ visible: false }});
      yield put({type:'getConsumeRecord'});
    },
  },
  reducers : {
    init(state,{ payload }){
      return init;
    },
    setData(state,{ payload:{data, page_number, page_size} }){
      return {...state, data, page_number, page_size};
    },
    setSearchValue(state,{ payload:{search_value} }){
      return {...state, search_value};
    },
    setVisible(state,{ payload:{ visible } }){
      return { ...state, visible };
    },
    setCoaches(state,{ payload:{ coaches } }){
      return { ...state, coaches };
    },
    setChangeUserCourse(state,{ payload:{ changeUserCourse }}){
      return { ...state, changeUserCourse };
    }
  },
  subscriptions : {
    setup({dispatch, history}){
      return history.listen(({pathname}) => {
        if (pathname === '/userCourseManage') {
          dispatch({type:'init'});
          dispatch({type:'getConsumeRecord'});
        }
      });
    }
  }
}
