import React from 'react';
import styles from './index.less'
import { routerRedux } from 'dva/router'

function Coach({dispatch, coach}) {
  const redirect = (path) => {
    dispatch(routerRedux.push({ pathname: path }));
  }
  return (
    <div className={styles.coach} onClick={()=>{redirect('/coachDetail')}}>
      <div className={styles.avatar}>
        <img src={coach.url}/>
      </div>
      <div className={styles.coachIntroduce}>
        <p>{coach.name}</p>
        <p>{coach.description[0].description}</p>
      </div>
    </div>
  )
}

export default Coach;
