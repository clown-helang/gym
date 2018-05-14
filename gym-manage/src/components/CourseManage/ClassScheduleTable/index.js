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
  const { starttime,endtime } = classSchedule;
  const columns = [
    {
      title: formatMessage(messages.date),
      dataIndex: 'date',
      key: 'date',
      width: '15%',
      render: (text, record) => {
        return moment(record.data).format("YYYY-MM-DD dddd")
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
            <Card
              key={index}
              title={item.classname}
              style={{width:'25%',float:'left',backgroundColor:item.isover !== '0'?'#eee':''}}
              extra={
                <span>
                  {
                    moment(record.data).isBefore(moment().add(7,'d'))
                    ? moment(record.data).isAfter(moment().subtract(1, 'd')) && item.isover !== '1'
                      ? item.isover === '3'
                        ? '已撤销'
                        : <a onClick={()=>cancelGroupClass(item.id)}>撤销</a>
                      : ''
                    : <span>
                        <a onClick={()=>edit(item.id)}>编辑</a>&nbsp;
                        <a onClick={()=>del(item.id)}>删除</a>
                      </span>
                  }
                </span>
              }
            >
              <p>教练：{item.techeridname}</p>
              <p>时间：{item.starttime.split(' ')[1]+' ~ '+item.endtime.split(' ')[1]}</p>
              <p>可预约人数：{item.takepeopelsize+'/'+item.mixpeopelsize}</p>
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
        return (
          <a className="table-btns" onClick={() => add(moment(record.data).format("YYYY-MM-DD"))}>{formatMessage(messages.add)}</a>
        );
      },
    },
  ];

  const rowKey = record => record.id;
  const add = (date) => {
    dispatch(routerRedux.push({ pathname: '/classSchedule/add',query:{date, starttime, endtime}}))
  };
  const edit = (id) => {
    dispatch(routerRedux.push({ pathname: '/classSchedule/edit',query:{id, starttime, endtime}}))
  };
  const del = (Id) => {
    confirm({
      title: '确认要删除选中的课程安排吗?',
      onOk() {
        dispatch({type:'classSchedule/deleteGroupClass',payload:{Id}})
      }
    });
  };
  const cancelGroupClass = (classtimetableid) => {
    confirm({
      title: '确认要撤销选中的课程安排吗?',
      onOk() {
        dispatch({type:'classSchedule/cancelGroupClass',payload:{classtimetableid}})
      }
    });
  }
  const tableProps = {
    columns,
    data: classSchedule.data,
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
