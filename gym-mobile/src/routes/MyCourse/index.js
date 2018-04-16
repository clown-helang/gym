import React from 'react'
import { connect } from 'dva';
import styles from './index.less'
import Course from '../../components/Course'
import fuji from '../../assets/fuji2.jpg'
import yujia from '../../assets/yujia.jpg'
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'

function MyCourse({dispatch,user}) {
  const course = [
    {
      url: yujia,
      name: '極 ● 团体瑜伽课30节 ',
      oldPrice: 2000,
      vipPrice: 1888,
      status:'有效',
      operation: '预 约'
    },
    {
    url: fuji,
    name: '極 ● 腹肌撕裂者初级 ',
    oldPrice: 2000,
    vipPrice: 1888,
    status:'已学完',
    operation: '再次购买'
  }
  ];
  const menu = {
    icon:'shopping-cart',
    title:'我的课表'
  };
  return (
    <div>
      <Header dispatch={dispatch} user={user}/>
      <MenuBar menu={menu}/>
      <div className={styles.courses}>
        {
          course.map((item,index) => <Course type="myCourse" key={index} course={item} dispatch={dispatch}/>)
        }
      </div>
    </div>
  )
}
function mapStateToProps({ user }) {
  return { user };
}
export default connect(mapStateToProps)(MyCourse);
