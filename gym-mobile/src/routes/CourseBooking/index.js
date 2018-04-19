import React,{ Component } from 'react'
import { connect } from 'dva';
import { Radio, Row, Col, DatePicker, Button, TimePicker   } from 'antd'
import { Form, FormCell, Cell, CellHeader,CellBody, CellFooter, Input, Label,Page } from 'react-weui'
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import styles from './index.less'
import moment from 'moment';
const format = 'HH:mm';

class CourseBooking extends Component {
  render(){
    const {dispatch,user} = this.props;
    const menu = {
      icon:'schedule',
      title:'课程预约 —— 减脂大作战'
    };

    return (
      <div>
        <Header dispatch={dispatch} user={user}/>
        <MenuBar menu={menu}/>
        {/*<div className={styles.CourseBooking}>*/}
          {/*<Row className={styles.row}>*/}
            {/*<Col span={6}>*/}
              {/*预约日期:*/}
            {/*</Col>*/}
            {/*<Col span={18}>*/}
              {/*<DatePicker onChange={this.onChange}  style={{width:'80%'}}/>*/}
            {/*</Col>*/}
          {/*</Row>*/}

          {/*<Row className={styles.row}>*/}
            {/*<Col span={6}>*/}
              {/*预约课时:*/}
            {/*</Col>*/}
            {/*<Col span={7} style={{marginRight:5}}>*/}
              {/*<Button style={{width:'100%'}}>一课时</Button>*/}
            {/*</Col>*/}
            {/*<Col span={7}>*/}
              {/*<Button style={{width:'100%'}}>二课时</Button>*/}
            {/*</Col>*/}
          {/*</Row>*/}

          {/*<Row className={styles.row}>*/}
            {/*<Col span={6}>*/}
              {/*开始时间:*/}
            {/*</Col>*/}
            {/*<Col span={18} className={styles.timePicker}>*/}
              {/*<TimePicker getPopupContainer={trigger => trigger.parentNode} popupClassName={styles.startTime} defaultValue={moment('12:08', format)} format={format} />*/}
            {/*</Col>*/}
          {/*</Row>*/}
          {/*<Row className={styles.row}>*/}
            {/*<Col span={6}>*/}
              {/*结束时间:*/}
            {/*</Col>*/}
            {/*<Col span={18}>*/}
              {/*<TimePicker disabled={true} popupClassName="startTime" style={{width:'80%'}} defaultValue={moment('12:08', format)} format={format} />*/}
            {/*</Col>*/}
          {/*</Row>*/}

          {/*<Form>*/}
            {/*<FormCell>*/}
              {/*<CellHeader>*/}
                {/*<Label>Date</Label>*/}
              {/*</CellHeader>*/}
              {/*<CellBody>*/}
                {/*<Input type="date" defaultValue="" onChange={ e=> console.log(e.target.value)}/>*/}
              {/*</CellBody>*/}
            {/*</FormCell>*/}
          {/*</Form>*/}


          {/*<Row className={styles.row}>*/}
            {/*<Col span={18} offset={6}>*/}
              {/*<Button style={{width:'80%',backgroundColor:'#3ddfc7',color:'#fff'}}>提交预约</Button>*/}
            {/*</Col>*/}
          {/*</Row>*/}
        {/*</div>*/}
        <Form>
          <FormCell>
            <CellHeader>
              <Label>Date</Label>
            </CellHeader>
            <CellBody>
              <Input type="datetime-local" defaultValue="" placeholder=""/>
            </CellBody>
          </FormCell>
        </Form>
      </div>
    )
  }
}
function mapStateToProps({ user }) {
  return { user };
}
export default connect(mapStateToProps)(CourseBooking);
