import { addNewCourse, getCoaches, getCourseById } from '../../../services/gymServices';
import { routerRedux } from 'dva/router'

const init = {
  classname:'',
  iscommend:'1',
  isshop:'',
  classmoney:'',
  classtecher:'',
  classsize:'',
  introduce:[{
    description:'',
    resource_url:'',
    original_name:''
  }],
  type:'1',

  selectedRows: [],
  data:{},

  coachList:{},
  visible:false
};

export default {
  namespace: 'addCourseManage',
  state : {},
  effects : {
    *getCoaches({ payload }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      let _payload = {
        token,
        techername:null,
        pageNo:1,
        pageSize:1000,
      };
      const { total, contents } = yield call(getCoaches,{ payload:{ ..._payload } });
      yield put({type:'setData',payload:{ data:{ total, contents }}});
    },
    *addNewCourse({ payload:{postData} }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      yield call(addNewCourse,{ payload:{ token,...postData } });
      yield put(routerRedux.push({pathname:'/courseManage'}));
    },
    *getCourseById({ payload:{id} }, { put, call, select }){
      const token = yield select(state => state.home.token);
      const editData = yield call(getCourseById,{ payload:{ token, id } });
      editData.classimg = JSON.parse(editData.classimg)
      editData.introduce = JSON.parse(editData.introduce)
      let _arr = editData.classtecher.split(',');
      let _contents = [];
      if(_arr.length > 0){
        _arr.map(item =>{
          _contents.push({
            id: item.split(':')[0],
            realname: item.split(':')[1]
          })
        })
      }
      editData.coachList = {
        total:_contents.length,
        contents:_contents
      }
      yield put({type:'setEditData',payload:{ editData }});
    }
  },
  reducers : {
    init(state,{ payload }){
      return init;
    },
    setData(state,{ payload:{data} }){
      return {...state, data};
    },
    setCoachList(state,{ payload:{coachList} }){
      return {...state, coachList};
    },
    setSearchValue(state,{ payload:{search_value} }){
      return {...state, search_value};
    },
    setSelectedRows(state,{ payload:{selectedRows} }){
      return {...state, selectedRows};
    },
    setVisible(state,{ payload:{ visible } }){
      return {...state, visible}
    },
    setEditData(state,{ payload:{ editData }}){
      return {...state, ...editData}
    },
  },
  subscriptions : {
    setup({dispatch, history}){
      return history.listen(({pathname,query}) => {
        if (pathname === '/courseManage/add') {
          dispatch({type:'init'});
        } else if(pathname === '/courseManage/edit') {
          dispatch({type:'init'});
          if(query.id){
            dispatch({type:'getCourseById',payload:{id: query.id}});
          }
        }
      });
    }
  }
}
