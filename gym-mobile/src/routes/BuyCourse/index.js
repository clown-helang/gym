import React from 'react'
import { connect } from 'dva';
import { Select, Row, Col, Icon } from 'antd';
import TX from '../../assets/touxiang.jpg'
import styles from './index.less'
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'
import yujia from '../../assets/yujia.jpg'

const Option = Select.Option;

function BuyCourse({dispatch,buyCourse}) {
  const course = {
    url: yujia,
    name: '团体瑜伽课30节 ',
    oldPrice: 2000,
    vipPrice: 1888,
  };
  const menu = {
    icon:'bank',
    title:`购买课程 —— 订单详情`
  };
  const user = {
    name:'彭于晏',
    photo: TX
  };
  const coachList = [{
      label: '波波维奇',
      value: '1',
    },
    {
      label: '麦克海尔',
      value: '2',
    }
  ];
  const handleChange = (value) => {
    console.log(value)
  };

  return (
    <div>
      <Header dispatch={dispatch} user={user}/>
      <MenuBar menu={menu}/>
      <div className={styles.courseLogo}>
        <img src={course.url}/>
      </div>
      <div className={styles.orderDetail}>
        <Row>
          <Col span={8}>课程名称：</Col>
          <Col span={16}>团体瑜伽课</Col>
        </Row>
        <Row>
          <Col span={8}>课程教练：</Col>
          <Col span={16}>
            <Select defaultValue="lucy" style={{ width: '70%' }} onChange={handleChange}>
              <Option value="jack">波波维奇</Option>
              <Option value="lucy">麦克海尔</Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={8}>课程时长：</Col>
          <Col span={16}>60 小时</Col>
        </Row>
        <Row>
          <Col span={8}>课程类型：</Col>
          <Col span={16}>团体课（20人）</Col>
        </Row>
        <Row>
          <Col span={8}>授课时间：</Col>
          <Col span={16}>2017.3.1 ~ 2017.4.1</Col>
        </Row>
        <div className={styles.coursePrice}>
          <span>VIP ￥ 1188</span>
          <span>原价 ￥ 2000</span>
        </div>
      </div>
      <div className={styles.buyButton}>
        <span>提交订单</span>
      </div>
    </div>
  )
}
function mapStateToProps({ buyCourse }) {
  return { buyCourse };
}
export default connect(mapStateToProps)(BuyCourse);
