import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import TableUI from '../../DefaultUI/TableUI';
import { Modal } from 'antd'
import messages from './messages';

function CoachTable({ dispatch, addCourseManage, loading, intl: { formatMessage } }) {
  const columns = [
    {
      title: formatMessage(messages.name),
      dataIndex: 'name',
      key: 'name',
      width: '45%',
    },
    {
      title: formatMessage(messages.phone),
      dataIndex: 'phone',
      key: 'phone',
    },
  ];

  const rowKey = record => record.id;
  const rowSelection = {
    selectedRowKeys:addCourseManage.selectedRows,
    onChange: (selectedRowKeys, selectedRows) => {
      let selectedIds = [];
      selectedRows.map(({id})=>{
        selectedIds.push(id);
      });
      dispatch({type: 'addCourseManage/setSelectedRows', payload: {selectedRows:selectedIds}});
    },
  };


  const handleOk = () => {
    dispatch({type:"addCourseManage/setVisible", payload:{ visible: false }})
  };
  const handleCancel = () => {
    dispatch({type:"addCourseManage/setVisible", payload:{ visible: false }})
  };
  const tableProps = {
    columns,
    data: addCourseManage.coachList,
    rowSelection,
    rowKey,
    loading,
  };
  return (
    <Modal
      title={formatMessage(messages.coachList)}
      visible={addCourseManage.visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={720}
    >
      <TableUI {...tableProps} />
    </Modal>
  );
}
CoachTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  addCourseManage: PropTypes.object.isRequired,
};

export default injectIntl(CoachTable);
