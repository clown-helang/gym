import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { injectIntl } from 'react-intl';
import TableUI from '../../DefaultUI/TableUI';
import messages from './messages';

function ConsumeRecordTable({ dispatch, consumeRecordQuery, loading, intl: { formatMessage } }) {
  const columns = [
    {
      title: formatMessage(messages.memberName),
      dataIndex: 'studentname',
      key: 'studentname',
      width: '25%',
    },
    {
      title: formatMessage(messages.consumeAmount),
      dataIndex: 'money',
      key: 'money',
      width: '25%',
    },
    {
      title: formatMessage(messages.salesMan),
      dataIndex: 'techername',
      key: 'techername',
      width: '25%',
    },
    {
      title: formatMessage(messages.consumeTime),
      dataIndex: 'shoptime',
      key: 'shoptime',
      render: (text, record) => {
        return text;
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
