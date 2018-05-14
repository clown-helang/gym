import React from 'react'
import { Modal, Button, Form, Input, Icon } from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import { getSession,get_length, cut_str, CheckPhone,getBytes } from '../../utils';
import { changePasswd } from '../../services/gymServices'
import md5 from 'md5';
import messages from './messages';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {span: 6 },
  wrapperCol: { span: 14 },
};

function ChangePasswd({visible, setVisible, setLoadingState, loading, form: { setFieldsValue, setFields, getFieldValue, getFieldDecorator, validateFieldsAndScroll}, intl: { formatMessage }}) {
  const handleOk = (e) => {
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        setLoadingState(true);
        const payload={
          id: getSession('user_id'),
          token: getSession('token'),
          oldpassword: md5(getBytes(values.original_password)),
          newpassword: md5(getBytes(values.new_password))
        };
        changePasswd({payload}).then((body) => {
          setLoadingState(false);
          console.log('body---',body)
          if(body.code&&body.code.toString() === '10333'){
            Modal.warning({
              title: appLocale.messages["10333"],
              onOk: () => {
              }
            });
          }
          if(body.state&&body.state==="success"){
            Modal.success({
              title: appLocale.messages["common.changePasswd.changePwdSuccess"],
              onOk: () => {
              }
            });
            setVisible(false);
          }
        },(res) => {
          setLoadingState(false);
          if(res instanceof TypeError){
            Modal.error({
              title: appLocale.messages["commom.Error.nologin.title"],
              content: appLocale.messages["commom.Error.nologin.content"],
              okText:appLocale.messages["common.BaseUI.button.okText"],
              onOk: () => {
                localStorage.clear();
                location.href="/";
              }
            });
          }else{
            const errorResult = appLocale.messages[res];
            Modal.error({title:appLocale.messages.error,content:errorResult?errorResult:res});
          }
        })
      }
    });
  };
  const checkPassword = (rule, value, callback) => {
    const new_password = getFieldValue('new_password');
    const confirmPassword = getFieldValue('confirmPassword');
    if(rule.field==='confirmPassword'){
      if (value && new_password && value !== new_password) {
        if(new_password.length>=6&&new_password.length<=12){
          setFields({
            new_password: {
              value: new_password,
              errors: [formatMessage(messages.password.passwordnotsame)],
            }
          })
        }else{
          setFields({
            new_password: {
              value: new_password,
              errors: [formatMessage(messages.password.password_illegal),formatMessage(messages.password.passwordnotsame)],
            }
          })
        }
        callback(formatMessage(messages.password.passwordnotsame));
      }else if(value && new_password && value === new_password){
        if(new_password.length>=6&&new_password.length<=12){
          setFieldsValue({
            new_password: new_password,
          });
        }else{
          setFields({
            new_password: {
              value: new_password,
              errors: [formatMessage(messages.password.password_illegal)],
            }
          })
        }
        callback();
      } else {
        callback();
      }
    }else if(rule.field==='new_password'){
      if (value && confirmPassword && value !== confirmPassword) {
        if(confirmPassword.length>=6&&confirmPassword.length<=12){
          setFields({
            confirmPassword: {
              value: confirmPassword,
              errors: [formatMessage(messages.password.passwordnotsame)],
            }
          })
        }else{
          setFields({
            confirmPassword: {
              value: confirmPassword,
              errors: [formatMessage(messages.password.password_illegal),formatMessage(messages.password.passwordnotsame)],
            }
          })
        }
        callback(formatMessage(messages.password.passwordnotsame));
      }
      else if(value && confirmPassword && value === confirmPassword){
        if(confirmPassword.length>=6&&confirmPassword.length<=12){
          setFieldsValue({
            confirmPassword: confirmPassword,
          });
        }else{
          setFields({
            confirmPassword: {
              value: confirmPassword,
              errors: [formatMessage(messages.password.password_illegal)],
            }
          })
        }
      }
      callback();
    }else {
      callback();
    }
  };
  const handleCancel = (e) => {
    setVisible(false);
  };

  return (
    <div>
      {visible ?
        <Modal
          title={formatMessage(messages.password.title)}
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          confirmLoading={loading}
        >
          <div>
            <Form layout='horizontal'>
              <FormItem {...formItemLayout} label={formatMessage(messages.password.oldpasswordlabel)}>
                {getFieldDecorator('original_password', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage(messages.password.oldpassword)
                    }
                  ]
                })(<Input type="password" />)}
              </FormItem>
              <FormItem {...formItemLayout} label={formatMessage(messages.password.newpasswdlabel)}>
                {getFieldDecorator('new_password', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage(messages.password.label)
                    },
                    {
                      pattern:/^[a-z0-9]+$/i,
                      message:formatMessage(messages.password.newpassword_illegal)
                    },
                    {
                      min:6,
                      max:12,
                      message:formatMessage(messages.password.password_illegal)
                    },
                    {
                      validator: checkPassword
                    }
                  ]
                })(<Input type="password"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label={formatMessage(messages.password.confirmppasswdlabel)}>
                {getFieldDecorator('confirmPassword', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage(messages.password.confirmpassword)
                    },
                    {
                      min:6,
                      max:12,
                      message:formatMessage(messages.password.password_illegal)
                    },
                    {
                      validator: checkPassword
                    }
                  ]
                })(<Input type="password" />)}
              </FormItem>
            </Form>
          </div>
        </Modal>
        :''}
    </div>
  );

}
export default injectIntl(Form.create()(ChangePasswd));
