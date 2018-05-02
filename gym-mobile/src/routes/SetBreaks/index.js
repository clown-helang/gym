import React,{ Component } from 'react'
import { connect } from 'dva';
import styles from './index.less'
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'
import {
  Form,
  FormCell,
  CellsTitle,
  ButtonArea,
  Button,
  Radio,
  CellHeader,
  CellBody,
  CellFooter,
  Input,
  Label,
  LoadMore,
  Page } from 'react-weui'
import moment from 'moment-timezone';

class SetBreaks extends Component  {
  constructor(props){
    super(props);
    this.state = {
      date: moment().format('YYYY-MM-DD').toString(),
      start_time: moment().format('HH:mm').toString(),
      end_time:  moment().add(30,'m').format('HH:mm').toString(),
      breaks:[{
        start_time: moment().format('HH:mm').toString(),
        end_time:  moment().add(30,'m').format('HH:mm').toString(),
      }]
    }
  }
  handleChange = (e) => {
    let _state = {};
    _state[e.target.name] = e.target.value;
    console.log(e.target.name,e.target.value)
    this.setState(_state);
  }
  addBreak = () =>{
    let _breaks = this.state.breaks;
    _breaks.push({
      start_time: moment().format('HH:mm').toString(),
      end_time:  moment().add(30,'m').format('HH:mm').toString(),
    })
    this.setState(_breaks);
  }
  render(){
    const { dispatch, user } = this.props;
    const { date, breaks } = this.state
    const menu = {
      icon:'setBreaks',
      title:'设置休息时间'
    };
    return (
      <div>
        <Header dispatch={dispatch} user={user}/>
        <MenuBar menu={menu}/>
        <div className={styles.setBreaks}>
          <Form>
            <FormCell>
              <CellHeader>
                <Label>选择日期</Label>
              </CellHeader>
              <CellBody>
                <Input type="date" name="date" value = {date} onChange={this.handleChange}/>
              </CellBody>
            </FormCell>
            {
              breaks.map((item,index)=>{
                return (
                  <div key={index} style={{borderTop: index>0 ? '1px dashed #d9d9d9' :0}}>
                    <FormCell>
                      <CellHeader>
                        <Label>开始时间</Label>
                      </CellHeader>
                      <CellBody>
                        <Input type="time" name="start_time" value = {item.start_time} onChange={this.handleChange} />
                      </CellBody>
                    </FormCell>
                    <FormCell>
                      <CellHeader>
                        <Label>结束时间</Label>
                      </CellHeader>
                      <CellBody>
                        <Input type="time" name="end_time" value = {item.end_time} onChange={this.handleChange}/>
                      </CellBody>
                    </FormCell>
                  </div>
                )
              })
            }

          </Form>
          <FormCell>
            <CellBody>
              <div className={styles.addBreaks} onClick={this.addBreak}>
                + 添加休息时间段
              </div>
            </CellBody>
          </FormCell>
          <ButtonArea>
            <Button style={{backgroundColor:'#3ddfc7'}}> 提交设置 </Button>
          </ButtonArea>
        </div>
      </div>
    )
  }
}
function mapStateToProps({ user }) {
  return { user };
}
export default connect(mapStateToProps)(SetBreaks);
