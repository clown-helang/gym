import React from 'react'
import { connect } from 'dva';
import panel from '../../assets/panel.jpg'
import styles from './index.less'
import Course from '../../components/Course'
import barBg from '../../assets/barBg.png'
import { routerRedux } from 'dva/router'
import { getSession, setSession } from '../../utils';

function IndexPage({dispatch,indexPage}) {
  const {course} = indexPage;
  const redirect = (path) => {
    dispatch(routerRedux.push({ pathname: path }));
  }
  const name = getSession('name')
  const headImgUrl = getSession('headimgurl')
  return (
    <div>
      <div className={styles.panel}>
        <img src={panel}/>
      </div>
      <div className={styles.belt} style={{backgroundImage: `url(${barBg})`}}>
        <div className={styles.beltRight}>
          <div className={styles.photo}>
            <img src={headImgUrl}/>
          </div>
          <div className={styles.name}>
            <span>{name}</span>
          </div>
        </div>
      </div>

      <div className={styles.menuBar}>
        <div className={styles.menuBarLeft}/>
        <div className={styles.menuBarCenter}>
          <div className={styles.groupClassList} onClick={()=>{redirect('/groupClassAppoint')}}>
            <i className={`iconfont ${styles.icon}`}>&#xe692;</i>
            <a>团课预约</a>
          </div>
          <div className={styles.personalClassList} onClick={()=>{redirect('/coachList')}}>
            <i className={`iconfont ${styles.icon}`}>&#xe68c;</i>
            <a>私教预约</a>
          </div>
        </div>
        <div className={styles.menuBarRight}/>
      </div>

      <div className={styles.courses}>
        <div className={styles.title}>课程推荐</div>
        {
          course.map((item,index) => <Course key={index} course={item} dispatch={dispatch}/>)
        }
      </div>
    </div>
  )
}
function mapStateToProps({ indexPage }) {
  return { indexPage };
}
export default connect(mapStateToProps)(IndexPage);
