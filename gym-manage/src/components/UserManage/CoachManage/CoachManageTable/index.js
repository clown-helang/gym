import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { routerRedux } from 'dva/router';
import TableUI from '../../../DefaultUI/TableUI';
import messages from './messages';

function CoachManageTable({ dispatch, coachManage, loading, intl: { formatMessage } }) {
  const columns = [
    {
      title: formatMessage(messages.account),
      dataIndex: 'loginname',
      key: 'loginname',
      width: '25%',
    },
    {
      title: formatMessage(messages.name),
      dataIndex: 'realname',
      key: 'realname',
      width: '25%',
    },
    {
      title: formatMessage(messages.phone),
      dataIndex: 'phone',
      key: 'phone',
      width: '25%',
    },
    {
      title: formatMessage(messages.operation),
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => {
        return (
          <span>
            <a className="table-btns" onClick={() => edit(record.id)}>{formatMessage(messages.edit)}</a>
          </span>
        );
      },
    },
  ];
  const edit = (id) => {
    dispatch(routerRedux.push({pathname: '/userManage/coachManage/edit', query:{ id }}));
  };

  const rowKey = record => record.id;

  const pageFunction = {
    onChange(page, pageSize) {
      dispatch({ type: 'coachManage/getBIRLog', payload: { page_number: page, page_size: pageSize } });
    },
    onShowSizeChange(current, size) {
      dispatch({ type: 'coachManage/getBIRLog', payload: { page_number: current, page_size: size } });
    },
  };
  const tableOnChange = (pagination, filters, sorter) => {
    dispatch({ type: 'coachManage/getBIRLog', payload: { sort_property: sorter.field, sort_direction: sorter.order } });
  };

  const tableProps = {
    columns,
    data: coachManage.data,
    page_size: coachManage.page_size,
    rowKey,
    tableOnChange,
    pageFunction,
    currenPageNumber: coachManage.page_number,
    loading,
  };
  return (
    <TableUI {...tableProps} />
  );
}
CoachManageTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  coachManage: PropTypes.object.isRequired,
};

export default injectIntl(CoachManageTable);
