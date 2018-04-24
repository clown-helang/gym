import React from 'react';
import styles from './index.less'
import { routerRedux } from 'dva/router'

function Course({dispatch, course, type}) {
  const redirect = (path) => {
    dispatch(routerRedux.push({ pathname: path }));
  }
  return (
    <div className={styles.course}>
      <img src={course.url}/>
      <div className={styles.shadow}/>
      <div className={styles.courseIntroduce}>
        <p onClick = {()=>redirect('/courseDetail',course.id)}>
          <span className={styles.courseName}>{course.name}</span>
        </p>
        {
          type === 'myCourse'
          ? <p>
              <span className={styles.status}>{course.status}</span>
              <a className={styles.operation} onClick={()=>redirect('/courseBooking',course.id)}>{course.operation}</a>
            </p>
          : <p>
              <span className={styles.originalPrice}>原价：{course.oldPrice} 元</span>
              <span className={styles.truePrice}>VIP价：{course.vipPrice} 元</span>
            </p>
        }

      </div>
    </div>
  )
}

export default Course;
