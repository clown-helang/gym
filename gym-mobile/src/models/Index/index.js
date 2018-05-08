import { getBytes, getSession } from '../../utils';
import { Modal } from 'antd';
const confirm = Modal.confirm;


export default {
  namespace : 'indexPage',
  state : {},
  effects : {},
  reducers : {
    init(state,{ payload:{ user, token, path } }){
      return {...state, user, token, path };
    },
    setUser(state,{ user }){
      return {...state,user }
    },
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname,query}) => {
        if(pathname.indexOf('/index')>-1){
          //console.log(pathname);
          //alert('index页'+JSON.stringify(query))
        }
      });
    }
  }
}
