import { routerRedux } from 'dva/router';
import { getBytes, getSession } from '../../utils';
import fuji from '../../assets/fuji2.jpg'
import yujia from '../../assets/yujia.jpg'
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
    ],
    course: [
      {
        id:1,
        url: yujia,
        name: '極 ● 团体瑜伽课30节 ',
        oldPrice: 2000,
        vipPrice: 1888,
        status:'有效',
        operation: '预 约',
        type: 'group'
      },
      {
        id:2,
        url: fuji,
        name: '極 ● 完美胸肌塑性 ',
        oldPrice: 2000,
        vipPrice: 1888,
        status:'有效',
        operation: '预 约',
        type: 'personal'
      },
      {
        id:3,
        url: fuji,
        name: '極 ● 腹肌撕裂者初级 ',
        oldPrice: 2000,
        vipPrice: 1888,
        status:'已学完',
        operation: '再次购买',
        type: 'personal'
      },
    ],
    bookingCourse:{}
  },
  effects : {},
  reducers : {
    init(state,{ payload:{ user, token, path } }){
      return {...state, user, token, path };
    },
    setUser(state,{ user }){
      return {...state,user }
    },
    setBookingCourse(state, { payload:{ id } }){
      let bookingCourse = {}
      state.course.map(item=>{
        if(parseInt(item.id) === parseInt(id)){
          bookingCourse = item
        }
      })
      return {...state, bookingCourse }
    }
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname,query}) => {
        if(pathname === '/courseBooking' ){
          if(query.id){
            dispatch({type:'setBookingCourse',payload:{ id: query.id}})
          }
        }
      });
    }
  }
}
