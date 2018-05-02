import React from 'react'
import { connect } from 'dva';
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'
import { Preview, PreviewHeader, PreviewFooter, PreviewBody, PreviewItem, PreviewButton, Input } from 'react-weui';
import moment from 'moment-timezone'
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
              <Preview style={{marginTop:5}} key={index}>
                <PreviewHeader>
                  <PreviewItem label={<Input type="date" name="date" defaultValue={_defaultValue} onChange={onChange}/>} value={item.courseName} />
                </PreviewHeader>
                <PreviewBody>
                  {
                    item.reservation.map((i,key)=>{
                      return (
                        <PreviewItem label={i.start_time+'~'+i.end_time} value={i.name} key={key}/>
                      )
                    })
                  }
                </PreviewBody>
              </Preview>
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
