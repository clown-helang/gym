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
import styles from './index.less'
import moment from 'moment-timezone'

class CourseBooking extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: moment().format('YYYY-MM-DD').toString(),
      start_time: '08:00',
      end_time: '09:00',
      class_duration:'1',
      flag: 'available',  // available：有效时间段, occupied: 区间被占用, invalid:无效的
    }
  }
  handleSubmit = () => {
    const { date, start_time, end_time, class_duration } = this.state;
    const { classshoplogid } = this.props.user;
    let flag = 'available';
    console.log(classshoplogid)
    if(this.checkTimeInvalid(start_time,end_time)){
      flag = this.checkTime(`${date} ${start_time}`,`${date} ${end_time}`)
    } else{
      flag = 'invalid'
    }
    if(flag !== 'available'){
      this.setState({flag})
    } else{
      this.props.dispatch({type:'user/appointClass',payload:{classshoplogid, classtime:class_duration, starttime:`${date} ${start_time}:00`, endtime:`${date} ${end_time}:00`}})
    }
  }
  checkTime = (start_time, end_time) =>{
    let flag = [];
    this.props.user.classRecord.map(item=>{
      flag.push(moment(end_time).isBefore(moment(item.starttime).subtract(15,'m')) || moment(start_time).isAfter(moment(item.endtime).add(15,'m')))
    })
    return flag.filter(item => item === false).length===0?'available':'occupied';
  }
  handleChange = (e) => {
    let _state = {};
    if(e.target.name === 'start_time'){
      _state[e.target.name] = e.target.value;
      _state['end_time'] = moment(`${this.state.date} ${e.target.value}`).add(this.state.class_duration,'h').format('HH:mm').toString();
    }
    else if(e.target.name === 'end_time'){
      _state['start_time'] = moment(`${this.state.date} ${e.target.value}`).subtract(this.state.class_duration,'h').format('HH:mm').toString();
      _state[e.target.name] = e.target.value;
    }
    else if(e.target.name === 'class_duration'){
      _state[e.target.name] = e.target.value;
      _state['start_time'] = this.state.start_time;
      _state['end_time'] = moment(`${this.state.date} ${this.state.start_time}`).add(e.target.value,'h').format('HH:mm').toString();
    }
    if(this.checkTimeInvalid(_state.start_time,_state.end_time)){
      _state.flag = this.checkTime(`${this.state.date} ${_state.start_time}`,`${this.state.date} ${_state.end_time}`)
    } else{
      _state.flag = 'invalid'
    }
    this.setState(_state);
  }
  checkTimeInvalid = (start_time,end_time) => {
    console.log(start_time,end_time)
    return moment().isBefore(`${this.state.date} ${start_time}`)&&moment(`${this.state.date} 22:01`).isAfter(`${this.state.date} ${end_time}`)&&moment(`${this.state.date} 07:59`).isBefore(`${this.state.date} ${start_time}`)
  }
  handleDateChange = (e) =>{
    let _payload = {
      isover: '0',
      starttime: e.target.value + ' 00:00:00',
      endtime:e.target.value + ' 23:59:59',
      classtecherid:this.props.user.course.classtecher.split(':')[0],
      classdefineid:this.props.user.course.id
    }
    this.setState({
      date: e.target.value,
      flag: moment().isBefore(moment(e.target.value).add(1,'d'))?'available':'invalid'
    });
    this.props.dispatch({type:'user/getClassRecord',payload:{..._payload}})
  }
  render(){
    const { course, classRecord } = this.props.user;
    const { date, start_time, end_time, class_duration, date_flag, flag } = this.state;
    let errorMessage = null,available_flag = !(flag === 'available');

    switch (flag){
      case "occupied":
        errorMessage = "当前选择时间段已被占用";break
      case "invalid":
        errorMessage = "当前选择时间段为无效时间";break
    }
    const menu = {
      icon:'courseBooking',
      title:`课程预约 -- ${course.classname}`
    };

    return (
      <div>
        <Header/>
        <MenuBar menu={menu}/>
        <div className={styles.courseImage}>
          <img src={course.classimg?course.classimg[0].resource_url:null}/>
        </div>
        {
          course.type === '1'
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
                    <Input type="date" name="date" value = {date} onChange={this.handleDateChange}/>
                  </CellBody>
                </FormCell>
                <FormCell>
                  <CellHeader style={{color:available_flag?'red':'rgba(0, 0, 0, 0.65)'}}>
                    <Label>开始时间</Label>
                  </CellHeader>
                  <CellBody style={{color:available_flag?'red':'rgba(0, 0, 0, 0.65)'}}>
                    <Input type="time" name="start_time" value = {start_time} onChange={this.handleChange}/>
                  </CellBody>
                </FormCell>

                <FormCell style={{color:available_flag?'red':'rgba(0, 0, 0, 0.65)'}}>
                  <CellHeader>
                    <Label>结束时间</Label>
                  </CellHeader>
                  <CellBody style={{color:available_flag?'red':'rgba(0, 0, 0, 0.65)'}}>
                    <Input type="time" name="end_time" value = {end_time} onChange={this.handleChange}/>
                  </CellBody>
                </FormCell>
                {
                  available_flag?<p style={{fontSize:'.5em',color:'red',textAlign:'right'}}>{errorMessage}</p>:''
                }
                <br/>
                <ButtonArea>
                  <Button onClick={this.handleSubmit} style={{backgroundColor:'#3ddfc7'}}> 提交预约 </Button>
                </ButtonArea>

              </Form>
              <br/>
              {
                classRecord.length>0?<CellsTitle>当前日期已预约时间</CellsTitle>:''
              }
              <div style={{marginBottom:50}}>
                {
                  classRecord.map(item=>{
                    return (
                      <Cells>
                        <Cell>
                          <CellBody>
                            {item.starttime+' ~ '+item.endtime}
                          </CellBody>
                          <CellFooter>
                            {item.classstudent}
                          </CellFooter>
                        </Cell>
                      </Cells>
                    )
                  })
                }
              </div>
            </div>
        }
      </div>
    )
  }
}
function mapStateToProps({ user }) {
  return { user };
}
export default connect(mapStateToProps)(CourseBooking);
