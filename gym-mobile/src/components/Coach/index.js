import React from 'react';
import styles from './index.less'


function Coach({dispatch, coach}) {
  return (
    <div className={styles.coach}>
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
