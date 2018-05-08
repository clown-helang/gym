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
      dataIndex: 'classname',
      key: 'classname',
      width: '50%',
    },
    {
      title: formatMessage(messages.courseType),
      dataIndex: 'type',
      key: 'type',
      width: '50%',
      render: (text, record) => {
        return text === '1'?formatMessage(messages.personalClass):formatMessage(messages.groupClass);
      },
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
    let _courseList = [];
    if(editCoach.data.contents){
      editCoach.selectedRows.map(item=>{
        editCoach.data.contents.map(i=>{
          if(parseInt(item) === parseInt(i.id)){
            _courseList.push(i)
          }
        })
      })
    }
    dispatch({type:"editCoach/setCourseList", payload:{ courseList: {total:_courseList.length,contents:_courseList} }})
    dispatch({type:"editCoach/setVisible", payload:{ visible: false }})
  };
  const handleCancel = () => {
    dispatch({type:"editCoach/setVisible", payload:{ visible: false }})
  };
  const tableProps = {
    columns,
    data: editCoach.data,
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
