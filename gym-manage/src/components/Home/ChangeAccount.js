import React from 'react';
import { Modal, Form, Input} from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import { get_length, cut_str, getSession, setSession } from '../../utils';
import { editUser } from '../../services/gymServices'
import messages from './messages';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {span: 6 },
  wrapperCol: { span: 14 },
};

function ChangeAccount({account_visible, edit_dto, setLoadingState, loading, setAccountVisibleAndUser, form:{validateFieldsAndScroll, getFieldDecorator},intl:{formatMessage} }) {
  const handleOk = (e) => {
    setLoadingState(true);
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      const token = getSession('token');
      const payload = {
        token,
        name:values.name,
        phone:values.phone,
        mail:values.mail,
      };
      editUser({payload}).then((body) => {
        setLoadingState(false);
        if(body){
          setSession('user', body.name);
          setAccountVisibleAndUser(false,body.name);
        }
      },(res) => {
        setLoadingState(false);
        Modal.error({
          title: appLocale.messages["commom.Error.nologin.title"],
          content: appLocale.messages["commom.Error.nologin.content"],
          okText:appLocale.messages["common.BaseUI.button.okText"],
          onOk: () => {
            localStorage.clear();
            location.href="/";
          }
        });
      })
    });
  };
  const handleCancel = (e) => {
    setAccountVisibleAndUser(false);
  };
  return (
    <div>
      {account_visible ?
        <Modal
          title={formatMessage(messages.editUser)}
          visible={account_visible}
          onOk={handleOk}
          onCancel={handleCancel}
          confirmLoading={loading}
        >
          <div>
            <Form layout='horizontal'>
              <FormItem {...formItemLayout} label={formatMessage(messages.account.account)}>
                {getFieldDecorator('account', {
                  initialValue:edit_dto.account,
                })(<Input readOnly={true}/>)}
              </FormItem>
              <FormItem {...formItemLayout} label={formatMessage(messages.account.name)}>
                {getFieldDecorator('name', {
                  initialValue:edit_dto.name,
                  rules: [
                    {
                      required: true,
                      message: formatMessage(messages.account.nameNotNull)
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
              <FormItem {...formItemLayout} label={formatMessage(messages.account.phone)}>
                {getFieldDecorator('phone', {
                  initialValue:edit_dto.phone,
                  rules:[{
                    pattern:/^[0-9+-\s]+$/i,
                    message:formatMessage(messages.account.phone_illegal)
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
              <FormItem {...formItemLayout} label={formatMessage(messages.account.email)}>
                {getFieldDecorator('mail', {
                  initialValue:edit_dto.mail,
                  rules: [
                    {
                      pattern:/^[A-Za-z0-9_]{1,64}@(\w+\.+\w+)+$/,
                      message:formatMessage(messages.account.email_illegal)
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
            </Form>
          </div>
        </Modal>
        :''}
    </div>
  );
}
export default injectIntl(Form.create()(ChangeAccount));
