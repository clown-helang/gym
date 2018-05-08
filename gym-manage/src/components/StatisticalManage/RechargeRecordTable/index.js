import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { injectIntl } from 'react-intl';
import TableUI from '../../DefaultUI/TableUI';
import messages from './messages';

function RechargeRecordTable({ dispatch, rechargeRecordQuery, loading, intl: { formatMessage } }) {
  const columns = [
    {
      title: formatMessage(messages.memberName),
      dataIndex: 'studentname',
      key: 'studentname',
      width: '20%',
    },
    {
      title: formatMessage(messages.rechargeAmountWithUnit),
      dataIndex: 'money',
      key: 'money',
      width: '20%',
    },
    {
      title: formatMessage(messages.salesMan),
      dataIndex: 'techername',
      key: 'techername',
      width: '20%',
    },
    {
      title: formatMessage(messages.adminName),
      dataIndex: 'adminname',
      key: 'adminname',
      width: '20%',
    },
    {
      title: formatMessage(messages.rechargeTime),
      dataIndex: 'time',
      key: 'time',
      render: (text, record) => {
        return text;
      },
    },
  ];
  const rowKey = record => record.id;

  const pageFunction = {
    onChange(page, pageSize) {
      dispatch({ type: 'rechargeRecordQuery/getBIRLog', payload: { page_number: page, page_size: pageSize } });
    },
    onShowSizeChange(current, size) {
      dispatch({ type: 'rechargeRecordQuery/getBIRLog', payload: { page_number: current, page_size: size } });
    },
  };
  const tableOnChange = (pagination, filters, sorter) => {
    dispatch({ type: 'rechargeRecordQuery/getBIRLog', payload: { sort_property: sorter.field, sort_direction: sorter.order } });
  };

  const tableProps = {
    columns,
    data: rechargeRecordQuery.data,
    page_size: rechargeRecordQuery.page_size,
    rowKey,
    tableOnChange,
    pageFunction,
    currenPageNumber: rechargeRecordQuery.page_number,
    loading,
  };
  return (
    <TableUI {...tableProps} />
  );
}
RechargeRecordTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  rechargeRecordQuery: PropTypes.object.isRequired,
};

export default injectIntl(RechargeRecordTable);
