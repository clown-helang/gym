import React from 'react'
import { connect } from 'dva';
import styles from './index.less'
import Course from '../../components/Course'
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'

function MyCourse({dispatch,user}) {
  const menu = {
    icon:'myCourse',
    title:'我的课表'
  };
  const { myCourse } = user;
  return (
    <div>
      <Header dispatch={dispatch} />
      <MenuBar menu={menu}/>
      <div className={styles.courses}>
        {
          myCourse.map((item,index) => <Course type="myCourse" key={index} course={item} dispatch={dispatch}/>)
        }
      </div>
    </div>
  )
}
function mapStateToProps({ user }) {
  return { user };
}
export default connect(mapStateToProps)(MyCourse);
