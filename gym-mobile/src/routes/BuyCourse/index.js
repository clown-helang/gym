import React from 'react'
import { connect } from 'dva';
import styles from './index.less'
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'
import { Select,Icon } from 'antd';

const Option = Select.Option;

function BuyCourse({dispatch,buyCourse}) {
  const { course } = buyCourse;
  const coaches = course.classtecher.split(',')

  const menu = {
    icon:'buyCourse',
    title:`购买课程 —— ${course.classname}`
  };
  const handleChange = (techerid) => {
    dispatch({type:'buyCourse/setTeacherId',payload:{techerid}})
  };
  const handleSubmit = () => {
    dispatch({type:'buyCourse/buyClass'})
  }
  return (
    <div>
      <Header />
      <MenuBar menu={menu}/>
      <div className={styles.courseLogo}>
        <img src={course.classimg[0].resource_url}/>
      </div>
      <div className={styles.orderDetail}>
        <div className={styles.recordHeader}>
          <div className={styles.headerLeft}>
            <span>合计</span>
          </div>
          <div className={styles.headerRight}>
            <span>{course.classmoney} 元</span>
          </div>
        </div>
        <div className={styles.recordBody}>
          <div className={styles.bodyItem} >
            <span>课程名称</span>
            <span>{course.classname}</span>
          </div>
          <div className={styles.bodyItem} >
            <span>课程时长</span>
            <span>{course.classsize} 小时</span>
          </div>
          <div className={styles.bodyItem} >
            <span>课程类型</span>
            <span>{course.type === '1'?'团课':'私教'}</span>
          </div>
          <div className={styles.selectTeacher} >
            <div className={styles.itemLeft}>选择教练</div>
            <div className={styles.itemRight}>
              <Select placeholder="请选择" style={{width:'80%'}} onChange = {handleChange}>
                {
                  coaches.map((coach,index) => <Option key={index} value={coach.split(':')[0]}>{coach.split(':')[1]}</Option>)
                }
              </Select>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.recordFooter}>
        <a onClick={handleSubmit}><Icon type='upload' style={{fontSize:'.9em'}}/>&nbsp;提交订单</a>
      </div>
    </div>
  )
}
function mapStateToProps({ buyCourse }) {
  return { buyCourse };
}
export default connect(mapStateToProps)(BuyCourse);
