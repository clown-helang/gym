import React from 'react';
import { routerRedux } from 'dva/router'
import { injectIntl } from 'react-intl';
import { Form, Button, Col, Row, Input, Select, Icon, Radio,DatePicker, InputNumber } from 'antd';
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
  const { introduce, model } = addCourseManage;
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        const { coachList } = addCourseManage;
        console.log('values---',values)
        let postData = {
          classname: values.classname,
          iscommend: values.iscommend,
          isshop: '2',
          classmoney: values.classmoney,
          classtecher:[],
          classsize: values.classsize,
          introduce: [],
          type: values.type,
          classimg:[]
        }

        if(values.classimg.length>0){
          if(values.classimg[0].response){
            postData.classimg = JSON.stringify([{
              resource_url: values.classimg[0].response.successful_files[0].resource_url,
              original_name: values.classimg[0].name
            }])
          } else{
            postData.classimg = JSON.stringify(values.classimg)
          }
        }
        if(coachList.contents){
          coachList.contents.map(item => {
            postData.classtecher.push(`${item.id}:${item.realname}`)
          })
        }
        values.keys.map(item=>{
          let _resource_url = '',_name= '';
          if(values[`resource_url_${item.key}`].length>0){
            if(values[`resource_url_${item.key}`][0].response){
              _resource_url = values[`resource_url_${item.key}`][0].response.successful_files[0].resource_url;
              _name = values[`resource_url_${item.key}`][0].name;
            }else{
              _resource_url = values[`resource_url_${item.key}`][0].resource_url;
              _name = values[`resource_url_${item.key}`][0].name;
            }
          }
          postData.introduce.push({
            description: values[`description_${item.key}`],
            resource_url: _resource_url,
            original_name:_name
          })
        })
        postData.introduce = JSON.stringify(postData.introduce)
        console.log('postData--',postData)
        if(model==='add'){
          dispatch({type:'addCourseManage/addNewCourse', payload:{ postData }})
        } else{
          dispatch({type:'addCourseManage/editCourse', payload:{ postData }})
        }
      }
    });
  };
  const handleCancel = () => {
    dispatch(routerRedux.push({ pathname: '/courseManage'}))
  };
  const columns = [
    {
      title: formatMessage(messages.coachName),
      dataIndex: 'realname',
      key: 'realname',
      width: '50%'
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
    const _coachList = addCourseManage.coachList.contents.filter(item => parseInt(item.id) !== parseInt(id));
    dispatch({type:"addCourseManage/setCoachList", payload:{ coachList: {total:_coachList.length,contents:_coachList} }})
  };
  const rowKey = record => record.id;
  const tableProps = {
    columns,
    data: addCourseManage.coachList,
    rowKey,
    loading: loading.models.addCourseManage,
  };
  const addCoach = () =>{
    dispatch({type:"addCourseManage/getCoaches"})
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
    fieldValue['keys'] = keys.concat({
      key: ++uuid,
      resource_url: '',
      description: ''
    });
    setFieldsValue(fieldValue);
  };
  introduce.map(item=>{
    if(!item.key){
      item.key = ++uuid;
    }
  });
  getFieldDecorator('keys', { initialValue: introduce });
  const keys = getFieldValue('keys');
  const formItems = keys.map((k, index) => {
    return (
      <div key={k.key} className={styles.formItems}>
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
          <div style={{width:'75%'}}>
            {getFieldDecorator(`resource_url_${k.key}`, {
              initialValue: k.resource_url!==''? [{resource_url:k.resource_url,original_name:k.original_name}]: '',
            })(<UploadFile target="ClassIntroduce"/>)}
          </div>
        </FormItem>
      </div>
    );
  });

  return (
    <div style={{marginTop:20,marginLeft:20}}>
      <Form onSubmit={handleSubmit}>
        <FormItem {...formItemLayout} label={formatMessage(messages.courseName)}>
          {getFieldDecorator('classname', {
            initialValue: addCourseManage.classname||'',
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
          {getFieldDecorator('classimg', {
            initialValue: addCourseManage.classimg,
          })(<UploadFile target="ClassBg"/>)}
        </FormItem>

        {formItems}

        <Row style={{marginBottom: 24}}>
          <Col xl={{ span: 10, offset: 4 }} xxl={{ span: 6, offset: 3 }}>
            <Button onClick={add} type="dashed" style={{width: '100%'}}>+&nbsp;{formatMessage(messages.addCourseDescription)}</Button>
          </Col>
        </Row>
        <FormItem {...formItemLayout} label={formatMessage(messages.courseType)}>
          {getFieldDecorator('type', {
            initialValue: addCourseManage.type||'',
            rules: [
              {
                required: true,
                message: formatMessage(messages.notNull).replace('***',formatMessage(messages.courseType))
              }
            ],
          })(<RadioGroup>
            <Radio value='1'>{formatMessage(messages.groupClass)}</Radio>
            <Radio value='2'>{formatMessage(messages.personalClass)}</Radio>
          </RadioGroup>)}
        </FormItem>
        <FormItem {...formItemLayout} label={formatMessage(messages.recommendCourse)}>
          {getFieldDecorator('iscommend', {
            initialValue: addCourseManage.iscommend,
            rules: [
              {
                required: true,
                message: formatMessage(messages.notNull).replace('***',formatMessage(messages.recommendCourse))
              }
            ],
          })(<RadioGroup>
            <Radio value='1'>{formatMessage(messages.yes)}</Radio>
            <Radio value='0'>{formatMessage(messages.no)}</Radio>
          </RadioGroup>)}
        </FormItem>
        <FormItem {...formItemLayout} label={formatMessage(messages.classTime)}>
          {getFieldDecorator('classsize', {
            initialValue: addCourseManage.classsize||'',
            rules: [
              {
                required: true,
                message: formatMessage(messages.notNull).replace('***',formatMessage(messages.classTime))
              }
            ],
          })(<InputNumber />)}
          <span className="ant-form-text">{formatMessage(messages.timeUnit)}</span>
        </FormItem>
        <FormItem {...formItemLayout} label={formatMessage(messages.coursePriceNotUnit)}>
          {getFieldDecorator('classmoney', {
            initialValue: addCourseManage.classmoney||'',
            rules: [
              {
                required: true,
                message: formatMessage(messages.notNull).replace('***',formatMessage(messages.coursePriceNotUnit))
              }
            ],
          })(<InputNumber />)}
          <span className="ant-form-text">{formatMessage(messages.priceUnit)}</span>
        </FormItem>
        <FormItem {...formItemLayout} label={formatMessage(messages.selectCoach)}>
          {getFieldDecorator('selectCoach', {
            initialValue: addCourseManage.selectCoach||'',
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

      <CoachTable addCourseManage={addCourseManage} dispatch={dispatch} loading={loading.models.addCourseManage}/>
    </div>
  );
}

export default Form.create()(injectIntl(AddCourseForm));
