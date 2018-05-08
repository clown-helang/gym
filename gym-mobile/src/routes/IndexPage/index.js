import React from 'react'
import { connect } from 'dva';
import panel from '../../assets/panel.jpg'
import TX from '../../assets/touxiang.jpg'
import styles from './index.less'
import {Icon} from 'antd'
import Course from '../../components/Course'
import barLogo from '../../assets/bar_logo.png'
import fuji from '../../assets/fuji2.jpg'
import yujia from '../../assets/yujia.jpg'
import barBg from '../../assets/barBg.png'
import { routerRedux } from 'dva/router'
import { getSession, setSession } from '../../utils';

function IndexPage({dispatch,indexPage}) {
  const course = [
    {
      url: yujia,
      name: '極 ● 团体瑜伽课30节 ',
      oldPrice: 2000,
      vipPrice: 1888
    },
    {
    url: fuji,
    name: '極 ● 腹肌撕裂者初级 ',
    oldPrice: 2000,
    vipPrice: 1888
  }
  ];
  const redirect = (path) => {
    dispatch(routerRedux.push({ pathname: path }));
  }
  const name = getSession('name')
  const headImgUrl = getSession('headimgurl')
  console.log(headImgUrl);
  return (
    <div>
      <div className={styles.panel}>
        <img src={panel}/>
      </div>
      <div className={styles.belt} style={{backgroundImage: `url(${barBg})`}}>
        {/*<div className={styles.beltLeft}>*/}
          {/*/!*<img src={barLogo}/>*!/*/}
        {/*</div>*/}
        <div className={styles.beltRight}>
          <div className={styles.name}>
            <span>{name}</span>
          </div>
          <div className={styles.photo}>
            <img src={headImgUrl}/>
          </div>
        </div>
      </div>

      <div className={styles.menuBar}>
        <div className={styles.menuBarLeft}/>
        <div className={styles.menuBarCenter}>
          <div className={styles.groupClassList} onClick={()=>{redirect('/courseList')}}>
            <i className={`iconfont ${styles.icon}`}>&#xe692;</i>
            <a>课程列表</a>
          </div>
          <div className={styles.personalClassList} onClick={()=>{redirect('/coachList')}}>
            <i className={`iconfont ${styles.icon}`}>&#xe68c;</i>
            <a>私教列表</a>
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
