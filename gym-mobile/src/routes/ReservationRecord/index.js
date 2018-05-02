import React from 'react'
import { connect } from 'dva';
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'
import { Preview, PreviewHeader, PreviewFooter, PreviewBody, PreviewItem, PreviewButton, Input } from 'react-weui';
import moment from 'moment-timezone'
import styles from './index.less'

let _defaultValue = moment().format('YYYY-MM-DD').toString()
function ReservationRecord({dispatch,user}) {
  const menu = {
    icon:'reservationRecord',
    title:'预约记录'
  };
  const onChange = (value) =>{
    console.log(value)
  };
  return (
    <div>
      <Header dispatch={dispatch} user={user}/>
      <MenuBar menu={menu}/>
      {
        user.reservationRecord.map((item,index) => {
          return (
            <div className={styles.reservationRecord} key={index}>
              <div className={styles.recordHeader}>
                <div className={styles.headerLeft}>
                  <Input type="date" name="date" defaultValue={_defaultValue} onChange={onChange}/>
                </div>
                <div className={styles.headerRight}>
                  <span>{item.courseName}</span>
                </div>
              </div>
              <div className={styles.recordBody}>
                {
                  item.reservation.map((i,key)=>{
                    return (
                      <div className={styles.bodyItem} key={key}>
                        <span>{i.start_time+'~'+i.end_time}</span>
                        <span>{i.name}</span>
                      </div>
                    )
                  })
                }
              </div>
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
export default connect(mapStateToProps)(ReservationRecord);
