import React from 'react';
import styles from './index.less'

function Course({dispatch, course, type}) {
  return (
    <div className={styles.course}>
      <img src={course.url}/>
      <div className={styles.shadow}/>
      <div className={styles.courseIntroduce}>
        <p>
          <span className={styles.courseName}>{course.name}</span>
        </p>
        {
          type === 'myCourse'
          ? <p>
              <span className={styles.status}>{course.status}</span>
              <a className={styles.operation}>{course.operation}</a>
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
