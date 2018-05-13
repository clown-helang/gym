import React,{ Component } from 'react'
import { connect } from 'dva';
import styles from './index.less';
import { getSession } from '../../utils';
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'
import {
  Form,
  FormCell,
  CellsTitle,
  ButtonArea,
  Button,
  Radio,
  Cell,
  CellHeader,
  CellBody,
  CellFooter,
  Input,
  Label,
  LoadMore,
  Page,
  Cells} from 'react-weui'
import moment from 'moment-timezone';

class SetBreaks extends Component  {
  constructor(props){
    super(props);
    this.state = {
      date: moment().format('YYYY-MM-DD').toString(),
      start_time: moment().format('HH:mm').toString(),
      end_time:  moment().add(60,'m').format('HH:mm').toString(),
      type: 'general',
      flag: 'available' // available：有效时间段, invalid:无效的
    }
  }
  checkTime = (start_time, end_time) =>{
    let flag = [];
    flag.push(moment().isBefore(moment(start_time)))
    this.props.personalCenter.teacherDisableTime.map(item=>{
      flag.push(moment(end_time).isBefore(moment(item.starttime)) || moment(start_time).isAfter(moment(item.endtime)))
    })
    //console.log(777,this.props.personalCenter,flag)
    return flag.filter(item => item === false).length===0?'available':'invalid';
  }
  handleChange = (e) => {
    const {date, type, start_time, end_time} = this.state;
    let _state = {};
    _state[e.target.name] = e.target.value;
    if(e.target.name !== 'type'){
      if(e.target.name === 'date'){
        this.props.dispatch({type:'personalCenter/getTeacherDisableTime',payload:{
          todaystart: moment(e.target.value).format('YYYY-MM-DD')+" 00:00:00",
          techerid: getSession('id'),
        }})
        this.props.dispatch({type:'personalCenter/getTeacherClassRecord',payload:{
          starttime: moment(e.target.value).format('YYYY-MM-DD')+" 00:00:00",
          endtime: moment(e.target.value).format('YYYY-MM-DD')+" 23:59:59",
          classtecherid: getSession('id'),
        }});
        _state.flag = this.checkTime(`${e.target.value} ${start_time}`,`${e.target.value} ${end_time}`)
      } else{
        if(type === 'general'){
          if(e.target.name === 'start_time'){
            _state.end_time = moment(`${date} ${e.target.value}`).add(1,'h').format('HH:mm').toString()
          }
          if(e.target.name === 'end_time'){
            _state.start_time = moment(`${date} ${e.target.value}`).subtract(1,'h').format('HH:mm').toString()
          }
          _state.flag = this.checkTime(`${date} ${_state.start_time}`,`${date} ${_state.end_time}`)
        } else {
          if(e.target.name === 'start_time'){
            if(moment(`${date} ${e.target.value}`).isAfter(moment(`${date} ${end_time}`))){
              _state.flag = this.checkTime(`${date} ${e.target.value}`,`${date} ${end_time}`)
            }
            else{
              _state.flag = moment(`${date} ${e.target.value}`).isAfter(moment(`${date} ${end_time}`))?'available':'invalid';
            }
          } else{
            if(moment(`${date} ${start_time}`).isAfter(moment(`${date} ${e.target.value}`))){
              _state.flag = this.checkTime(`${date} ${start_time}`,`${date} ${e.target.value}`)
            } else{
              _state.flag = moment(`${date} ${start_time}`).isAfter(moment(`${date} ${e.target.value}`))?'available':'invalid';
            }
          }
        }
      }
    } else {
      _state.flag = this.checkTime(`${date} ${start_time}`,`${date} ${end_time}`)
    }
    this.setState(_state);
  }

  handleSubmit = () =>{
    let {date, type, start_time, end_time, flag} = this.state;
    flag = this.checkTime(`${date} ${start_time}`,`${date} ${end_time}`);
    if(flag === 'available'&&Boolean(date&&start_time&&end_time)){
      let postData = {
        todaystart: date + ' 00:00:00',
        starttime: moment(`${date} ${start_time}`).format('YYYY-MM-DD HH:mm:ss').toString(),
        endtime: moment(`${date} ${end_time}`).format('YYYY-MM-DD HH:mm:ss').toString(),
      }
      if(type === 'general'){
        postData.thisresttime = parseInt((moment(`${date} ${end_time}`).unix() - moment(`${date} ${start_time}`).unix())/3600);
        this.props.dispatch({type:'personalCenter/addRestTime',payload:{postData}})
      } else {
        postData.thisleavetime = parseInt((moment(`${date} ${end_time}`).unix() - moment(`${date} ${start_time}`).unix())/3600);
        this.props.dispatch({type:'personalCenter/addAskForLeave',payload:{postData}})
      }
    }
    else{
      this.setState({
        flag:'invalid'
      })
    }
  }
  render(){
    const { classRecord } = this.props.personalCenter;
    const { date, start_time, end_time, flag } = this.state
    const menu = {
      icon:'setBreaks',
      title:'设置休息时间'
    };
    return (
      <div>
        <Header />
        <MenuBar menu={menu}/>
        <div className={styles.setBreaks}>
          <CellsTitle>选择类型</CellsTitle>
          <Form radio>
            <FormCell radio>
              <CellBody>日常工作休息</CellBody>
              <CellFooter>
                <Radio name="type" value="general" defaultChecked onChange = {this.handleChange}/>
              </CellFooter>
            </FormCell>
            <FormCell radio>
              <CellBody>事、病等请假</CellBody>
              <CellFooter>
                <Radio name="type" value="askForLeave" onChange = {this.handleChange}/>
              </CellFooter>
            </FormCell>
          </Form>
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
                <Input type="time" name="start_time" value = {start_time} onChange={this.handleChange} />
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
            {
              flag !== 'available'?<div><p style={{fontSize:'.5em',color:'red',textAlign:'right'}}>当前时间区间不可用，请输入正确的时间区间</p></div>:''
            }
          </Form>
          <ButtonArea>
            <Button style={{backgroundColor:'#3ddfc7',marginTop:30}} onClick={this.handleSubmit}> 提交设置 </Button>
          </ButtonArea>
          {
            classRecord.length>0?<CellsTitle>当前日期已设置休息时间</CellsTitle>:''
          }
          {
            classRecord.map((item,index)=>{
              if(item.type.toString() === '3'||item.type.toString() === '4'){
                return (
                  <Cells key={index}>
                    <Cell>
                      <CellBody>
                        已设置时间区间:
                      </CellBody>
                      <CellFooter>
                        {item.starttime.split(' ')[1]+' ~ '+item.endtime.split(' ')[1]}
                      </CellFooter>
                    </Cell>
                  </Cells>
                )
              }
            })
          }
        </div>
      </div>
    )
  }
}
function mapStateToProps({ personalCenter }) {
  return { personalCenter };
}
export default connect(mapStateToProps)(SetBreaks);
