import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { routerRedux } from 'dva/router'
import TableUI from '../../DefaultUI/TableUI';
import { Modal, Divider, List, Card } from 'antd'
import messages from './messages';
import moment from 'moment-timezone';
const confirm = Modal.confirm;

function ClassScheduleTable({ dispatch, classSchedule, loading, intl: { formatMessage } }) {
  const columns = [
    {
      title: formatMessage(messages.date),
      dataIndex: 'date',
      key: 'date',
      width: '15%',
      render: (text, record) => {
        return moment(record.starttime).format("YYYY-MM-DD")
      },
    },
    {
      title: formatMessage(messages.curriculum),
      dataIndex: 'curriculum',
      key: 'curriculum',
      width: '70%',
      render: (text, record) => {
        return record.schedule.map((item,index)=>{
          return (
            <Card key={index} title={item.classname} style={{width:'25%',float:'left'}}>
              <p>教练：{item.techername}</p>
              <p>时间：{item.starttime.split(' ')[1]+' ~ '+item.endtime.split(' ')[1]}</p>
              <p>可预约人数：{item.mixpeopelsize+'/'+item.takepeopelsize}</p>
            </Card>
          )
        })
      },
    },
    {
      title: formatMessage(messages.operation),
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => {
        return <a className="table-btns" onClick={() => edit(record.id)}>{formatMessage(messages.edit)}</a>
      },
    },
  ];

  const rowKey = record => record.id;
  const edit = (id) => {
    dispatch(routerRedux.push({ pathname: '/classSchedule/edit',query:{id}}))
  };

  // const pageFunction = {
  //   onChange(page, pageSize) {
  //     dispatch({ type: 'classSchedule/getBIRLog', payload: { page_number: page, page_size: pageSize } });
  //   },
  //   onShowSizeChange(current, size) {
  //     dispatch({ type: 'classSchedule/getBIRLog', payload: { page_number: current, page_size: size } });
  //   },
  // };
  // const tableOnChange = (pagination, filters, sorter) => {
  //   dispatch({ type: 'classSchedule/getBIRLog', payload: { sort_property: sorter.field, sort_direction: sorter.order } });
  // };
  const tableProps = {
    columns,
    data: classSchedule.data,
    // pageFunction,
    // tableOnChange,
    //page_size: classSchedule.page_size,
    //currenPageNumber: classSchedule.page_number,
    rowKey,
    loading,
  };
  return (
    <TableUI {...tableProps} />
  );
}
ClassScheduleTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classSchedule: PropTypes.object.isRequired,
};

export default injectIntl(ClassScheduleTable);
