import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { injectIntl } from 'react-intl';
import TableUI from '../../../../DefaultUI/TableUI';
import RangePickerBar from '../../../../DefaultUI/RangePickerBar';
import { Button } from 'antd'
import messages from './messages';

function RechargeRecord({dispatch, memberDetail, loading, intl: { formatMessage } }) {
  const columns = [
    {
      title: formatMessage(messages.rechargeAmountWithUnit),
      dataIndex: 'rechargeAmount',
      key: 'rechargeAmount',
      width: '33%',
    },
    {
      title: formatMessage(messages.adminName),
      dataIndex: 'adminName',
      key: 'adminName',
      width: '33%',
    },
    {
      title: formatMessage(messages.rechargeTime),
      dataIndex: 'rechargeTime',
      key: 'rechargeTime',
      render: (text, record) => {
        return moment(record.rechargeTime).format('YYYY-MM-DD HH:mm:ss');
      },
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
    data: memberDetail.rechargeRecord,
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
RechargeRecord.propTypes = {
  dispatch: PropTypes.func.isRequired,
  memberDetail: PropTypes.object.isRequired,
};

export default injectIntl(RechargeRecord);
