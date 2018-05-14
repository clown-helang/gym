import React from 'react';
import styles from './index.less'
import { routerRedux } from 'dva/router'

function Course({dispatch, course, type}) {
  const redirect = (path) => {
    if(path==='/courseBooking'){
      dispatch(routerRedux.push({ pathname: path, query:{classid:course.classid,id:course.id,techerid:course.techerid} }));
    } else{
      dispatch(routerRedux.push({ pathname: path, query:{id:course.id} }));
    }
  }
  return (
    <div className={styles.course}>
      <img src={course.classimg&&course.classimg.length>0?course.classimg[0].resource_url:''}/>
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
              <span className={styles.truePrice}>
                <span style={{width:45,display:'inline-block'}}>价格：</span>
                <span style={{width:50,display:'inline-block'}}>{course.classmoney}</span>
                <span style={{width:30,display:'inline-block'}}>元</span>
              </span>
            </p>
        }
      </div>
    </div>
  )
}

export default Course;
