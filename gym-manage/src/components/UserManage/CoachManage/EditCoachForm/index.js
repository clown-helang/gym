import React from 'react';
import { routerRedux } from 'dva/router'
import { injectIntl } from 'react-intl';
import { Form, Button, Col, Row, Input, Select, Icon } from 'antd';
import { get_length, cut_str, trim, isTrue} from '../../../../utils/index';
import TableUI from '../../../DefaultUI/TableUI';
import UploadFile from '../../../DefaultUI/UploadFile';
import CourseTable from '../../CustomComponent/CourseTable'
import messages from './messages';
import styles from './index.less'

let uuid = 0;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

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


function EditCoachForm({ dispatch, editCoach, loading, intl: { formatMessage },form:{ getFieldDecorator, setFieldsValue, getFieldValue, validateFields }  }) {
  // const loadingState = loading.effects['reviewForm/editUsersRoles']||loading.effects['reviewForm/queryRoles']||loading.effects['reviewForm/queryUsersRoles']||false;
  const { introduce } = editCoach;

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let postData = {
          usertype:values.usertype,
          topimg:[],
          introduce:[]
        }
        if(values.topimg&&values.topimg.length>0){
          if(values.topimg[0].response){
            postData.topimg = JSON.stringify([{
              resource_url: values.topimg[0].response.successful_files[0].resource_url,
              original_name: values.topimg[0].name
            }])
          } else{
            postData.topimg = JSON.stringify(values.topimg)
          }
        }
        values.keys.map(item=>{
          let _resource_url = '',_name= '';
          if(values[`resource_url_${item.key}`].length>0){
            if(values[`resource_url_${item.key}`][0].response){
              _resource_url = values[`resource_url_${item.key}`][0].response.successful_files[0].resource_url;
              _name = values[`resource_url_${item.key}`][0].name;
            } else{
              _resource_url = values[`resource_url_${item.key}`].resource_url;
              _name = values[`resource_url_${item.key}`].name;
            }
          }
          postData.introduce.push({
            description: values[`description_${item.key}`],
            resource_url: _resource_url,
            original_name:_name
          })
        })
        postData.introduce = JSON.stringify(postData.introduce)
        dispatch({type:'editCoach/editCoach', payload:{ postData }})
      }
    });
  };
  const handleCancel = () => {
    dispatch(routerRedux.push({ pathname: '/userManage/coachManage'}))
  };
  const remove = (k) => {
    let fieldValue = {};
    const keys = getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    fieldValue['keys'] = keys.filter(key => key.key !== k.key );
    setFieldsValue(fieldValue);
  };
  const add = () =>{
    let fieldValue = {};
    const keys = getFieldValue('keys');
    fieldValue['keys'] = keys.concat({
      key: ++uuid,
      resource_url: '',
      description: ''
    });
    setFieldsValue(fieldValue);
  };

  introduce.map(item=>{
    if(!item.key){
      item.key = ++uuid;
    }
  });
  getFieldDecorator('keys', { initialValue: introduce });
  const keys = getFieldValue('keys');
  const formItems = keys.map((k, index) => {
    return (
      <div key={k.key}>
        <FormItem {...(index===0?descriptionLayout:LayoutWithOutLabel)} label={index===0?formatMessage(messages.coachDescription):''}>
          {getFieldDecorator(`description_${k.key}`, {
            initialValue: k.description,
          })(
            <TextArea rows={4} style={{width:'75%'}} placeholder={formatMessage(messages.inputTip)}/>
          )}
          {index > 0
            ? <Icon className={styles.button} type="minus-circle-o" onClick={() => remove(k)} />
            : ''
          }
        </FormItem>
        <FormItem {...(index===0?descriptionLayout:LayoutWithOutLabel)} label={index===0?formatMessage(messages.uploadPicture):''}>
          <div style={{width:'75%'}}>
            {getFieldDecorator(`resource_url_${k.key}`, {
              initialValue: k.resource_url!==''?[{resource_url:k.resource_url,original_name:k.original_name}]:'',
            })(
              <UploadFile target='TeacherIntroduce'/>
            )}
          </div>
        </FormItem>
      </div>
    );
  });

  return (
    <div style={{marginTop:20,marginLeft:20}}>
      <Form onSubmit={handleSubmit}>
        <FormItem {...formItemLayout} label={formatMessage(messages.name)}>
          {getFieldDecorator('realname', {
            initialValue: editCoach.realname,
            rules: [
              {
                required: true,
                message: formatMessage(messages.notNull).replace('***',formatMessage(messages.name))
              }
            ],
            normalize:(value, prevValue) => {
              const max_length = 50;
              if(get_length(value)>=max_length){
                return cut_str(value,max_length);
              }
              return value;
            }
          })(<Input disabled={true}/>)}
        </FormItem>
        <FormItem {...formItemLayout} label={formatMessage(messages.phone)}>
          {getFieldDecorator('phone', {
            initialValue: editCoach.phone,
            // rules: [
            //   {
            //     required: true,
            //     message: formatMessage(messages.notNull).replace('***',formatMessage(messages.phone))
            //   }
            // ],
            normalize:(value, prevValue) => {
              const max_length = 6.5;
              if(get_length(value)>=max_length){
                return cut_str(value,max_length);
              }
              return value;
            }
          })(<Input  disabled={true}/>)}
        </FormItem>
        <FormItem {...formItemLayout} label={formatMessage(messages.type)}>
          {getFieldDecorator('usertype', {
            initialValue: editCoach.usertype,
            rules: [
              {
                required: true,
                message: formatMessage(messages.notNull).replace('***',formatMessage(messages.type))
              }
            ],
          })(<Select style={{ width: '100%' }}>
            <Option value="3">{formatMessage(messages.member)}</Option>
            <Option value="2">{formatMessage(messages.coach)}</Option>
            {/*<Option value="1">{formatMessage(messages.admin)}</Option>*/}
          </Select>)}
        </FormItem>
        <FormItem {...formItemLayout} label={formatMessage(messages.uploadPhoto)}>
          {getFieldDecorator('topimg', {
            rules: [
              {
                required: true,
                message: formatMessage(messages.notNull).replace('***',formatMessage(messages.uploadPhoto))
              }
            ],
            initialValue: editCoach.topimg,
          })(<UploadFile target='TeacherPhoto'/>)}
        </FormItem>

        {formItems}

        <Row style={{marginBottom: 24}}>
          <Col xl={{ span: 10, offset: 4 }} xxl={{ span: 6, offset: 3 }}>
            <Button onClick={add} type="dashed" style={{width: '100%'}}>+&nbsp;{formatMessage(messages.addCoachDescription)}</Button>
          </Col>
        </Row>

        <FormItem style={{marginTop:20}} wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 20, offset: 3 }, }}>
          <Button type="primary" htmlType="submit">
            {formatMessage(messages.okText)}
          </Button>
          <Button style={{marginLeft:'40px'}} onClick={handleCancel}>
            {formatMessage(messages.cancelText)}
          </Button>
        </FormItem>
      </Form>

      <CourseTable editCoach={editCoach} dispatch={dispatch}/>
    </div>
  );
}

export default Form.create()(injectIntl(EditCoachForm));
