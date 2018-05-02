import React from 'react'
import { connect } from 'dva';
import styles from './index.less'
import { routerRedux } from 'dva/router'
import Header from '../../components/Header'

function PersonalCenter({dispatch,user}) {
  const redirect = (path) => {
    dispatch(routerRedux.push({ pathname: path }));
  }
  return (
    <div>
      <Header dispatch={dispatch} type = 'noUser'/>
      <div className={styles.personalInfor}>
        <div className={styles.left}>
          <img src={user.photo}/>
        </div>
        <div className={styles.center}>
          <p>{user.name} <span className={styles.coachTag}>教练</span></p>
          <p>账号：{user.account}</p>
        </div>
        <div className={styles.right}>
          <p>
            <i className='iconfont' style={{color:'#3ddfc7',fontSize:24,marginRight:5,position:'relative',top:5}}>&#xe60d;</i>
            <span>VIP {user.level}</span>
          </p>
        </div>
      </div>

      <div className={styles.strip} style={{marginBottom:20,marginTop:15}}>
        <i className={`iconfont ${styles.icon}`}>&#xe608;</i>
        <span>积分余额：<span style={{color:'#3ddfc7',fontSize:20,position:'relative',top:2}}>{user.balance}</span>元</span>
      </div>
      <div className={styles.strip} onClick={()=>{redirect('/reservationRecord')}}>
        <i className={`iconfont ${styles.icon}`}>&#xe656;</i>
        <span>预约记录</span>
      </div>
      <div className={styles.strip} onClick={()=>{redirect('/classRecord')}}>
        <i className={`iconfont ${styles.icon}`}>&#xe63d;</i>
        <span>上课记录</span>
      </div>
      <div className={styles.strip} onClick={()=>{redirect('/consumeRecord')}}>
        <i className={`iconfont ${styles.icon}`}>&#xe6f6;</i>
        <span>消费记录</span>
      </div>
      <div className={styles.strip} style={{marginTop:20}} onClick={()=>{redirect('/setBreaks')}}>
        <i className={`iconfont ${styles.icon}`}>&#xe693;</i>
        <span>设置休息时间</span>
      </div>
    </div>
  )
}
function mapStateToProps({ user }) {
  return { user };
}
export default connect(mapStateToProps)(PersonalCenter);
