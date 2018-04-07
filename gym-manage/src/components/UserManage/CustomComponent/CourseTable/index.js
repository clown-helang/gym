import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import TableUI from '../../../DefaultUI/TableUI';
import { Modal } from 'antd'
import messages from './messages';

function CourseTable({ dispatch, editCoach, loading, intl: { formatMessage } }) {
  const columns = [
    {
      title: formatMessage(messages.courseName),
      dataIndex: 'courseName',
      key: 'courseName',
      width: '30%',
    },
    {
      title: formatMessage(messages.courseType),
      dataIndex: 'courseType',
      key: 'courseType',
      width: '30%',
      render: (text, record) => {
        return formatMessage(messages[text]);
      },
    },
    {
      title: formatMessage(messages.classTime),
      dataIndex: 'classTime',
      key: 'classTime',
    },
  ];

  const rowKey = record => record.id;
  const rowSelection = {
    selectedRowKeys:editCoach.selectedRows,
    onChange: (selectedRowKeys, selectedRows) => {
      let selectedIds = [];
      selectedRows.map(({id})=>{
        selectedIds.push(id);
      });
      dispatch({type: 'editCoach/setSelectedRows', payload: {selectedRows:selectedIds}});
    },
  };


  const handleOk = () => {
    dispatch({type:"editCoach/setVisible", payload:{ visible: false }})
  };
  const handleCancel = () => {
    dispatch({type:"editCoach/setVisible", payload:{ visible: false }})
  };
  const tableProps = {
    columns,
    data: editCoach.courseList,
    rowSelection,
    rowKey,
    loading,
  };
  return (
    <Modal
      title={formatMessage(messages.courseList)}
      visible={editCoach.visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={720}
    >
      <TableUI {...tableProps} />
    </Modal>
  );
}
CourseTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editCoach: PropTypes.object.isRequired,
};

export default injectIntl(CourseTable);
