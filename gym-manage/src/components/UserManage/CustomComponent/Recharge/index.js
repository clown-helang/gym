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

function Recharge({ memberAccount, memberName, coachList, visible, loading, submitRecharge, cancelRecharge, form, intl: { formatMessage } }) {
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
                initialValue: memberAccount,
              })(<Input readOnly={true}/>)}
            </FormItem>
            <Form layout="horizontal">
              <FormItem {...formHttpItemLayout} label={formatMessage(messages.name)}>
                {getFieldDecorator('name', {
                  initialValue: memberName,
                })(<Input readOnly={true}/>)}
              </FormItem>
              <FormItem {...formHttpItemLayout} label={formatMessage(messages.rechargeAmount)}>
                {getFieldDecorator('rechargeAmount', {
                  initialValue: '',
                })(<InputNumber style={{width:'50%',marginRight:10}}/>)}
                <span className="ant-form-text">{formatMessage(messages.rechargeUnit)}</span>
              </FormItem>
              <FormItem {...formHttpItemLayout} label={formatMessage(messages.salesMan)}>
                {getFieldDecorator('salesMan', {
                })(<Select style={{ width: '100%' }} placeholder = {formatMessage(messages.selectTip)}>
                  {
                    coachList.map((item,index) => <Option key={index} value={item.value}>{item.text}</Option>)
                  }
                </Select>)}
              </FormItem>
            </Form>
          </div>
        </Spin>
      </Modal>
    </div>
  );
}

export default Form.create()(injectIntl(Recharge));
