import React from 'react';
import { Form, Input, Modal, Spin, Select } from 'antd';
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

function EditAdminUserRule({ realname, phone, usertype, visible, loading, submitEdit, cancelEdit, form, intl: { formatMessage } }) {
  const { validateFields, getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, postData) => {
      if (!err) {
        submitEdit(postData);
      }
    });
  };

  return (
    <div>
      <Modal
        title= {formatMessage(messages.edit)}
        visible={visible}
        onOk={handleSubmit}
        onCancel={cancelEdit}
        confirmLoading={loading}
      >
        <Spin spinning = {loading}>
          <div style={{ paddingTop: 20, width: '100%' }}>
            <Form layout="horizontal">
              <FormItem {...formHttpItemLayout} label={formatMessage(messages.name)}>
                {getFieldDecorator('realname', {
                  initialValue: realname,
                })(<Input disabled={true}/>)}
              </FormItem>
              <FormItem {...formHttpItemLayout} label={formatMessage(messages.phone)}>
                {getFieldDecorator('phone', {
                  initialValue: phone,
                })(<Input disabled={true}/>)}
              </FormItem>
              <FormItem {...formHttpItemLayout} label={formatMessage(messages.type)}>
                {getFieldDecorator('type', {
                  initialValue: usertype,
                })( <Select style={{ width: '100%' }}>
                  <Option value="3">{formatMessage(messages.member)}</Option>
                  <Option value="2">{formatMessage(messages.coach)}</Option>
                  <Option value="1">{formatMessage(messages.admin)}</Option>
                </Select>)}
              </FormItem>
            </Form>
          </div>
        </Spin>
      </Modal>
    </div>
  );
}

export default Form.create()(injectIntl(EditAdminUserRule));
