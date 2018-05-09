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

  const {course} = courseList;

  console.log(course);
  const menu = {
    icon: 'courseList',
    title:'课程列表'
  };

  return (
    <div>
      <Header />
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
