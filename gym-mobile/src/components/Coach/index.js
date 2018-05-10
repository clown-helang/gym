import React from 'react';
import styles from './index.less'
import { routerRedux } from 'dva/router'

function Coach({dispatch, coach}) {
  const redirect = (path) => {
    dispatch(routerRedux.push({ pathname: path ,query:{coach: JSON.stringify(coach)}}));
  }
  return (
    <div className={styles.coach} onClick={()=>{redirect('/coachDetail')}}>
      <div className={styles.avatar}>
        <img src={coach.topimg}/>
      </div>
      <div className={styles.coachIntroduce}>
        <p>
          {coach.realname}
        </p>
        <p>
          {coach.introduce||'这个教练什么介绍都没有...'}
        </p>
      </div>
    </div>
  )
}

export default Coach;
