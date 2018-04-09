import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { injectIntl } from 'react-intl';
import TableUI from '../../../DefaultUI/TableUI';
import RangePickerBar from '../../../DefaultUI/RangePickerBar';
import { Button } from 'antd'
import messages from './messages';

function ClassRecord({dispatch, coachKPIDetail, loading, intl: { formatMessage } }) {
  const columns = [
    {
      title: formatMessage(messages.courseName),
      dataIndex: 'courseName',
      key: 'courseName',
      width: '23%',
    },
    {
      title: formatMessage(messages.courseType),
      dataIndex: 'courseType',
      key: 'courseType',
      width: '23%',
      render: (text, record) => {
        return formatMessage(messages[text])
      }
    },
    {
      title: formatMessage(messages.appointmentMember),
      dataIndex: 'appointmentMember',
      key: 'appointmentMember',
      width: '23%',
    },
    {
      title: formatMessage(messages.classTime),
      dataIndex: 'classTime',
      key: 'classTime',
    },
  ];

  const rowKey = record => record.id;

  const pageFunction = {
    onChange(page, pageSize) {
      dispatch({ type: 'coachKPIDetail/getBIRLog', payload: { page_number: page, page_size: pageSize } });
    },
    onShowSizeChange(current, size) {
      dispatch({ type: 'coachKPIDetail/getBIRLog', payload: { page_number: current, page_size: size } });
    },
  };
  const tableOnChange = (pagination, filters, sorter) => {
    dispatch({ type: 'coachKPIDetail/getBIRLog', payload: { sort_property: sorter.field, sort_direction: sorter.order } });
  };

  const tableProps = {
    columns,
    data: coachKPIDetail.classRecord,
    page_size: coachKPIDetail.page_size,
    rowKey,
    tableOnChange,
    pageFunction,
    currenPageNumber: coachKPIDetail.page_number,
    loading,
  };
  return (
    <div style={{marginTop:-10}}>
      <div className="search-bar">
        <RangePickerBar
        valueName="search_value"
        title={formatMessage(messages.selectData)}
        value={coachKPIDetail.search_value}
        modalName="coachKPIDetail/setSearchValue"
        dispatch={dispatch}
        />
        <Button type="primary" icon="search" style={{marginLeft:20,position:'relative',top:5}}>{formatMessage(messages.search)}</Button>
      </div>
      <TableUI {...tableProps} />
    </div>
  );
}
ClassRecord.propTypes = {
  dispatch: PropTypes.func.isRequired,
  coachKPIDetail: PropTypes.object.isRequired,
};

export default injectIntl(ClassRecord);
