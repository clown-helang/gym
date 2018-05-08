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
      dataIndex: 'realname',
      key: 'realname',
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
    let _coachList = [];
    if(addCourseManage.data.contents){
      addCourseManage.selectedRows.map(item=>{
        addCourseManage.data.contents.map(i=>{
          if(parseInt(item) === parseInt(i.id)){
            _coachList.push(i)
          }
        })
      })
    }
    dispatch({type:"addCourseManage/setCoachList", payload:{ coachList: {total:_coachList.length,contents:_coachList} }})
    dispatch({type:"addCourseManage/setVisible", payload:{ visible: false }})
  };
  const handleCancel = () => {
    dispatch({type:"addCourseManage/setVisible", payload:{ visible: false }})
  };
  const tableProps = {
    columns,
    data: addCourseManage.data,
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
