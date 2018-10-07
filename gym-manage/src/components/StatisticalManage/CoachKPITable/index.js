import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { routerRedux } from 'dva/router';
import TableUI from '../../DefaultUI/TableUI';
import messages from './messages';

function CoachKPITable({ dispatch, coachKPIQuery, loading, intl: { formatMessage } }) {
  const columns = [
    {
      title: formatMessage(messages.name),
      dataIndex: 'realname',
      key: 'realname',
      width: '20%',
    },
    {
      title: formatMessage(messages.groupDurationOfClass),
      dataIndex: 'onetomanymanyclasssum',
      key: 'onetomanymanyclasssum',
      width: '20%',
    },
    {
      title: formatMessage(messages.personalDurationOfClass),
      dataIndex: 'onetooneclasssum',
      key: 'onetooneclasssum',
      width: '20%',
    },
    {
      title: formatMessage(messages.salesTotal),
      dataIndex: 'rechargsum',
      key: 'rechargsum',
      width: '20%',
    },
    {
      title: formatMessage(messages.operation),
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => {
        return (
          <span>
            <a className="table-btns" onClick={() => detail(record.id)}>{formatMessage(messages.detail)}</a>
          </span>
        );
      },
    },
  ];
  const detail = (id) => {
    console.log('id',id)
    dispatch(routerRedux.push({pathname: '/statisticalManage/coachKPIQuery/detail', query:{ id }}));
  };

  const rowKey = record => record.id;

  const pageFunction = {
    onChange(page, pageSize) {
      dispatch({ type: 'coachKPIQuery/getCoachKPI', payload: { page_number: page, page_size: pageSize } });
    },
    onShowSizeChange(current, size) {
      dispatch({ type: 'coachKPIQuery/getCoachKPI', payload: { page_number: current, page_size: size } });
    },
  };
  const tableOnChange = (pagination, filters, sorter) => {
    dispatch({ type: 'coachKPIQuery/getCoachKPI', payload: { sort_property: sorter.field, sort_direction: sorter.order } });
  };

  const tableProps = {
    columns,
    data: coachKPIQuery.data,
    page_size: coachKPIQuery.page_size,
    rowKey,
    tableOnChange,
    pageFunction,
    currenPageNumber: coachKPIQuery.page_number,
    loading,
  };
  return (
    <TableUI {...tableProps} />
  );
}
CoachKPITable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  coachKPIQuery: PropTypes.object.isRequired,
};

export default injectIntl(CoachKPITable);
