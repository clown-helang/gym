import React from 'react'
import { connect } from 'dva';
import styles from './index.less'
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'
import { getSession, isTrue } from '../../utils'
import { routerRedux } from 'dva/router'

function CourseDetail({dispatch,courseList}) {
  const { course } = courseList;
  const menu = {
    icon:'consumeDetail',
    title:`课程详情 —— ${course.classname}`
  };
  const redirect = (path) => {
    dispatch(routerRedux.push({ pathname: path ,query:{id:course.id}}));
  }
  return (
    <div>
      <Header dispatch={dispatch} />
      <MenuBar menu={menu}/>
      <div className={styles.courseLogo}>
        <img src={course.classimg&&course.classimg.length>0?course.classimg[0].resource_url:null}/>
      </div>
      <div className={styles.coursePrice}>
        <span>价格：{course.classmoney} 元</span>
        {
          isTrue(getSession('usertype'))&&getSession('usertype').toString()==='2'
          ? ''
          : <a onClick={()=>redirect('/buyCourse')}>立即购买</a>
        }

      </div>
      <div className={styles.coursesIntroduce}>
        {
          !(!(course.introduce))
          ? course.introduce.map((item,index)=>{
              return (
                <div key={index} className={styles.introduceSection}>
                  <p>{item.description}</p>
                  <img src={item.resource_url}/>
                </div>
              )
            })
          : '这个课程什么介绍都没有...'
        }
      </div>
    </div>
  )
}
function mapStateToProps({ courseList }) {
  return { courseList };
}
export default connect(mapStateToProps)(CourseDetail);
