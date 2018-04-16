import React from 'react'
import { connect } from 'dva';
import styles from './index.less'
import { Icon } from 'antd'
import Header from '../../components/Header'

function PersonalCenter({dispatch,user}) {

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
          <p>会员等级：<span>VIP {user.level}</span></p>
        </div>
      </div>

      <div className={styles.strip} style={{marginBottom:20,marginTop:15}}>
        <span><Icon type="wallet"/></span>
        <span>积分余额：<span style={{color:'#3ddfc7',fontSize:20,position:'relative',top:2}}>{user.balance}</span>元</span>
      </div>
      <div className={styles.strip}>
        <span><Icon type="table"/></span>
        <span>上课记录</span>
      </div>
      <div className={styles.strip}>
        <span><Icon type="schedule"/></span>
        <span>预约记录</span>
      </div>
      <div className={styles.strip}>
        <span><Icon type="tags-o"/></span>
        <span>消费记录</span>
      </div>
      <div className={styles.strip} style={{marginTop:20}}>
        <span><Icon type="setting"/></span>
        <span>设置</span>
      </div>
    </div>
  )
}
function mapStateToProps({ user }) {
  return { user };
}
export default connect(mapStateToProps)(PersonalCenter);
