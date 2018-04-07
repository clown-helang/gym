import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { injectIntl } from 'react-intl';
import TableUI from '../../../DefaultUI/TableUI';
import { routerRedux } from 'dva/router'
import { Divider } from 'antd'
import messages from './messages';

function MemberManageTable({ dispatch, memberManage, loading, intl: { formatMessage } }) {
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
      title: formatMessage(messages.phone),
      dataIndex: 'phone',
      key: 'phone',
      width: '20%',
    },
    {
      title: formatMessage(messages.balance),
      dataIndex: 'balance',
      key: 'balance',
      width: '20%',
    },
    {
      title: formatMessage(messages.operation),
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => {
        return (
          <span>
            <a className="table-btns" onClick={() => edit(record)}>{formatMessage(messages.edit)}</a>
            <Divider type="vertical" />
            <a className="table-btns" onClick={() => recharge(record)}>{formatMessage(messages.recharge)}</a>
            <Divider type="vertical" />
            <a className="table-btns" onClick={() => detail(record.id)}>{formatMessage(messages.detail)}</a>
          </span>
        );
      },
    },
  ];
  const edit = (record) => {
    dispatch({type:'memberManage/setEditData',payload:{ editData: record }});
    dispatch({type:'memberManage/setEditVisible',payload:{ editVisible: true }})
  };
  const recharge = (record) => {
    dispatch({type:'memberManage/setEditData',payload:{ editData: record }});
    dispatch({type:'memberManage/setRechargeVisible',payload:{ rechargeVisible: true }})
  };
  const detail = (id) => {
    dispatch(routerRedux.push({pathname: '/userManage/memberManage/memberDetail', query:{ id }}));
  };
  const rowKey = record => record.id;

  const pageFunction = {
    onChange(page, pageSize) {
      dispatch({ type: 'memberManage/getBIRLog', payload: { page_number: page, page_size: pageSize } });
    },
    onShowSizeChange(current, size) {
      dispatch({ type: 'memberManage/getBIRLog', payload: { page_number: current, page_size: size } });
    },
  };
  const tableOnChange = (pagination, filters, sorter) => {
    dispatch({ type: 'memberManage/getBIRLog', payload: { sort_property: sorter.field, sort_direction: sorter.order } });
  };

  const tableProps = {
    columns,
    data: memberManage.data,
    page_size: memberManage.page_size,
    rowKey,
    tableOnChange,
    pageFunction,
    currenPageNumber: memberManage.page_number,
    loading,
  };
  return (
    <TableUI {...tableProps} />
  );
}
MemberManageTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  memberManage: PropTypes.object.isRequired,
};

export default injectIntl(MemberManageTable);
