import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { injectIntl } from 'react-intl';
import TableUI from '../../DefaultUI/TableUI';
import messages from './messages';

function ClassRecordTable({ dispatch, classRecordQuery, loading, intl: { formatMessage } }) {
  const columns = [
    {
      title: formatMessage(messages.courseName),
      dataIndex: 'classname',
      key: 'classname',
      width: '20%',
    },
    {
      title: formatMessage(messages.courseType),
      dataIndex: 'classdefineid',
      key: 'classdefineid',
      width: '16%',
      render: (text, record) => {
        return text === '1'?formatMessage(messages.personalClass):formatMessage(messages.groupClass);
      },
    },
    {
      title: formatMessage(messages.coachName),
      dataIndex: 'classtecher',
      key: 'classtecher',
      width: '16%',
    },
    {
      title: formatMessage(messages.memberName),
      dataIndex: 'classstudent',
      key: 'classstudent',
      width: '16%',
    },
    {
      title: formatMessage(messages.classTime),
      dataIndex: 'classTime',
      key: 'classTime',
      render: (text, record) => {
        if(record.starttime&&record.endtime){
          return record.starttime + ' ~ ' + record.endtime;
        }
      },
    },
  ];
  const rowKey = record => record.id;

  const pageFunction = {
    onChange(page, pageSize) {
      dispatch({ type: 'classRecordQuery/getBIRLog', payload: { page_number: page, page_size: pageSize } });
    },
    onShowSizeChange(current, size) {
      dispatch({ type: 'classRecordQuery/getBIRLog', payload: { page_number: current, page_size: size } });
    },
  };
  const tableOnChange = (pagination, filters, sorter) => {
    dispatch({ type: 'classRecordQuery/getBIRLog', payload: { sort_property: sorter.field, sort_direction: sorter.order } });
  };

  const tableProps = {
    columns,
    data: classRecordQuery.data,
    page_size: classRecordQuery.page_size,
    rowKey,
    tableOnChange,
    pageFunction,
    currenPageNumber: classRecordQuery.page_number,
    loading,
  };
  return (
    <TableUI {...tableProps} />
  );
}
ClassRecordTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classRecordQuery: PropTypes.object.isRequired,
};

export default injectIntl(ClassRecordTable);
