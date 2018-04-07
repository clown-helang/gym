import React from 'react';
import { routerRedux } from 'dva/router'
import { injectIntl } from 'react-intl';
import { Form, Button, Col, Row, Input, Select, Icon } from 'antd';
import { get_length, cut_str, trim, isTrue} from '../../../../utils/index';
import TableUI from '../../../DefaultUI/TableUI';
import UploadFile from '../../../DefaultUI/UploadFile';
import UploadPhoto from '../../../DefaultUI/UploadPhoto';
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
  const { descriptionList } = editCoach;
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  const handleCancel = () => {
    dispatch(routerRedux.push({ pathname: '/userManage/coachManage'}))
  };
  const columns = [
    {
      title: formatMessage(messages.courseName),
      dataIndex: 'courseName',
      key: 'courseName',
      width: '25%',
    },
    {
      title: formatMessage(messages.courseType),
      dataIndex: 'courseType',
      key: 'courseType',
      width: '25%',
      render: (text, record) => {
        return formatMessage(messages[text]);
      },
    },
    {
      title: formatMessage(messages.classTime),
      dataIndex: 'classTime',
      key: 'classTime',
      width: '28%',
    },
    {
      title: formatMessage(messages.operation),
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => {
        return (
          <span>
            <a className="table-btns" onClick={() => del(record.id)}>{formatMessage(messages.delete)}</a>
          </span>
        );
      },
    },
  ];
  const del = (id) =>{
    console.log(id)
  };
  const rowKey = record => record.id;
  const tableProps = {
    columns,
    data: editCoach.data,
    rowKey,
    loading: loading.models.editCoach,
  };
  const addCourse = () =>{
    dispatch({type:"editCoach/setVisible", payload:{ visible: true }})
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
    console.log('keys---',keys);
    fieldValue['keys'] = keys.concat({
      key: ++uuid,
      url: '',
      description: ''
    });
    setFieldsValue(fieldValue);
  };
  descriptionList.map(item=>{
    if(!item.key){
      item.key = ++uuid;
    }
  });
  getFieldDecorator('keys', { initialValue: descriptionList });
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
          <div style={{width:'100%',height:32}}>
            {getFieldDecorator(`url_${k.key}`, {
              initialValue: k.url,
            })(
              <UploadFile />
            )}
          </div>
        </FormItem>
      </div>
    );
  });

  return (
    <div style={{marginTop:20,marginLeft:20}}>
      <Form onSubmit={handleSubmit}>
        <FormItem {...formItemLayout} label={formatMessage(messages.account)} required = {true}>
          {getFieldDecorator('account', {
            initialValue: editCoach.account,
          })(<Input disabled={true}/>)}
        </FormItem>
        <FormItem {...formItemLayout} label={formatMessage(messages.name)}>
          {getFieldDecorator('name', {
            initialValue: editCoach.name,
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
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label={formatMessage(messages.phone)}>
          {getFieldDecorator('phone', {
            initialValue: editCoach.phone,
            rules: [
              {
                required: true,
                message: formatMessage(messages.notNull).replace('***',formatMessage(messages.phone))
              }
            ],
            normalize:(value, prevValue) => {
              const max_length = 6.5;
              if(get_length(value)>=max_length){
                return cut_str(value,max_length);
              }
              return value;
            }
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label={formatMessage(messages.type)}>
          {getFieldDecorator('type', {
            initialValue: editCoach.rule,
            rules: [
              {
                required: true,
                message: formatMessage(messages.notNull).replace('***',formatMessage(messages.type))
              }
            ],
          })(<Select style={{ width: '100%' }}>
            <Option value="member">{formatMessage(messages.member)}</Option>
            <Option value="coach">{formatMessage(messages.coach)}</Option>
            <Option value="admin">{formatMessage(messages.admin)}</Option>
          </Select>)}
        </FormItem>
        <FormItem {...formItemLayout} label={formatMessage(messages.uploadPhoto)}>
          {getFieldDecorator('photo', {
            initialValue: editCoach.photo,
          })(<UploadPhoto />)}
        </FormItem>

        {formItems}

        <Row style={{marginBottom: 24}}>
          <Col xl={{ span: 10, offset: 4 }} xxl={{ span: 6, offset: 3 }}>
            <Button onClick={add} type="dashed" style={{width: '100%'}}>+&nbsp;{formatMessage(messages.addCoachDescription)}</Button>
          </Col>
        </Row>
        <FormItem {...formItemLayout} label={formatMessage(messages.relatedCourses)}>
          {getFieldDecorator('relatedCourses', {
            initialValue: editCoach.relatedCourses,
          })(<Button type="primary" onClick = {addCourse}>
              {formatMessage(messages.add)}
            </Button>)}
        </FormItem>
        <Row style={{marginBottom: 24}}>
          <Col xl={{ span: 18, offset: 4 }} xxl={{ span: 12, offset: 3 }}>
            <TableUI {...tableProps}/>
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
