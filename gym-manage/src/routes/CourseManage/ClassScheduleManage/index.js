import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button } from 'antd';
import { injectIntl } from 'react-intl';
import { routerRedux } from 'dva/router';
import moment from 'moment-timezone';
import ClassScheduleTable from '../../../components/CourseManage/ClassScheduleTable'
import messages from './messages';
import styles from './index.less';

function ClassScheduleManage({ dispatch, classSchedule, loading, intl: { formatMessage } }) {
  const add = () => {
    dispatch(routerRedux.push({ pathname: '/classSchedule/add' }));
  };
  const search = (type) => {
    const { starttime, endtime } = classSchedule;
    if(type === 'lastWeek'){
      dispatch({type:'classSchedule/setStartAndEndTime',payload:{
        starttime: moment(starttime).subtract(7,'d').format('YYYY-MM-DD HH:mm:ss').toString(),
        endtime: moment(endtime).subtract(7,'d').format('YYYY-MM-DD HH:mm:ss').toString()}})
      dispatch({type:'classSchedule/getAllClassScheduleByTime'})
    } else {
      dispatch({type:'classSchedule/setStartAndEndTime',payload:{
        starttime: moment(starttime).add(7,'d').format('YYYY-MM-DD HH:mm:ss').toString(),
        endtime: moment(endtime).add(7,'d').format('YYYY-MM-DD HH:mm:ss').toString()}})
      dispatch({type:'classSchedule/getAllClassScheduleByTime'})
    }

  };
  const tableProps = { dispatch, classSchedule, loading:loading.models.classSchedule };
  return (
    <div className={styles.content}>
      <Button type="primary" onClick={add} style={{marginTop:10}}>
        {formatMessage(messages.add)}
      </Button>
      <div className="search-bar">
        <Button type="primary" onClick={()=>search('lastWeek')} style={{marginRight:20}}>
          {formatMessage(messages.lastWeek)}
        </Button>
        <Button type="primary" onClick={()=>search('nextweek')}>
          {formatMessage(messages.nextweek)}
        </Button>
      </div>
      <ClassScheduleTable {...tableProps}/>
    </div>
  );
}

ClassScheduleManage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classSchedule: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    classSchedule: state.classSchedule,
    loading: state.loading
  };
}

export default injectIntl(connect(mapStateToProps)(ClassScheduleManage));
