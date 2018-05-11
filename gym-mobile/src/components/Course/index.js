import React from 'react';
import styles from './index.less'
import { routerRedux } from 'dva/router'

function Course({dispatch, course, type}) {
  const redirect = (path) => {
    if(path==='/courseBooking'){
      dispatch(routerRedux.push({ pathname: path, query:{classid:course.classid,id:course.id,techerid:course.techerid} }));
    } else{
      dispatch(routerRedux.push({ pathname: path, query:{course:JSON.stringify(course)} }));
    }
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
          ?
            (course.allclasssize - course.endclasssize) > 0
            ? <p>
                <span className={styles.status}>有效</span>
                <a className={styles.operation} onClick={()=>redirect('/courseBooking')}>预约</a>
              </p>
            : <p>
                <span className={styles.status}>已上完</span>
                <a className={styles.operation} onClick={()=>redirect('/courseBooking')}>再次购买</a>
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
