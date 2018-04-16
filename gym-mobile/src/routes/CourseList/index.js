import React from 'react'
import { connect } from 'dva';
import TX from '../../assets/touxiang.jpg'
import styles from './index.less'
import Course from '../../components/Course'
import fuji from '../../assets/fuji2.jpg'
import yujia from '../../assets/yujia.jpg'
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'

function CourseList({dispatch,courseList}) {
  const course = [
    {
      url: yujia,
      name: '極 ● 团体瑜伽课30节 ',
      oldPrice: 2000,
      vipPrice: 1888,
    },
    {
    url: fuji,
    name: '極 ● 腹肌撕裂者初级 ',
    oldPrice: 2000,
    vipPrice: 1888,
  }
  ];
  const menu = {
    icon:'appstore',
    title:'课程列表'
  };
  const user = {
    name:'彭于晏',
    photo: TX
  };
  return (
    <div>
      <Header dispatch={dispatch} user={user}/>
      <MenuBar menu={menu}/>
      <div className={styles.courses}>
        {
          course.map((item,index) => <Course key={index} course={item} dispatch={dispatch}/>)
        }
      </div>
    </div>
  )
}
function mapStateToProps({ courseList }) {
  return { courseList };
}
export default connect(mapStateToProps)(CourseList);
