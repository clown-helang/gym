import React from 'react'
import { connect } from 'dva';
import styles from './index.less'
import { Row,Col } from 'antd'
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'
import { DatePicker,TimePicker,Button } from 'antd';

const format = 'HH:mm';

function SetBreaks({dispatch,user}) {
  const menu = {
    icon:'coffee',
    title:'设置休息时间'
  };
  return (
    <div>
      <Header dispatch={dispatch} user={user}/>
      <MenuBar menu={menu}/>
      <div className={styles.setBreaks}>
        <Row>
          <Col span={6}>
            选择日期:
          </Col>
          <Col span={16}>
            <DatePicker style={{width:'100%'}} />
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            开始时间:
          </Col>
          <Col span={16}>
            <TimePicker style={{width:'100%'}} format={format}/>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            结束时间:
          </Col>
          <Col span={16}>
            <TimePicker style={{width:'100%'}} format={format}/>
          </Col>
        </Row>
        <Row>
          <Col span={16} offset={6}>
            <Button type="dashed" style={{width:'100%',color:'#3ddfc7'}} >+ 添加时间段</Button>
          </Col>
        </Row>
        <Row style={{marginTop:'1rem'}}>
          <Col span={16} offset={6}>
            <Button style={{width:'100%',backgroundColor:'#3ddfc7',color:'#fff'}} >确认设置</Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}
function mapStateToProps({ user }) {
  return { user };
}
export default connect(mapStateToProps)(SetBreaks);
