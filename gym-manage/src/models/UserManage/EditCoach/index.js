//import { getFilmContentById, editFilmContentById } from '../../../../services/FilmDistributionManage';
import { routerRedux } from 'dva/router';
const messages = window.appLocale.messages;

const init = {
  descriptionList:[
    {
      url:'',
      description:'最佳教练'
    }
  ],
  id: 1,
  account: 'boboweiqi@qq.com',
  name: '波波维奇',
  phone: '15991234567',
  rule: 'coach',
  photo: '',
  data:{
    total: 1,
    contents:[{
      id: 1,
      courseName: '精品瑜伽课',
      courseType: 'groupClass',
      classTime: '2018-05-01 ~ 2018-07-01'
    }]
  },
  courseList:{
    total: 2,
    contents:[{
      id: 1,
      courseName: '精品瑜伽课',
      courseType: 'groupClass',
      classTime: '2018-05-01 ~ 2018-07-01'
    },{
      id: 2,
      courseName: '腹肌塑型课',
      courseType: 'personalClass',
      classTime: '2018-06-01 ~ 2018-07-01'
    }]
  },

  visible: false,
  selectedRows:[],
};

export default {
  namespace: 'editCoach',
  state : {},
  effects : {
    *getFilmContentById({ payload: { id } }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      const data = yield call(getFilmContentById, { payload: { token, id } });
      yield put({type:'setData',payload:{ data }});
    },
    *editFilmContentById({ payload: { postData } }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      let { id } = yield select(state => state.editFilmInformation);
      yield call(editFilmContentById, { payload: { token, id, postData } });
      yield put(routerRedux.push({pathname: '/pushManage/filmDistributionManage'}));
    },
  },
  reducers : {
    init(state,{ payload }){
      return init;
    },
    setData(state,{ payload:{data} }){
      return {...state, ...data};
    },
    setVisible(state,{ payload:{visible} }){
      return {...state, visible};
    },
    setSelectedRows(state,{ payload:{ selectedRows } }){
      return {...state, selectedRows};
    },
  },
  subscriptions : {
    setup({dispatch, history}){
      return history.listen(({pathname, query}) => {
        if (pathname === '/userManage/coachManage/edit') {
          dispatch({type:'init'});
        }
      });
    }
  }
}
