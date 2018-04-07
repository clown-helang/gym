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
      dataIndex: 'courseName',
      key: 'courseName',
      width: '17%',
    },
    {
      title: formatMessage(messages.coachName),
      dataIndex: 'coachName',
      key: 'coachName',
      width: '17%',
    },
    {
      title: formatMessage(messages.lengthOfTime),
      dataIndex: 'lengthOfTime',
      key: 'lengthOfTime',
      width: '17%',
    },
    {
      title: formatMessage(messages.courseType),
      dataIndex: 'courseType',
      key: 'courseType',
      width: '16%',
      render: (text, record) => {
        return formatMessage(messages[text])
      }
    },
    {
      title: formatMessage(messages.payTime),
      dataIndex: 'payTime',
      key: 'payTime',
      width: '17%',
      render: (text, record) => {
        return moment(record.payTime).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: formatMessage(messages.coursePrice),
      dataIndex: 'coursePrice',
      key: 'coursePrice',
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
        <Col span={2}>{formatMessage(messages.account)}:</Col>
        <Col span={10}>{memberDetail.account}</Col>
        <Col span={2}>{formatMessage(messages.type)}:</Col>
        <Col span={10}>{formatMessage(messages[memberDetail.rule])}</Col>
      </Row>
      <Row style={{margin:'25px 5px'}}>
        <Col span={2}>{formatMessage(messages.name)}:</Col>
        <Col span={10}>{memberDetail.name}</Col>
        <Col span={2}>{formatMessage(messages.phone)}:</Col>
        <Col span={10}>{memberDetail.phone}</Col>
      </Row>
      <Row style={{margin:'25px 5px'}}>
        <Col span={2}>{formatMessage(messages.createTime)}:</Col>
        <Col span={10}>{memberDetail.createTime}</Col>
        <Col span={2}>{formatMessage(messages.balance)}:</Col>
        <Col span={10}>{memberDetail.balance}&nbsp;{formatMessage(messages.rechargeUnit)}</Col>
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
