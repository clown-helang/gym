import React,{ Component } from 'react'
import { connect } from 'dva';
import {
  Form,
  FormCell,
  Cells,
  Cell,
  CellsTitle,
  ButtonArea,
  Button,
  Radio,
  CellHeader,
  CellBody,
  CellFooter,
  Input,
  Label,
  Page } from 'react-weui'
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'
import fuji from '../../assets/fuji2.jpg'
import yujia from '../../assets/yujia.jpg'
import styles from './index.less'
import moment from 'moment-timezone'

let _defaultValue = moment().format('HH:mm').toString()

class CourseBooking extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: moment().format('YYYY-MM-DD').toString(),
      start_time: _defaultValue,
      end_time: _defaultValue,
      class_duration:'1',
      type:'group'
    }
  }
  handleChange = (e) => {
    let _state = {};
    if(e.target.name === 'start_time'){
      _state[e.target.name] = e.target.value;
      _state['end_time'] = moment(`${this.state.date} ${e.target.value}`).add(this.state.class_duration,'h').format('hh:mm').toString();
    }
    else if(e.target.name === 'end_time'){
      _state['start_time'] = moment(`${this.state.date} ${e.target.value}`).subtract(this.state.class_duration,'h').format('hh:mm').toString();
      _state[e.target.name] = e.target.value;
    }
    else if(e.target.name === 'class_duration'){
      _state[e.target.name] = e.target.value;
      _state['start_time'] = '';
      _state['end_time'] = '';
    }
    else {
      _state[e.target.name] = e.target.value;
    }
    console.log(e.target.name,e.target.value)
    this.setState(_state);
  }
  render(){
    const {dispatch,user} = this.props;
    const { bookingCourse } = user;
    console.log(bookingCourse)
    const { date,start_time,end_time,class_duration,type } = this.state;
    const menu = {
      icon:'courseBooking',
      title:`课程预约 -- ${bookingCourse.name}`
    };

    return (
      <div>
        <Header dispatch={dispatch} user={user}/>
        <MenuBar menu={menu}/>
        <div className={styles.courseImage}>
          <img src={bookingCourse.url}/>
        </div>
        {
          bookingCourse.type === 'group'
          ? <div className={styles.CourseBooking}>
              <Form>
                <FormCell>
                  <CellHeader>
                    <Label>报名人数</Label>
                  </CellHeader>
                  <CellBody>
                    0/16
                  </CellBody>
                </FormCell>
              </Form>

              <br/>
              <CellsTitle>选择时间</CellsTitle>
              <Form>
                <FormCell>
                  <CellHeader>
                    <Label>选择日期</Label>
                  </CellHeader>
                  <CellBody>
                    <Input type="date" name="date" value = {date} onChange={this.handleChange}/>
                  </CellBody>
                </FormCell>
                <FormCell>
                  <CellHeader>
                    <Label>开始时间</Label>
                  </CellHeader>
                  <CellBody>
                    {start_time}
                  </CellBody>
                </FormCell>

                <FormCell>
                  <CellHeader>
                    <Label>结束时间</Label>
                  </CellHeader>
                  <CellBody>
                    {end_time}
                  </CellBody>
                </FormCell>

                <br/>
                <ButtonArea>
                  <Button style={{backgroundColor:'#3ddfc7'}}> 提交预约 </Button>
                </ButtonArea>
              </Form>
            </div>
          : <div className={styles.CourseBooking}>
              <CellsTitle>选择课时</CellsTitle>
              <Form radio>
                <FormCell radio>
                  <CellBody>一课时</CellBody>
                  <CellFooter>
                    <Radio name="class_duration" value="1" defaultChecked = {class_duration==='1'} onClick={this.handleChange}/>
                  </CellFooter>
                </FormCell>
                <FormCell radio>
                  <CellBody>二课时</CellBody>
                  <CellFooter>
                    <Radio name="class_duration" value="2" defaultChecked = {class_duration==='2'} onClick={this.handleChange}/>
                  </CellFooter>
                </FormCell>
              </Form>

              <br/>
              <CellsTitle>选择时间</CellsTitle>
              <Form>
                <FormCell>
                  <CellHeader>
                    <Label>选择日期</Label>
                  </CellHeader>
                  <CellBody>
                    <Input type="date" name="date" value = {date} onChange={this.handleChange}/>
                  </CellBody>
                </FormCell>
                <FormCell>
                  <CellHeader>
                    <Label>开始时间</Label>
                  </CellHeader>
                  <CellBody>
                    <Input type="time" name="start_time" value = {start_time} onChange={this.handleChange}/>
                  </CellBody>
                </FormCell>

                <FormCell>
                  <CellHeader>
                    <Label>结束时间</Label>
                  </CellHeader>
                  <CellBody>
                    <Input type="time" name="end_time" value = {end_time} onChange={this.handleChange}/>
                  </CellBody>
                </FormCell>

                <br/>
                <ButtonArea>
                  <Button style={{backgroundColor:'#3ddfc7'}}> 提交预约 </Button>
                </ButtonArea>

              </Form>
              <br/>
              <CellsTitle>当前日期已预约时间</CellsTitle>
              <div style={{marginBottom:50}}>
                <Cells>
                  <Cell>
                    <CellBody>
                      10:00 ~ 12:00
                    </CellBody>
                    <CellFooter>
                      张三
                    </CellFooter>
                  </Cell>
                </Cells>
              </div>
            </div>
        }


      </div>
    )
  }
}
function mapStateToProps({ user }) {
  console.log(user)
  return { user };
}
export default connect(mapStateToProps)(CourseBooking);
