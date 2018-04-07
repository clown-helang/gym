import React from 'react';
import { Form, Input,InputNumber, Modal, Spin, Select } from 'antd';
import { injectIntl } from 'react-intl';
import messages from './messages';

const FormItem = Form.Item;
const Option = Select.Option;

const formHttpItemLayout = {
  labelCol: {
    xxl: { span: 5 },
    xl: { span: 5 },
  },
  wrapperCol: {
    xxl: { span: 17 },
    xl: { span: 17 },
  },
};

function EditUserRule({ account, name, visible, loading, submitRecharge, cancelRecharge, form, intl: { formatMessage } }) {
  const { validateFields, getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, postData) => {
      if (!err) {
        submitRecharge(postData);
      }
    });
  };

  return (
    <div>
      <Modal
        title= {formatMessage(messages.recharge)}
        visible={visible}
        onOk={handleSubmit}
        onCancel={cancelRecharge}
        confirmLoading={loading}
      >
        <Spin spinning = {loading}>
          <div style={{ paddingTop: 20, width: '100%' }}>
            <FormItem {...formHttpItemLayout} label={formatMessage(messages.account)}>
              {getFieldDecorator('account', {
                initialValue: account,
              })(<Input disabled={true}/>)}
            </FormItem>
            <Form layout="horizontal">
              <FormItem {...formHttpItemLayout} label={formatMessage(messages.name)}>
                {getFieldDecorator('name', {
                  initialValue: name,
                })(<Input disabled={true}/>)}
              </FormItem>
              <FormItem {...formHttpItemLayout} label={formatMessage(messages.rechargeAmount)}>
                {getFieldDecorator('rechargeAmount', {
                  initialValue: '',
                })(<InputNumber style={{width:'50%',marginRight:10}}/>)}
                <span className="ant-form-text">{formatMessage(messages.rechargeUnit)}</span>
              </FormItem>
              <FormItem {...formHttpItemLayout} label={formatMessage(messages.salesMan)}>
                {getFieldDecorator('salesMan', {
                  initialValue: '',
                })( <Select style={{ width: '100%' }} placeholder = {formatMessage(messages.selectTip)}>
                  <Option value="1">安西教练</Option>
                  <Option value="2">麦克海尔教练</Option>
                  <Option value="3">波波维奇教练</Option>
                </Select>)}
              </FormItem>
            </Form>
          </div>
        </Spin>
      </Modal>
    </div>
  );
}

export default Form.create()(injectIntl(EditUserRule));
