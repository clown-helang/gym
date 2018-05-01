import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { injectIntl } from 'react-intl';
import TableUI from '../../../DefaultUI/TableUI';
import { Divider } from 'antd'
import messages from './messages';

function AdminManageTable({ dispatch, adminManage, loading, intl: { formatMessage } }) {
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
            <a className="table-btns" onClick={() => edit(record)}>{formatMessage(messages.edit)}</a>
          </span>
        );
      },
    },
  ];
  const edit = (record) => {
    dispatch({type:'adminManage/setEditData',payload:{ editData: record }});
    dispatch({type:'adminManage/setVisible',payload:{ visible: true }})
  };

  const rowKey = record => record.id;

  const pageFunction = {
    onChange(page, pageSize) {
      dispatch({ type: 'adminManage/getBIRLog', payload: { page_number: page, page_size: pageSize } });
    },
    onShowSizeChange(current, size) {
      dispatch({ type: 'adminManage/getBIRLog', payload: { page_number: current, page_size: size } });
    },
  };
  const tableOnChange = (pagination, filters, sorter) => {
    dispatch({ type: 'adminManage/getBIRLog', payload: { sort_property: sorter.field, sort_direction: sorter.order } });
  };

  const tableProps = {
    columns,
    data: adminManage.data,
    page_size: adminManage.page_size,
    rowKey,
    tableOnChange,
    pageFunction,
    currenPageNumber: adminManage.page_number,
    loading,
  };
  return (
    <TableUI {...tableProps} />
  );
}
AdminManageTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  adminManage: PropTypes.object.isRequired,
};

export default injectIntl(AdminManageTable);
