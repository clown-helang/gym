import React from 'react'
import { connect } from 'dva';
import { getSession, isTrue } from '../../utils'
import styles from './index.less'
import Course from '../../components/Course'
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'

function CourseList({dispatch,courseList}) {
  const {courses} = courseList;

  const menu = {
    icon: 'courseList',
    title: isTrue(getSession('usertype').toString())&&getSession('usertype').toString() === '2'? '我的课程' : '课程列表'
  };

  return (
    <div>
      <Header />
      <MenuBar menu={menu}/>
      <div className={styles.courses}>
        {
          courses.map((item,index) => <Course key={index} course={item} dispatch={dispatch}/>)
        }
      </div>
    </div>
  )
}
function mapStateToProps({ courseList }) {
  return { courseList };
}
export default connect(mapStateToProps)(CourseList);
