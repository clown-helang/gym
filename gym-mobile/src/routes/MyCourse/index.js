import React from 'react'
import { connect } from 'dva';
import styles from './index.less'
import MyCourseList from '../../components/MyCourseList'
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
          myCourse.map((item,index) => <MyCourseList type="myCourse" key={index} shopLog={item} dispatch={dispatch}/>)
        }
        {
          myCourse.length === 0
          ? <div style={{textAlign:'center',marginTop:'40%',color:'#aaa',fontSize:'1.2em'}}>
              <p>您还没有课程，快去购买吧</p>
            </div>
          : ''
        }
      </div>
    </div>
  )
}
function mapStateToProps({ user }) {
  return { user };
}
export default connect(mapStateToProps)(MyCourse);
