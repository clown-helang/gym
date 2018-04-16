import { routerRedux } from 'dva/router';
import { getBytes, getSession } from '../../utils';
import TX from '../../assets/touxiang.jpg'
const appLocale = window.appLocale;

export default {
  namespace : 'user',
  state : {
    name:'彭于晏',
    photo: TX,
    account:'1230001',
    level:7,
    balance: 5000,
    classRecord:[{
      classTime: '2017.3.25 08:00 ~ 10:00',
      className: '团体瑜伽课',
      coachName: '于春雷',
      state: 'finish',
      comments: ''
    },
    {
      classTime: '2017.3.25 08:00 ~ 10:00',
      className: '团体瑜伽课',
      coachName: '于春雷',
      state: 'finish',
      comments: '上课迟到一小时上课迟到一小时上课迟到一小时上课迟到一小时'
    }],
    consumeRecord:[
      {
        consume_time:'2017.3.26 12:00',
        courseName:'团体瑜伽课',
        price:'1888'
      },
      {
        consume_time:'2018.3.26 12:00',
        courseName:'腹肌完美塑形',
        price:'1888'
      }
    ],
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
    ]
  },
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
      return history.listen(({pathname}) => {
        // const token = getSession("token");
        // const user = getSession("user");
        // if ( (!token) && pathname !== '/login') {
        //   dispatch(routerRedux.push("/login"));
        // } else{
        //   const path = pathname.split('/');
        //   dispatch({type:'init', payload:{user, token,path: path.filter(item => item !== '') }});
        // }
      });
    }
  }
}
