import React from 'react';
import { routerRedux } from 'dva/router';
import { Icon } from 'antd'
import styles from './index.less'
import logo from '../../../assets/logo.png'


function Footer({dispatch}) {

  const onClick = (url) =>{
    dispatch(routerRedux.push({pathname:`/${url}`}))
  };

  return (
    <div className={styles.footer}>
      <i className={`iconfont ${styles.icon}`} onClick={()=>{onClick('courseList')}}>&#xe692;</i>
      <i className={`iconfont ${styles.icon}`} onClick={()=>{onClick('coachList')}}>&#xe68c;</i>
      <i className={`iconfont ${styles.icon}`} onClick={()=>{onClick('myCourse')}}>&#xe62b;</i>
      <i className={`iconfont ${styles.icon}`} onClick={()=>{onClick('personalCenter')}}>&#xe663;</i>
      <a className={styles.home} onClick={()=>{onClick('index')}}><img src={logo}/></a>
    </div>
  )
}

export default Footer;
