import React from 'react'
import { connect } from 'dva';
import TX from '../../assets/touxiang.jpg'
import styles from './index.less'
import pengyuyan1 from '../../assets/pengyuyan1.jpg'
import pengyuyan2 from '../../assets/pengyuyan2.jpg'
import pengyuyan3 from '../../assets/pengyuyan3.jpg'
import pengyuyan4 from '../../assets/pengyuyan4.jpg'
import pengyuyan from '../../assets/pengyuyan.jpg'
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'
import { routerRedux } from 'dva/router'
function CoachDetail({dispatch,coachList}) {
  const { coach,courseList } = coachList;
  const menu = {
    icon: 'coachDetail',
    title:`教练详情`
  };
  const redirect = (path,id) => {
    dispatch(routerRedux.push({ pathname: path ,query:{ id }}));
  }
  return (
    <div>
      <Header />
      <MenuBar menu={menu}/>
      <div className={styles.coach}>
        <div className={styles.avatar}>
          {
            console.log('coach.topimg---',coach.topimg)
          }
          <img src={coach.topimg&&coach.topimg.length>0? coach.topimg[0].resource_url: null}/>
        </div>
        <div className={styles.coachBasicInfor}>
          <p>{coach.realname}</p>
          <p>联系方式：{coach.phone}</p>
        </div>
      </div>
      <div className={styles.professorCourse}>
        <p>教授课程</p>
        {
          courseList.map((item,index)=>{
            return (
              <div className={styles.course} key={index}>
                <div className={styles.courseName}>{item.classname}</div>
                <div className={styles.button} onClick={()=>redirect('/buyCourse',item.id)}>购买</div>
              </div>
            )
          })
        }
      </div>
      <div className={styles.coachIntroduce}>
        {
          !(!(coach.introduce))
          ? coach.introduce.map((item,index)=>{
              return (
                <div key={index} className={styles.introduceSection}>
                  <p>{item.description}</p>
                  <img src={item.resource_url}/>
                </div>
              )
            })
          : '这个教练什么介绍都没有...'
        }
      </div>
    </div>
  )
}
function mapStateToProps({ coachList }) {
  return { coachList };
}
export default connect(mapStateToProps)(CoachDetail);
