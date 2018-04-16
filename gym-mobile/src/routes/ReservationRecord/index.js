import React from 'react'
import { connect } from 'dva';
import { DatePicker } from 'antd';
import styles from './index.less'
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'

function ReservationRecord({dispatch,user}) {
  const menu = {
    icon:'schedule',
    title:'预约记录'
  };
  const onChange = (value) =>{
    console.log(value)
  };
  return (
    <div>
      <Header dispatch={dispatch} user={user}/>
      <MenuBar menu={menu}/>
      <div>
        {
          user.reservationRecord.map((item,index) => {
            return (
              <div key={index} className={styles.reservationRecord}>
                <div className={styles.top}>
                  <p>{item.courseName}</p>
                  <div style={{width:'50%',float:'right'}}>
                    <DatePicker onChange={onChange}/>
                  </div>
                </div>
                {
                  item.reservation.map((i,key)=>{
                    return (
                      <p key={key}>
                        <span>{i.start_time}~{i.end_time}</span>
                        <span>{i.name}</span>
                      </p>
                    )
                  })
                }
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
export default connect(mapStateToProps)(ReservationRecord);
