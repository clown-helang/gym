import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { injectIntl } from 'react-intl';
import TableUI from '../../../../DefaultUI/TableUI';
import RangePickerBar from '../../../../DefaultUI/RangePickerBar';
import { Button } from 'antd'
import messages from './messages';

function ClassRecord({dispatch, memberDetail, loading, intl: { formatMessage } }) {
  const columns = [
    {
      title: formatMessage(messages.courseName),
      dataIndex: 'courseName',
      key: 'courseName',
      width: '25%',
    },
    {
      title: formatMessage(messages.coachName),
      dataIndex: 'coachName',
      key: 'coachName',
      width: '25%',
    },
    {
      title: formatMessage(messages.courseType),
      dataIndex: 'courseType',
      key: 'courseType',
      width: '25%',
      render: (text, record) => {
        return formatMessage(messages[text])
      }
    },
    {
      title: formatMessage(messages.classTime),
      dataIndex: 'classTime',
      key: 'classTime',
      width: '20%',
    },
  ];

  const rowKey = record => record.id;

  const pageFunction = {
    onChange(page, pageSize) {
      dispatch({ type: 'memberDetail/getBIRLog', payload: { page_number: page, page_size: pageSize } });
    },
    onShowSizeChange(current, size) {
      dispatch({ type: 'memberDetail/getBIRLog', payload: { page_number: current, page_size: size } });
    },
  };
  const tableOnChange = (pagination, filters, sorter) => {
    dispatch({ type: 'memberDetail/getBIRLog', payload: { sort_property: sorter.field, sort_direction: sorter.order } });
  };

  const tableProps = {
    columns,
    data: memberDetail.classRecord,
    page_size: memberDetail.page_size,
    rowKey,
    tableOnChange,
    pageFunction,
    currenPageNumber: memberDetail.page_number,
    loading,
  };
  return (
    <div style={{marginTop:-10}}>
      <div className="search-bar">
        <RangePickerBar
        valueName="search_value"
        title={formatMessage(messages.selectData)}
        value={memberDetail.search_value}
        modalName="memberDetail/setSearchValue"
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
  memberDetail: PropTypes.object.isRequired,
};

export default injectIntl(ClassRecord);
