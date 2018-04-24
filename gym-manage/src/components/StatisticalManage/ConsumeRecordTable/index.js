import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { injectIntl } from 'react-intl';
import TableUI from '../../DefaultUI/TableUI';
import messages from './messages';

function ConsumeRecordTable({ dispatch, consumeRecordQuery, loading, intl: { formatMessage } }) {
  const columns = [
    {
      title: formatMessage(messages.consumeAccount),
      dataIndex: 'account',
      key: 'account',
      width: '20%',
    },
    {
      title: formatMessage(messages.consumeAmount),
      dataIndex: 'rechargeAmount',
      key: 'rechargeAmount',
      width: '20%',
    },
    {
      title: formatMessage(messages.salesMan),
      dataIndex: 'coachName',
      key: 'coachName',
      width: '20%',
    },
    {
      title: formatMessage(messages.adminAccount),
      dataIndex: 'adminAccount',
      key: 'adminAccount',
      width: '20%',
    },
    {
      title: formatMessage(messages.consumeTime),
      dataIndex: 'rechargeTime',
      key: 'rechargeTime',
      render: (text, record) => {
        return moment(record.payTime).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  ];
  const rowKey = record => record.id;

  const pageFunction = {
    onChange(page, pageSize) {
      dispatch({ type: 'consumeRecordQuery/getBIRLog', payload: { page_number: page, page_size: pageSize } });
    },
    onShowSizeChange(current, size) {
      dispatch({ type: 'consumeRecordQuery/getBIRLog', payload: { page_number: current, page_size: size } });
    },
  };
  const tableOnChange = (pagination, filters, sorter) => {
    dispatch({ type: 'consumeRecordQuery/getBIRLog', payload: { sort_property: sorter.field, sort_direction: sorter.order } });
  };

  const tableProps = {
    columns,
    data: consumeRecordQuery.data,
    page_size: consumeRecordQuery.page_size,
    rowKey,
    tableOnChange,
    pageFunction,
    currenPageNumber: consumeRecordQuery.page_number,
    loading,
  };
  return (
    <TableUI {...tableProps} />
  );
}
ConsumeRecordTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  consumeRecordQuery: PropTypes.object.isRequired,
};

export default injectIntl(ConsumeRecordTable);
