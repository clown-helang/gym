import React from 'react'
import { connect } from 'dva';
import styles from './index.less'
import Course from '../../components/Course'
import fuji from '../../assets/fuji2.jpg'
import yujia from '../../assets/yujia.jpg'
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'

function MyCourse({dispatch,user}) {
  const menu = {
    icon:'myCourse',
    title:'我的课表'
  };
  const { course } = user;
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
