import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {Button, Row, Form, Input, Icon, Spin, AutoComplete} from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import messages from './messages';
import styles from './login.less';

const FormItem = Form.Item;

class Login extends React.Component{
   state = {
      dataSource: [],
   }
   handleOk = ()=> {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      this.props.dispatch({type: 'login/login', payload: values});
    })
  }
  handleChange = (value) => {
    this.setState({
      dataSource: !value || value.indexOf('@') >= 0 ? [] : [
          `${value}@startimes.com.cn`,
          `${value}@qq.com`,
          `${value}@163.com`,
          `${value}@126.com`,
          `${value}@gmail.com`,
        ],
    });
  }
  render(){
    const {login,loading, form: {getFieldDecorator}, intl: { formatMessage }} = this.props;
    const loginLoading = loading.effects['login/login']===undefined
      ? false
      : loading.effects['login/login'];
    return (
      <div className={styles.login_content} >
        <div className={styles.login_header} >
          <div className={styles.login_title}>
            <div className={styles.login_logo}>
              <img src={require('../../assets/logo.png')} alt=""/>
            </div>
            <h2>{ window.baseConfig.systemName[`${window.appLocale.language}`] }</h2>
          </div>
        </div>
        <div className={styles.login_body} >
          <div className={styles.body_form}>
            <Spin spinning={loginLoading}>
              <div className={styles.login_title}>
                <FormattedMessage {...messages.login}/>
              </div>
              <div className={styles.login_form}>
                <Form layout='horizontal'>
                  <FormItem>
                    {getFieldDecorator('loginname', {
                      rules: [
                        {
                          required: true,
                          message: formatMessage(messages.username.vtype)
                        }
                      ]
                    })(<AutoComplete dataSource={this.state.dataSource} onChange={this.handleChange} placeholder={formatMessage(messages.username.label)} className={styles.auto_input} onPressEnter={this.handleOk}/>)}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          required: true,
                          message: formatMessage(messages.password.vtype)
                        }
                      ]
                    })(<Input type="password" autoComplete="off" placeholder={formatMessage(messages.password.label)} className={styles.login_input} onPressEnter={this.handleOk}/>)}
                  </FormItem>
                  <FormItem>
                    <div className={styles.login_btn_div}>
                      <Button type="primary" className={styles.login_btn} onClick={this.handleOk}>
                        <FormattedMessage {...messages.login}/>
                      </Button>
                    </div>
                  </FormItem>
                </Form>
              </div>
            </Spin>
          </div>
          <img src={require('../../assets/login.jpg')} className={styles.login_bg} />
        </div>
        <div className={styles.login_footer} >
          <div className={styles.footer_title}>{window.appLocale.messages.company}</div>
          <div className={styles.footer_copyright}>CopyRight© 2018 FitnessClub All Right Reserved </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  intl: PropTypes.object,
  login: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps(state) {
  return {
    login:state.login,
    loading: state.loading
  }
}

export default injectIntl(connect(mapStateToProps)(Form.create()(Login)))
