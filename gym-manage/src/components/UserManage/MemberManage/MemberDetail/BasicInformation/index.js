import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { injectIntl } from 'react-intl';
import TableUI from '../../../../DefaultUI/TableUI';
import { Row, Col } from 'antd'
import messages from './messages';

function BasicInformation({ memberDetail, loading, intl: { formatMessage } }) {
  const columns = [
    {
      title: formatMessage(messages.courseName),
      dataIndex: 'classname',
      key: 'classname',
      width: '17%',
    },
    {
      title: formatMessage(messages.coachName),
      dataIndex: 'techername',
      key: 'techername',
      width: '17%',
    },
    {
      title: formatMessage(messages.lengthOfTime),
      dataIndex: 'allclasssize',
      key: 'allclasssize',
      width: '17%',
    },
    {
      title: formatMessage(messages.courseType),
      dataIndex: 'type',
      key: 'type',
      width: '16%',
      render: (text, record) => {
        return text === '1'?formatMessage(messages.personalClass):formatMessage(messages.groupClass);
      },
    },
    {
      title: formatMessage(messages.payTime),
      dataIndex: 'shoptime',
      key: 'shoptime',
      width: '17%',
    },
    {
      title: formatMessage(messages.coursePrice),
      dataIndex: 'money',
      key: 'money',
    },
  ];
  const rowKey = record => record.id;
  const tableProps = {
    columns,
    data: memberDetail.ownCourse,
    rowKey,
    loading,
  };

  return (
    <div style={{fontSize:16}}>
      <Row style={{margin:'10px 5px 20px'}}>
        <Col span={2}>{formatMessage(messages.name)}:</Col>
        <Col span={10}>{memberDetail.realname}</Col>
        <Col span={2}>{formatMessage(messages.type)}:</Col>
        <Col span={10}>{memberDetail.usertype==='3'?formatMessage(messages.member):''}</Col>
      </Row>
      <Row style={{margin:'25px 5px'}}>
        <Col span={2}>{formatMessage(messages.phone)}:</Col>
        <Col span={10}>{memberDetail.phone}</Col>
        <Col span={2}>{formatMessage(messages.balance)}:</Col>
        <Col span={10}>{memberDetail.money}&nbsp;{formatMessage(messages.rechargeUnit)}</Col>
      </Row>
      <Row style={{margin:'25px 5px'}}>
        <Col span={2}>{formatMessage(messages.vipClass)}:</Col>
        <Col span={10}>{memberDetail.vipclass}</Col>
      </Row>
      <Row style={{margin:'25px 5px'}}>
        <Col span={2}>{formatMessage(messages.ownCourse)}:</Col>
      </Row>
      <TableUI {...tableProps} />
    </div>
  );
}
BasicInformation.propTypes = {
  memberDetail: PropTypes.object.isRequired,
};

export default injectIntl(BasicInformation);
