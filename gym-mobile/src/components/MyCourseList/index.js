import React from 'react';
import styles from './index.less'
import { routerRedux } from 'dva/router'

function MyCourseList({dispatch, shopLog, type}) {
  const redirect = (path) => {
    if(path==='/courseBooking'){
      dispatch(routerRedux.push({ pathname: path, query:{classid:shopLog.classid,id:shopLog.id,techerid:shopLog.techerid} }));
    } else{
      dispatch(routerRedux.push({ pathname: path, query:{id:shopLog.classid} }));
    }
  }
  return (
    <div className={styles.course}>
      <img src={shopLog.classimg&&shopLog.classimg.length>0?shopLog.classimg[0].resource_url:''}/>
      <div className={styles.shadow}/>
      <div className={styles.courseIntroduce}>
        <p onClick = {()=>redirect('/courseDetail')}>
          <span className={styles.courseName}>{"極 ● "+shopLog.classname}</span>
        </p>
        {
          type === 'myCourse'
          ?
            (shopLog.allclasssize - shopLog.endclasssize) > 0
            ? <p>
                <span className={styles.status}>有效</span>
                <a className={styles.operation} onClick={()=>redirect('/courseBooking')}>预约</a>
              </p>
            : <p>
                <span className={styles.status}>已上完</span>
                <a className={styles.operation} onClick={()=>redirect('/courseBooking')}>再次购买</a>
              </p>
          : <p>
              <span className={styles.truePrice}>VIP价：{shopLog.classmoney} 元</span>
            </p>
        }
      </div>
    </div>
  )
}

export default MyCourseList;
