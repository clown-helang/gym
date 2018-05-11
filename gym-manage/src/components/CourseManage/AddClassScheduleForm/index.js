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
  const { courseList } = addClassSchedule;
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('values---',values)
        let postData = {
          classname: values.classname,
          iscommend: values.iscommend,
          isshop: '2',
          classmoney: values.classmoney,
          classtecher:[],
          classsize: values.classsize,
          introduce: [],
          type: values.type,
          classimg:[]
        }
        if(values.classimg.length>0){
          postData.classimg = JSON.stringify([{
            resource_url: values.classimg[0].response.successful_files[0].resource_url,
            original_name: values.classimg[0].name
          }])
        }
        if(coachList.contents){
          coachList.contents.map(item => {
            postData.classtecher.push(`${item.id}:${item.realname}`)
          })
        }
        values.keys.map(item=>{
          let _resource_url = '',_name= '';
          if(values[`resource_url_${item.key}`].length>0){
            _resource_url = values[`resource_url_${item.key}`][0].response.successful_files[0].resource_url;
            _name = values[`resource_url_${item.key}`][0].name;
          }
          postData.introduce.push({
            description: values[`description_${item.key}`],
            resource_url: _resource_url,
            original_name:_name
          })
        })
        postData.introduce = JSON.stringify(postData.introduce)
        console.log('postData--',postData)
        dispatch({type:'addCourseManage/addNewCourse', payload:{ postData }})
      }
    });
  };
  const handleCancel = () => {
    dispatch(routerRedux.push({ pathname: '/courseManage'}))
  };
  return (
    <div style={{marginTop:20,marginLeft:20}}>
      <Form onSubmit={handleSubmit}>
        <FormItem {...formItemLayout} label={formatMessage(messages.courseName)}>
          {getFieldDecorator('classname', {
            initialValue: addClassSchedule.classname||'',
            rules: [
              {
                required: true,
                message: formatMessage(messages.notNull).replace('***',formatMessage(messages.courseName))
              }
            ],
          })(<Select>
            <Option value='1'>团体瑜伽课</Option>
            <Option value='2'>动感单车</Option>
          </Select>)}
        </FormItem>
        <FormItem {...formItemLayout} label={formatMessage(messages.selectCoach)}>
          {getFieldDecorator('techername', {
            initialValue: addClassSchedule.type||'',
            rules: [
              {
                required: true,
                message: formatMessage(messages.notNull).replace('***','教练')
              }
            ],
          })(<Select>
            <Option value='1'>安琪</Option>
            <Option value='2'>何浪</Option>
          </Select>)}
        </FormItem>
        <FormItem {...formItemLayout} label={formatMessage(messages.totalNumber)}>
          {getFieldDecorator('mixpeopelsize', {
            initialValue: addClassSchedule.mixpeopelsize||'',
            rules: [
              {
                required: true,
                message: formatMessage(messages.notNull).replace('***',formatMessage(messages.totalNumber))
              }
            ],
          })(<InputNumber style={{width:'50%'}}/>)}
          <span className="ant-form-text">人</span>
        </FormItem>
        <FormItem {...formItemLayout} label={formatMessage(messages.startTime)}>
          {getFieldDecorator('starttime', {
            initialValue: addClassSchedule.starttime||null,
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
            initialValue: addClassSchedule.endtime||null,
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
