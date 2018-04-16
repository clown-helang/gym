import React from 'react'
import { connect } from 'dva';
import TX from '../../assets/touxiang.jpg'
import styles from './index.less'
import Course from '../../components/Course'
import fuji from '../../assets/fuji2.jpg'
import yujia from '../../assets/yujia.jpg'
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'

function ConsumeRecord({dispatch,user}) {
  const menu = {
    icon:'tags-o',
    title:'消费记录'
  };
  return (
    <div>
      <Header dispatch={dispatch} user={user}/>
      <MenuBar menu={menu}/>
      <div>
        {
          user.consumeRecord.map((item,index) => {
            return (
              <div key={index} className={styles.consumeItem}>
                <p>时间：{item.consume_time}</p>
                <p>课程：{item.courseName}</p>
                <p>价格：<span>{item.price}</span> 元</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
function mapStateToProps({ user }) {
  return { user };
}
export default connect(mapStateToProps)(ConsumeRecord);
