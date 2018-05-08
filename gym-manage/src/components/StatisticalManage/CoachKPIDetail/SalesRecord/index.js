import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { injectIntl } from 'react-intl';
import TableUI from '../../../DefaultUI/TableUI';
import RangePickerBar from '../../../DefaultUI/RangePickerBar';
import { Button } from 'antd'
import messages from './messages';

function RechargeRecord({dispatch, coachKPIDetail, loading, intl: { formatMessage } }) {
  const columns = [
    {
      title: formatMessage(messages.memberName),
      dataIndex: 'studentname',
      key: 'studentname',
      width: '25%',
    },
    {
      title: formatMessage(messages.rechargeAmountWithUnit),
      dataIndex: 'money',
      key: 'money',
      width: '25%',
    },
    {
      title: formatMessage(messages.adminName),
      dataIndex: 'adminname',
      key: 'adminname',
      width: '25%',
    },
    {
      title: formatMessage(messages.rechargeTime),
      dataIndex: 'time',
      key: 'time',
    },
  ];
  const search = () => {
    dispatch({ type: 'coachKPIDetail/getRechargeRecord' });
  }
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
    data: coachKPIDetail.salesRecord,
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
          valueName="timeRange"
          title={formatMessage(messages.selectData)}
          value={[coachKPIDetail.salesStartTime,coachKPIDetail.salesEndTime]}
          modalName="coachKPIDetail/setSalesRangeTime"
          dispatch={dispatch}
        />
        <Button type="primary" onClick={search} icon="search" style={{marginLeft:20,position:'relative',top:5}}>{formatMessage(messages.search)}</Button>
      </div>
      <TableUI {...tableProps} />
    </div>
  );
}
RechargeRecord.propTypes = {
  dispatch: PropTypes.func.isRequired,
  coachKPIDetail: PropTypes.object.isRequired,
};

export default injectIntl(RechargeRecord);
