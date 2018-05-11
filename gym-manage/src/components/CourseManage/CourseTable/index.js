import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { routerRedux } from 'dva/router'
import TableUI from '../../DefaultUI/TableUI';
import { Modal, Divider } from 'antd'
import messages from './messages';

const confirm = Modal.confirm;

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
      dataIndex: 'classtecher',
      key: 'classtecher',
      width: '15%',
      render: (text, record) => {
        if(text){
          let teachers = text.split(',');
          return teachers.map((item,index)=>{
            return <p style={{margin:0}} key={index}>{item.split(':')[1]}</p>
          })
        }
      },
    },
    {
      title: formatMessage(messages.courseType),
      dataIndex: 'type',
      key: 'type',
      width: '14%',
      render: (text, record) => {
        return text === '1'?formatMessage(messages.groupClass):formatMessage(messages.personalClass);
      },
    },
    {
      title: formatMessage(messages.lengthOfTime),
      dataIndex: 'classsize',
      key: 'classsize',
      width: '15%',
    },
    {
      title: formatMessage(messages.coursePrice),
      dataIndex: 'classmoney',
      key: 'classmoney',
      width: '15%',
    },
    {
      title: formatMessage(messages.courseState),
      dataIndex: 'state',
      key: 'state',
      width: '14%',
      render: (text, record) => {
        return text === '0'? formatMessage(messages.toBeReleased): formatMessage(messages.thePublished);
      },
    },
    {
      title: formatMessage(messages.operation),
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => {
        if(record.isshop === '2'){
          return (
            <div>
              <a className="table-btns" onClick={() => edit(record.id)}>{formatMessage(messages.edit)}</a>
              <Divider type="vertical" />
              <a className="table-btns" onClick={() => changeCourseState(record.id,'1')}>{formatMessage(messages.publish)}</a>
            </div>
          );
        } else if(record.isshop === '1'){
          return (
            <div>
              <a className="table-btns" onClick={() => changeCourseState(record.id,'0')}>{formatMessage(messages.cancelPublish)}</a>
            </div>
          );
        } else {
          return (
            <div>
              <a className="table-btns" onClick={() => changeCourseState(record.id,'1')}>{formatMessage(messages.publish)}</a>
            </div>
          );
        }
      },
    },
  ];

  const rowKey = record => record.id;
  const edit = (id) => {
    dispatch(routerRedux.push({ pathname: '/courseManage/edit',query:{id}}))
  };
  const changeCourseState = (id,isshop) =>{
    confirm({
      title: `确认要${isshop==="0"?"取消发布":"发布"}当前选中的课程吗？`,
      onOk() {
        dispatch({ type: 'courseManage/changeClassIsShop', payload:{ id, isshop }});
      },
    });
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
