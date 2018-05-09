import React from 'react';
import styles from './index.less'
import { routerRedux } from 'dva/router'

function Course({dispatch, course, type}) {
  const redirect = (path,id) => {
    dispatch(routerRedux.push({ pathname: path, query:{id} }));
  }
  return (
    <div className={styles.course}>
      <img src={course.classimg}/>
      <div className={styles.shadow}/>
      <div className={styles.courseIntroduce}>
        <p onClick = {()=>redirect('/courseDetail',course.id)}>
          <span className={styles.courseName}>{"極 ● "+course.classname}</span>
        </p>
        {
          type === 'myCourse'
          ? <p>
              <span className={styles.status}>{course.status}</span>
              <a className={styles.operation} onClick={()=>redirect('/courseBooking',course.id)}>{course.operation}</a>
            </p>
          : <p>
              <span className={styles.truePrice}>VIP价：{course.classmoney} 元</span>
            </p>
        }
      </div>
    </div>
  )
}

export default Course;
