import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import TableUI from '../../DefaultUI/TableUI';
import messages from './messages';

function UserCourseManageTable({ dispatch, userCourseManage, loading, intl: { formatMessage } }) {
  const tableLoading = loading.models.userCourseManage

  const columns = [
    {
      title: formatMessage(messages.memberName),
      dataIndex: 'studentname',
      key: 'studentname',
      width: '20%',
    },
    {
      title: formatMessage(messages.courseName),
      dataIndex: 'classname',
      key: 'classname',
      width: '20%',
    },
    {
      title: formatMessage(messages.coach),
      dataIndex: 'techername',
      key: 'techername',
      width: '20%',
    },
    {
      title: formatMessage(messages.restOfClass),
      dataIndex: 'restOfClass',
      key: 'restOfClass',
      width: '20%',
      render: (text, record) => {
        return `${record.allclasssize - record.endclasssize}小时`
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: '20%',
      render: (text, record) => {
        return <a onClick={()=>editCoach(record)}>修改教练</a>
      },
    },
  ];

  const editCoach = (changeUserCourse)=> {
    dispatch({type:'userCourseManage/getCoaches', payload:{ id: changeUserCourse.classid}})
    dispatch({type:'userCourseManage/setChangeUserCourse', payload:{ changeUserCourse }})
    dispatch({type:'userCourseManage/setVisible', payload:{ visible: true }})
  }

  const rowKey = record => record.id;

  const pageFunction = {
    onChange(page, pageSize) {
      dispatch({ type: 'userCourseManage/getConsumeRecord', payload: { page_number: page, page_size: pageSize } });
    },
    onShowSizeChange(current, size) {
      dispatch({ type: 'userCourseManage/getConsumeRecord', payload: { page_number: current, page_size: size } });
    },
  };
  const tableOnChange = (pagination, filters, sorter) => {
    dispatch({ type: 'userCourseManage/getConsumeRecord', payload: { sort_property: sorter.field, sort_direction: sorter.order } });
  };

  const tableProps = {
    columns,
    data: userCourseManage.data,
    page_size: userCourseManage.page_size,
    rowKey,
    tableOnChange,
    pageFunction,
    currenPageNumber: userCourseManage.page_number,
    loading: tableLoading,
  };
  return (
    <TableUI {...tableProps} />
  );
}
UserCourseManageTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userCourseManage: PropTypes.object.isRequired,
};

export default injectIntl(UserCourseManageTable);
