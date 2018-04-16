import React from 'react'
import { connect } from 'dva';
import { Icon,Row,Col } from 'antd';
import Header from '../../components/Header';
import MenuBar from '../../components/MenuBar';
import styles from './index.less'
function ClassRecord({dispatch,user}) {
  const menu = {
    icon:'table',
    title:'上课记录'
  };
  return (
    <div>
      <Header dispatch={dispatch} user={user}/>
      <MenuBar menu={menu}/>

      {
        user.classRecord.map((item,index) => {
          return (
            <div key={index} className={styles.classRecord}>
              <div className={styles.left}>
                <p>课程：{item.className}</p>
                <p>教练：{item.coachName}</p>
                <p>时间：{item.classTime}</p>
                {
                  item.comments !== ''
                  ? <p>评论：{item.comments}</p>
                  : ''
                }
              </div>
              {
                item.state === 'finish'
                ? <div className={styles.right}>
                    <p>已完结</p>
                    {
                      item.comments === ''
                      ? <p className={styles.comments}><Icon type='form'/> 评论</p>
                      : <p className={styles.delete}><Icon type='delete'/> 删除评论</p>
                    }

                  </div>
                : <div className={styles.right}>
                    <p>已预约</p>
                  </div>
              }

            </div>
          )
        })
      }


    </div>
  )
}
function mapStateToProps({ user }) {
  return { user };
}
export default connect(mapStateToProps)(ClassRecord);
