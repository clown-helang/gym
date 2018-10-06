import React from 'react'
import { connect } from 'dva';
import styles from './index.less'
import { routerRedux } from 'dva/router'
import Header from '../../components/Header'
import { getSession } from '../../utils';

function PersonalCenter({dispatch,personalCenter}) {
  const redirect = (path) => {
    dispatch(routerRedux.push({ pathname: path }));
  }
  return (
    <div>
      <Header dispatch={dispatch} type = 'noUser'/>
      <div className={styles.personalInfor}>
        <div className={styles.left}>
          <img src={personalCenter.headimgurl}/>
        </div>
        <div className={styles.center}>
          {
            parseInt(personalCenter.usertype) === 2
            ? <p>{personalCenter.realname} <span className={styles.coachTag}>教练</span></p>
            : <p>{personalCenter.realname}</p>
          }
          <p>电话：{personalCenter.phone}</p>
        </div>
        <div className={styles.right}>
          {
            parseInt(personalCenter.usertype) !== 2
            ? <p>
                <i className='iconfont' style={{color:'#3ddfc7',fontSize:24,marginRight:5,position:'relative',top:5}}>&#xe60d;</i>
                <span>VIP {personalCenter.vipclass}</span>
              </p>
            : ''
          }
        </div>
      </div>
      {
        parseInt(personalCenter.usertype) !== 2
        ? <div className={styles.strip} style={{marginBottom:20,marginTop:15}}>
            <i className={`iconfont ${styles.icon}`}>&#xe608;</i>
            <span>账户余额：<span style={{color:'#3ddfc7',fontSize:20,position:'relative',top:2}}>{personalCenter.money}</span>元</span>
          </div>
        : ''
      }
      <div className={styles.strip} onClick={()=>{redirect('/editPersonalInfor')}}>
        <i className={`iconfont ${styles.icon}`}>&#xe608;</i>
        <span>编辑个人信息</span>
      </div>
      {/*<div>*/}
        {/*<div className={styles.strip} onClick={()=>{redirect('/reservationRecord')}}>*/}
          {/*<i className={`iconfont ${styles.icon}`}>&#xe656;</i>*/}
          {/*<span>预约记录</span>*/}
        {/*</div>*/}
        {/*<div className={styles.strip} style={{marginTop:20}} onClick={()=>{redirect('/setBreaks')}}>*/}
          {/*<i className={`iconfont ${styles.icon}`}>&#xe693;</i>*/}
          {/*<span>设置休息时间</span>*/}
        {/*</div>*/}
      {/*</div>*/}
      {
        parseInt(personalCenter.usertype)  === 2
        ? <div style={{textAlign:'center',marginTop:'40%',color:'#aaa'}}>
            <p>广阔天地大有作为</p>
            <p>敬请期待更多内容</p>
          </div>
        : <div>
            <div className={styles.strip} onClick={()=>{redirect('/classRecord')}}>
              <i className={`iconfont ${styles.icon}`}>&#xe63d;</i>
              <span>上课记录</span>
            </div>
          </div>
      }

    </div>
  )
}
function mapStateToProps({ personalCenter }) {
  return { personalCenter };
}
export default connect(mapStateToProps)(PersonalCenter);
