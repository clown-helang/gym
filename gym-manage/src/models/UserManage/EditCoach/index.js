//import { getFilmContentById, editFilmContentById } from '../../../../services/FilmDistributionManage';
import { routerRedux } from 'dva/router';
const messages = window.appLocale.messages;

const init = {
  /*
  * 初始化影片信息
  */
  duration: 120,
  translation_language_list: ["中文","英文","法文"],
  multi_language_Item_list: [
    {
      id: 0,
      name: "唐人街探案2",
      director: "陈思诚",
      actor: "王宝强 刘昊然",
      description: "惊悚、悬疑、喜剧",
      type: "喜剧",
      place: "中国",
      language_code: "chi"
    }
  ],

  descriptionList:[
    {
      url:'',
      description:'最佳教练'
    }
  ],

  modal: 'edit'
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
    setModal(state,{ payload:{modal} }){
      return {...state, modal};
    },
  },
  subscriptions : {
    setup({dispatch, history}){
      return history.listen(({pathname, query}) => {
        if (pathname === '/pushManage/filmDistributionManage/editFilmInformation') {
          dispatch({type:'init'});
          if(query.modal === 'detail'){
            dispatch({type:'setModal',payload:{modal: query.modal}});
            dispatch({type:'getFilmContentById',payload:{id: query.id}});
          }
        }
      });
    }
  }
}
