import React from 'react';
import { routerRedux } from 'dva/router';
import { Icon } from 'antd'
import styles from './index.less'
import logo from '../../../assets/logo.png'


function Footer({dispatch, home}) {

  const onClick = (url) =>{
    dispatch(routerRedux.push({pathname:`/${url}`}))
  };

  return (
    <div className={styles.footer}>
      <a className={styles.icon} onClick={()=>{onClick('courseList')}}><Icon type="appstore" /></a>
      <a className={styles.icon} onClick={()=>{onClick('coachList')}}><Icon type="team" /></a>
      <a className={styles.icon} onClick={()=>{onClick('shoppingCart')}}><Icon type="shopping-cart"/></a>
      <a className={styles.icon} onClick={()=>{onClick('personalCenter')}}><Icon type="user"/></a>
      <a className={styles.home} onClick={()=>{onClick('index')}}><img src={logo}/></a>
    </div>
  )
}

export default Footer;
