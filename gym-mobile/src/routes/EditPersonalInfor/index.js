import React from 'react';
import { connect } from 'dva';
import { getSession } from '../../utils';
import { ButtonArea, Button, CellsTitle, CellsTips, Cell, CellHeader, CellBody, CellFooter, Form, FormCell,
  Icon, Input, Label, TextArea, Switch, Radio, Checkbox, Select, VCode, Agreement, Toptips, Page } from 'react-weui';
import Header from '../../components/Header'

class EditPersonalInfor extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showtips: false,
      realname: this.props.editPersonalInfor.realname,
      phone: this.props.editPersonalInfor.phone,
      worktime: this.props.editPersonalInfor.worktime,
      profession: this.props.editPersonalInfor.profession,
      wanttechersex: this.props.editPersonalInfor.wanttechersex,
      wanttobe: this.props.editPersonalInfor.wanttobe
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.editPersonalInfor) {
      this.setState({
        realname: nextProps.editPersonalInfor.realname,
        phone: nextProps.editPersonalInfor.phone,
        worktime: nextProps.editPersonalInfor.worktime,
        profession: nextProps.editPersonalInfor.profession,
        wanttechersex: nextProps.editPersonalInfor.wanttechersex,
        wanttobe: nextProps.editPersonalInfor.wanttobe
      })
    }
  }
  handleChange = (e) => {
    let _state = {};
    _state[e.target.name] = e.target.value;
    if(this.state.showtips){
      if(e.target.name === 'realname'){
        _state.showtips = !(e.target.value) || !(this.state.phone)
      } else if(e.target.name === 'phone'){
        _state.showtips = !(e.target.value) || !(this.state.realname)
      }
    }
    this.setState(_state)
  }
  handleSubmit = () =>{
    const { realname, phone, worktime, profession, wanttechersex, wanttobe } = this.state;

    if(realname===''||phone===''){
      this.setState({
        showtips:true
      })
    } else{
      this.props.dispatch({type:'editPersonalInfor/changeUserInfor',payload:{postData:{realname, phone, worktime, profession, wanttechersex, wanttobe}}})
    }
  }
  render(){
    const {realname, phone, worktime, profession, wanttechersex, wanttobe, showtips} = this.state;
    return (
      <div>
        <Header />
        <CellsTitle>基础信息</CellsTitle>
        <Form>
          <FormCell>
            <CellHeader>
              <Label>真实姓名</Label>
            </CellHeader>
            <CellBody>
              <Input name="realname" value={realname} placeholder="请输入您的真实姓名" onChange={this.handleChange}/>
            </CellBody>
          </FormCell>
          <FormCell>
            <CellHeader>
              <Label>电话号码</Label>
            </CellHeader>
            <CellBody>
              <Input name="phone" value={phone} placeholder="请输入您的电话号码" onChange={this.handleChange}/>
            </CellBody>
          </FormCell>
        </Form>
        {
          showtips ? <CellsTips style={{color:'red',fontSize:'0.6em'}}>姓名和电话为必填项，请填写完整后提交</CellsTips> :''
        }
        <Form>
          <FormCell>
            <CellHeader>
              <Label>从事职业</Label>
            </CellHeader>
            <CellBody>
              <Input name="profession" value={profession} placeholder="请输入您的职业" onChange={this.handleChange}/>
            </CellBody>
          </FormCell>
          <FormCell>
            <CellHeader>
              <Label>健身目的</Label>
            </CellHeader>
            <CellBody>
              <Input name="wanttobe" value={wanttobe}  placeholder="请输入您的健身需求" onChange={this.handleChange}/>
            </CellBody>
          </FormCell>
        </Form>

        <CellsTitle>教练偏好</CellsTitle>
        <Form radio>
          <FormCell radio>
            <CellBody>男性教练</CellBody>
            <CellFooter>
              <Radio name="wanttechersex" value="男性教练" checked={Boolean(wanttechersex === '男性教练')} onChange={this.handleChange}/>
            </CellFooter>
          </FormCell>
          <FormCell radio>
            <CellBody>女性教练</CellBody>
            <CellFooter>
              <Radio name="wanttechersex" value="女性教练"  checked={Boolean(wanttechersex === '女性教练')} onChange={this.handleChange}/>
            </CellFooter>
          </FormCell>
        </Form>

        <Form>
          <FormCell>
            <CellHeader>
              <Label>工作时间</Label>
            </CellHeader>
            <CellBody>
              <Input name="worktime" value={worktime}  placeholder="请输入您的工作时间" onChange={this.handleChange}/>
            </CellBody>
          </FormCell>
        </Form>

        <ButtonArea>
          <Button style={{backgroundColor: '#3ddfc7'}} onClick={this.handleSubmit}>
            确定
          </Button>
        </ButtonArea>
      </div>
    )
  }
}

function mapStateToProps({ editPersonalInfor }) {
  return { editPersonalInfor }
}

export default connect(mapStateToProps)(EditPersonalInfor);
