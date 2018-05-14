import React from 'react';
import { Modal, Form, Input} from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import { get_length, cut_str, getSession, setSession } from '../../../utils';
import messages from './messages';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {span: 6 },
  wrapperCol: { span: 14 },
};

function AddAdminModal({addVisible, addAdminDTO, dispatch, loading, setAccountVisibleAndUser, form:{validateFieldsAndScroll, getFieldDecorator},intl:{formatMessage} }) {
  const handleOk = (e) => {
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        console.log(values)
        dispatch({type: 'adminManage/addAdministrator',payload:{postData:values}})
      }
    });
  };
  const handleCancel = (e) => {
    dispatch({type: 'adminManage/setAddVisible',payload:{addVisible:false}})
  };
  return (
    <div>
      {addVisible ?
        <Modal
          title={formatMessage(messages.addAdministrator)}
          visible={addVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          confirmLoading={loading}
        >
          <div>
            <Form layout='horizontal'>
              <FormItem {...formItemLayout} label={formatMessage(messages.account)}>
                {getFieldDecorator('loginname', {
                  initialValue:addAdminDTO.loginname,
                  rules: [
                    {
                      required: true,
                      message: formatMessage(messages.notNull).replace('***',formatMessage(messages.account))
                    },
                    {
                      pattern:/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
                      message:formatMessage(messages.email_illegal)
                    }
                  ],
                })(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label={formatMessage(messages.name)}>
                {getFieldDecorator('realname', {
                  initialValue:addAdminDTO.realname,
                  rules: [
                    {
                      required: true,
                      message: formatMessage(messages.notNull).replace('***',formatMessage(messages.name))
                    },
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
                  initialValue:addAdminDTO.phone,
                  rules:[
                    {
                      required: true,
                      message: formatMessage(messages.notNull).replace('***',formatMessage(messages.phone))
                    },
                    {
                      pattern:/^[0-9+-\s]+$/i,
                      message:formatMessage(messages.phone_illegal)
                    }
                  ],
                  normalize:(value, prevValue) => {
                    const max_length = 12.5;
                    if(get_length(value)>=max_length){
                      return cut_str(value,max_length);
                    }
                    return value;
                  }
                })(<Input />)}
              </FormItem>
            </Form>
          </div>
        </Modal>
        :''}
    </div>
  );
}
export default injectIntl(Form.create()(AddAdminModal));
