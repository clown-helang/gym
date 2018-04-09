import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { routerRedux } from 'dva/router';
import TableUI from '../../DefaultUI/TableUI';
import messages from './messages';

function CoachKPITable({ dispatch, coachKPIQuery, loading, intl: { formatMessage } }) {
  const columns = [
    {
      title: formatMessage(messages.account),
      dataIndex: 'account',
      key: 'account',
      width: '20%',
    },
    {
      title: formatMessage(messages.name),
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: formatMessage(messages.durationOfClass),
      dataIndex: 'durationOfClass',
      key: 'durationOfClass',
      width: '20%',
    },
    {
      title: formatMessage(messages.salesTotal),
      dataIndex: 'salesTotal',
      key: 'salesTotal',
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
    dispatch(routerRedux.push({pathname: '/statisticalManage/coachKPIQuery/detail', query:{ id }}));
  };

  const rowKey = record => record.id;

  const pageFunction = {
    onChange(page, pageSize) {
      dispatch({ type: 'coachKPIQuery/getBIRLog', payload: { page_number: page, page_size: pageSize } });
    },
    onShowSizeChange(current, size) {
      dispatch({ type: 'coachKPIQuery/getBIRLog', payload: { page_number: current, page_size: size } });
    },
  };
  const tableOnChange = (pagination, filters, sorter) => {
    dispatch({ type: 'coachKPIQuery/getBIRLog', payload: { sort_property: sorter.field, sort_direction: sorter.order } });
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
