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

function EditUserCourseCoach({ dispatch, userCourseManage, loading, form, intl: { formatMessage } }) {
  const { validateFields, getFieldDecorator } = form;
  const loadingState = loading.effects['userCourseManage/getCoaches'] || false;

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        dispatch({type:'userCourseManage/changeUserCourseCoach', payload:{techerid:values.techerid} })
      }
    });
  };

  const onCancel = () => {
    dispatch({type:'userCourseManage/setVisible', payload:{ visible: false }})
  }

  return (
    <div>
      <Modal
        title= "修改教练"
        visible={userCourseManage.visible}
        onOk={handleSubmit}
        onCancel={onCancel}
        confirmLoading={loadingState}
      >
        <Spin spinning = {loadingState}>
          <div style={{ paddingTop: 20, width: '100%' }}>
            <Form layout="horizontal">
              <FormItem {...formHttpItemLayout} label="选择教练">
                {getFieldDecorator('techerid', {
                  initialValue: userCourseManage.changeUserCourse.techerid,
                })( <Select style={{ width: '100%' }}>
                  {
                    userCourseManage.coaches.map((item,index) => (
                      <Option value={item.id} key={index}>{item.realname}</Option>
                    ))
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

export default Form.create()(injectIntl(EditUserCourseCoach));
