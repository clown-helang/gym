import React from 'react';
import moment from 'moment-timezone'
import { injectIntl } from 'react-intl';
import { Form, Button, Col, Row, Input, DatePicker } from 'antd';
import { get_length, cut_str, trim, isTrue} from '../../../../utils/index';
import { routerRedux } from 'dva/router'
import TableUI from '../../../DefaultUI/TableUI';
import messages from './messages';
const { RangePicker } = DatePicker;

const { TextArea } = Input;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 6},
};

function EditCoachForm({ dispatch, addPushTask, loading, intl: { formatMessage },form:{ getFieldDecorator, getFieldValue, validateFields }  }) {
  // const loadingState = loading.effects['reviewForm/editUsersRoles']||loading.effects['reviewForm/queryRoles']||loading.effects['reviewForm/queryUsersRoles']||false;

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  const handleCancel = () => {
    dispatch(routerRedux.push({ pathname: '/pushManage/pushTaskManage'}))
  };
  const columns = [
    {
      title: formatMessage(messages.name),
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: formatMessage(messages.size),
      dataIndex: 'description',
      key: 'description',
      width: '20%',
    },
    {
      title: formatMessage(messages.lengthOfTime),
      dataIndex: 'pushTime',
      key: 'pushTime',
      width: '20%',
    },
    {
      title: formatMessage(messages.modifyTime),
      dataIndex: 'create_time',
      key: 'create_time',
      sorter: true,
      width: '20%',
      render: (text, record) => {
        return moment(record.create_time).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: formatMessage(messages.operation),
      dataIndex: 'operator',
      key: 'operator',
      // render: (text, record) => {
      //   return <a onClick={()=>review(record.id)}>{ formatMessage(messages.review)}</a>
      // },
    },
  ];
  const planColumns = [
    {
      title: formatMessage(messages.name),
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: formatMessage(messages.size),
      dataIndex: 'description',
      key: 'description',
      width: '20%',
    },
    {
      title: formatMessage(messages.lengthOfTime),
      dataIndex: 'pushTime',
      key: 'pushTime',
      width: '20%',
    },
    {
      title: formatMessage(messages.modifyTime),
      dataIndex: 'create_time',
      key: 'create_time',
      sorter: true,
      width: '20%',
      render: (text, record) => {
        return moment(record.create_time).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: formatMessage(messages.operation),
      dataIndex: 'operator',
      key: 'operator',
      // render: (text, record) => {
      //   return <a onClick={()=>review(record.id)}>{ formatMessage(messages.review) }</a>
      // },
    },
  ];

  const rowKey = record => record.id;

  const tableProps = {
    columns,
    data: addPushTask.data,
    page_size: addPushTask.page_size,
    rowKey,
    currentPageNumber: addPushTask.page_number,
    loading: loading.models.addPushTask,
  };

  const planTableProps = {
    columns: planColumns,
    data: addPushTask.planPushData,
    loading: loading.models.addPushTask,
    rowKey,
  };
  const addPushContent = () =>{
    dispatch({type:"addPushTask/setVisible", payload:{ visible: true, contentType: 'current' }})
  };
  const addPlanPushContent = () =>{
    dispatch({type:"addPushTask/setVisible", payload:{ visible: true, contentType: 'plan' }})
  };
  const onOkPushTime = (e) =>{
    console.log(e)
  };
  return (
    <div style={{marginTop:20,marginLeft:20}}>
      <Form onSubmit={handleSubmit}>
        <div style={{borderTop:'1px solid #e9e9e9'}}>
          <p style={{marginTop:15,fontSize:16}}>{formatMessage(messages.basicInformation)}</p>
          <FormItem {...formItemLayout} label={formatMessage(messages.taskName)}>
            {getFieldDecorator('name', {
              initialValue:addPushTask.name||'',
              rules: [
                {
                  required: true,
                  message: formatMessage(messages.notNull).replace(formatMessage(messages.taskName))
                }
              ],
              normalize:(value, prevValue) => {
                const max_length = 50;
                if(get_length(value)>=max_length){
                  return cut_str(value,max_length);
                }
                return value;
              }
            })(<Input/>)}
          </FormItem>
          <FormItem {...formItemLayout} label={formatMessage(messages.description)}>
            {getFieldDecorator('description', {
              initialValue:addPushTask.description||'',
              normalize:(value, prevValue) => {
                const max_length = 50;
                if(get_length(value)>=max_length){
                  return cut_str(value,max_length);
                }
                return value;
              }
            })(<TextArea rows={4}/>)}
          </FormItem>
        </div>
        <div style={{borderTop:'1px solid #e9e9e9'}}>
          <p style={{marginTop:15,fontSize:16}}>{formatMessage(messages.selectMovie)}</p>
          <FormItem {...formItemLayout} label={formatMessage(messages.thePushContent)}>
            {getFieldDecorator('name', {
              initialValue:addPushTask.thePushContent||'',
              rules: [
                {
                  required: true,
                  message: formatMessage(messages.notNull).replace(formatMessage(messages.thePushContent))
                }
              ],
            })(<Button type="primary" onClick = {addPushContent}>
              {formatMessage(messages.add)}
            </Button>)}
          </FormItem>
          <Row style={{ marginBottom:20 }}>
            <Col offset={3} span = {12}>
              <TableUI {...tableProps} />
            </Col>
          </Row>
          <FormItem {...formItemLayout} label={formatMessage(messages.pushPlanContent)}>
            {getFieldDecorator('name', {
              initialValue:addPushTask.pushPlanContent||'',
            })(<Button type="primary" onClick = {addPlanPushContent}>
              {formatMessage(messages.add)}
            </Button>)}
          </FormItem>
          <Row style={{ marginBottom:40 }}>
            <Col offset={3} span = {12}>
              <TableUI {...planTableProps} />
            </Col>
          </Row>
        </div>
        <div style={{borderTop:'1px solid #e9e9e9'}}>
          <p style={{marginTop:15,fontSize:16}}>{formatMessage(messages.pushSetting)}</p>
          <FormItem {...formItemLayout} label={formatMessage(messages.pushTime)}>
            {getFieldDecorator('pushTime', {
              initialValue:addPushTask.pushTime||'',
            })( <RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder={[formatMessage(messages.startTime), formatMessage(messages.endTime)]}
              onOk={onOkPushTime}
            />)}
          </FormItem>
        </div>
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

export default Form.create()(injectIntl(EditCoachForm));
