import React from 'react';
import { routerRedux } from 'dva/router'
import { injectIntl } from 'react-intl';
import { Form, Button, Col, Row, Input, Select, Icon, Radio,DatePicker  } from 'antd';
import { get_length, cut_str, trim, isTrue} from '../../../utils/index';
import TableUI from '../../DefaultUI/TableUI';
import UploadFile from '../../DefaultUI/UploadFile';
import CoachTable from '../CoachTable';
import messages from './messages';
import styles from './index.less'
const RadioGroup = Radio.Group;
let uuid = 0;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
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


function AddCourseForm({ dispatch, addCourseManage, loading, intl: { formatMessage },form:{ getFieldDecorator, setFieldsValue, getFieldValue, validateFields }  }) {
  // const loadingState = loading.effects['reviewForm/editUsersRoles']||loading.effects['reviewForm/queryRoles']||loading.effects['reviewForm/queryUsersRoles']||false;
  const { descriptionList } = addCourseManage;
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  const handleCancel = () => {
    dispatch(routerRedux.push({ pathname: '/courseManage'}))
  };
  const columns = [
    {
      title: formatMessage(messages.coachName),
      dataIndex: 'coachName',
      key: 'coachName',
      width: '33%'
    },
    {
      title: formatMessage(messages.phone),
      dataIndex: 'phone',
      key: 'phone',
      width: '33%'
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
    data: addCourseManage.data,
    rowKey,
    loading: loading.models.addCourseManage,
  };
  const addCoach = () =>{
    dispatch({type:"addCourseManage/setVisible", payload:{ visible: true }})
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
        <FormItem {...(index===0?descriptionLayout:LayoutWithOutLabel)} label={index===0?formatMessage(messages.courseDescription):''}>
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
        <FormItem {...formItemLayout} label={formatMessage(messages.courseName)}>
          {getFieldDecorator('name', {
            initialValue: addCourseManage.name,
            rules: [
              {
                required: true,
                message: formatMessage(messages.notNull).replace('***',formatMessage(messages.courseName))
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
        <FormItem {...formItemLayout} label={formatMessage(messages.courseBackground)}>
          {getFieldDecorator('courseBackground', {
            initialValue: addCourseManage.courseBackground,
          })(<UploadFile />)}
        </FormItem>

        {formItems}

        <Row style={{marginBottom: 24}}>
          <Col xl={{ span: 10, offset: 4 }} xxl={{ span: 6, offset: 3 }}>
            <Button onClick={add} type="dashed" style={{width: '100%'}}>+&nbsp;{formatMessage(messages.addCourseDescription)}</Button>
          </Col>
        </Row>
        <FormItem {...formItemLayout} label={formatMessage(messages.courseType)}>
          {getFieldDecorator('type', {
            initialValue: addCourseManage.type,
            rules: [
              {
                required: true,
                message: formatMessage(messages.notNull).replace('***',formatMessage(messages.courseType))
              }
            ],
          })(<RadioGroup>
            <Radio value='groupClass'>{formatMessage(messages.groupClass)}</Radio>
            <Radio value='personalClass'>{formatMessage(messages.personalClass)}</Radio>
          </RadioGroup>)}
        </FormItem>
        <FormItem {...formItemLayout} label={formatMessage(messages.classTime)}>
          {getFieldDecorator('classTime', {
            initialValue: addCourseManage.classTime,
            rules: [
              {
                required: true,
                message: formatMessage(messages.notNull).replace('***',formatMessage(messages.classTime))
              }
            ],
          })(<RangePicker />)}
        </FormItem>
        <FormItem {...formItemLayout} label={formatMessage(messages.selectCoach)}>
          {getFieldDecorator('selectCoach', {
            initialValue: addCourseManage.selectCoach,
          })(<Button type="primary" onClick = {addCoach}>
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

      <CoachTable addCourseManage={addCourseManage} dispatch={dispatch}/>
    </div>
  );
}

export default Form.create()(injectIntl(AddCourseForm));
