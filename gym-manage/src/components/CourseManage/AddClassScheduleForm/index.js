import React from 'react';
import { routerRedux } from 'dva/router'
import { injectIntl } from 'react-intl';
import { Form, Button, Select, DatePicker, InputNumber } from 'antd';
import { get_length, cut_str, trim, isTrue} from '../../../utils/index';
import moment from 'moment-timezone'
import messages from './messages';
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    xl: { span: 4 },
    xxl: { span: 3 },
  },
  wrapperCol: {
    xl: { span: 10 },
    xxl: { span: 6 },
  },
};
const descriptionLayout = {
  labelCol: {
    xl: { span: 4 },
    xxl: { span: 3 },
  },
  wrapperCol: {
    xl: { span: 13 },
    xxl: { span: 8 },
  },
};

const LayoutWithOutLabel = {
  wrapperCol: {
    xl: { span: 13, offset: 4 },
    xxl: { span: 8, offset: 3 },
  }
};


function AddClassScheduleForm({ dispatch, addClassSchedule, loading, intl: { formatMessage },form:{ getFieldDecorator, setFieldsValue, getFieldValue, validateFields }  }) {
  // const loadingState = loading.effects['reviewForm/editUsersRoles']||loading.effects['reviewForm/queryRoles']||loading.effects['reviewForm/queryUsersRoles']||false;
  const { courseList, coachList, model } = addClassSchedule;
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        //console.log('values---',values)
        let postData = {
          classname: values.classname.split(':')[1],
          classdefineid: values.classname.split(':')[0],
          techerid: values.techername.split(":")[0],
          techername: values.techername.split(":")[1],
          mixpeopelsize:values.mixpeopelsize,
          starttime:moment(values.starttime).format("YYYY-MM-DD HH:mm:ss").toString(),
          endtime:moment(values.endtime).format("YYYY-MM-DD HH:mm:ss").toString(),
          classtime: parseInt((moment(values.endtime).unix() - moment(values.starttime).unix())/3600),
          isover:0
        }
        console.log('postData---',postData)
        if(model === 'add'){
          dispatch({type:'addClassSchedule/addGroupClass',payload:{ postData }})
        } else{
          dispatch({type:'addClassSchedule/editGroupClass',payload:{ postData }})
        }
      }
    });
  };
  const handleCancel = () => {
    dispatch(routerRedux.push({ pathname: '/classSchedule'}))
  };
  const handleCourseChange = (value) =>{
    let _coachList = [];
    courseList.map(item=>{
      if(parseInt(item.id)===parseInt(value.split(':')[0])){
        _coachList = item.classtecher.split(',')
      }
    })
    dispatch({type:'addClassSchedule/setCoachList',payload:{ coachList:_coachList }})
  }
  return (
    <div style={{marginTop:20,marginLeft:20}}>
      <Form onSubmit={handleSubmit}>
        <FormItem {...formItemLayout} label={formatMessage(messages.courseName)}>
          {getFieldDecorator('classname', {
            initialValue: addClassSchedule.classdefineid?addClassSchedule.classdefineid+':'+addClassSchedule.classname:null,
            rules: [
              {
                required: true,
                message: formatMessage(messages.notNull).replace('***',formatMessage(messages.courseName))
              }
            ],
          })(<Select onChange={handleCourseChange}>
            {
              courseList.map((item, index)=>{
                return <Option key={index} value={item.id+':'+item.classname}>{item.classname}</Option>
              })
            }
          </Select>)}
        </FormItem>
        <FormItem {...formItemLayout} label={formatMessage(messages.selectCoach)}>
          {getFieldDecorator('techername', {
            initialValue: addClassSchedule.selectTeacher||null,
            rules: [
              {
                required: true,
                message: formatMessage(messages.notNull).replace('***','教练')
              }
            ],
          })(<Select>
              {
                coachList.map((item,index)=><Option key={index} value={item}>{item.split(":")[1]}</Option>)
              }
          </Select>)}
        </FormItem>
        <FormItem {...formItemLayout} label={formatMessage(messages.totalNumber)}>
          {getFieldDecorator('mixpeopelsize', {
            initialValue: addClassSchedule.mixpeopelsize||null,
            rules: [
              {
                required: true,
                message: formatMessage(messages.notNull).replace('***',formatMessage(messages.totalNumber))
              }
            ],
          })(<InputNumber style={{width:'50%'}}/>)}
          <span className="ant-form-text">人</span>
        </FormItem>
        {
          console.log(addClassSchedule)
        }

        <FormItem {...formItemLayout} label={formatMessage(messages.startTime)}>
          {getFieldDecorator('starttime', {
            initialValue: addClassSchedule.starttime?moment(addClassSchedule.starttime):null,
            rules: [
              {
                required: true,
                message: formatMessage(messages.notNull).replace('***',formatMessage(messages.totalNumber))
              }
            ],
          })(<DatePicker style={{width:'100%'}} showTime format="YYYY-MM-DD HH:mm:ss" placeholder="选择时间"/>)}
        </FormItem>

        <FormItem {...formItemLayout} label={formatMessage(messages.endTime)}>
          {getFieldDecorator('endtime', {
            initialValue: addClassSchedule.endtime?moment(addClassSchedule.endtime):null,
            rules: [
              {
                required: true,
                message: formatMessage(messages.notNull).replace('***',formatMessage(messages.totalNumber))
              }
            ],
          })(<DatePicker style={{width:'100%'}}  showTime format="YYYY-MM-DD HH:mm:ss" placeholder="选择时间"/>)}
        </FormItem>

        <FormItem style={{marginTop:20}} wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 20, offset: 3 }, }}>
          <Button type="primary" htmlType="submit">
            {formatMessage(messages.okText)}
          </Button>
          <Button style={{marginLeft:'40px'}} onClick={handleCancel}>
            {formatMessage(messages.cancelText)}
          </Button>
        </FormItem>
      </Form>
    </div>
  );
}

export default Form.create()(injectIntl(AddClassScheduleForm));
