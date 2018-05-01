import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { routerRedux } from 'dva/router'
import TableUI from '../../DefaultUI/TableUI';
import { Modal } from 'antd'
import messages from './messages';

function CourseTable({ dispatch, courseManage, loading, intl: { formatMessage } }) {
  const columns = [
    {
      title: formatMessage(messages.courseName),
      dataIndex: 'classname',
      key: 'classname',
      width: '15%',
    },
    {
      title: formatMessage(messages.coachName),
      dataIndex: 'coachName',
      key: 'coachName',
      width: '15%',
    },
    {
      title: formatMessage(messages.courseState),
      dataIndex: 'state',
      key: 'state',
      width: '14%',
      // render: (text, record) => {
      //   return formatMessage(messages[text]);
      // },
    },
    {
      title: formatMessage(messages.courseType),
      dataIndex: 'courseType',
      key: 'courseType',
      width: '14%',
      // render: (text, record) => {
      //   return formatMessage(messages[text]);
      // },
    },
    {
      title: formatMessage(messages.classTime),
      dataIndex: 'classTime',
      key: 'classTime',
      width: '15%',
    },
    {
      title: formatMessage(messages.coursePrice),
      dataIndex: 'classmoney',
      key: 'classmoney',
      width: '15%',
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

  const rowKey = record => record.id;
  const edit = (id) => {
    dispatch(routerRedux.push({ pathname: '/courseManage/edit'}))
  };
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
    data: courseManage.data,
    pageFunction,
    tableOnChange,
    page_size: courseManage.page_size,
    currenPageNumber: courseManage.page_number,
    rowKey,
    loading,
  };
  return (
    <TableUI {...tableProps} />
  );
}
CourseTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  courseManage: PropTypes.object.isRequired,
};

export default injectIntl(CourseTable);
