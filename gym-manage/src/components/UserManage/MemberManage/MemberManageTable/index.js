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
      dataIndex: 'loginname',
      key: 'loginname',
      width: '17%',
    },
    {
      title: formatMessage(messages.name),
      dataIndex: 'realname',
      key: 'realname',
      width: '17%',
    },
    {
      title: formatMessage(messages.phone),
      dataIndex: 'phone',
      key: 'phone',
      width: '17%',
    },
    {
      title: formatMessage(messages.balance),
      dataIndex: 'money',
      key: 'money',
      width: '17%',
    },
    {
      title: formatMessage(messages.vipClass),
      dataIndex: 'vipclass',
      key: 'vipclass',
      width: '17%',
    },
    {
      title: formatMessage(messages.operation),
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => {
        return (
          <span>
            <a className="table-btns" onClick={() => edit(record.id)}>{formatMessage(messages.edit)}</a>
            <Divider type="vertical" />
            <a className="table-btns" onClick={() => recharge(record)}>{formatMessage(messages.recharge)}</a>
            <Divider type="vertical" />
            <a className="table-btns" onClick={() => detail(record.id)}>{formatMessage(messages.detail)}</a>
          </span>
        );
      },
    },
  ];
  const edit = (id) => {
    dispatch({type:'memberManage/getMembersById',payload:{ id }});
    dispatch({type:'memberManage/setEditVisible',payload:{ editVisible: true }})
  };
  const recharge = (record) => {
    dispatch({type:'memberManage/setMemberInformation',payload:{ memberId:record.id, memberAccount:record.loginname, memberName:record.realname }});
    dispatch({type:'memberManage/getCoaches'})
    dispatch({type:'memberManage/setRechargeVisible',payload:{ rechargeVisible: true }})
  };
  const detail = (id) => {
    dispatch(routerRedux.push({pathname: '/userManage/memberManage/memberDetail', query:{ id }}));
  };
  const rowKey = record => record.id;

  const pageFunction = {
    onChange(page, pageSize) {
      dispatch({ type: 'memberManage/getMembers', payload: { page_number: page, page_size: pageSize } });
    },
    onShowSizeChange(current, size) {
      dispatch({ type: 'memberManage/getMembers', payload: { page_number: current, page_size: size } });
    },
  };
  const tableOnChange = (pagination, filters, sorter) => {
    dispatch({ type: 'memberManage/getMembers', payload: { sort_property: sorter.field, sort_direction: sorter.order } });
  };

  const tableProps = {
    columns,
    data: memberManage.data,
    rowKey,
    tableOnChange,
    pageFunction,
    page_size: memberManage.page_size,
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
