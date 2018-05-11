import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button } from 'antd';
import { injectIntl } from 'react-intl';
import { routerRedux } from 'dva/router';
import RangePickerBar from '../../../components/DefaultUI/RangePickerBar';
import ClassScheduleTable from '../../../components/CourseManage/ClassScheduleTable'
import messages from './messages';
import styles from './index.less';

function ClassScheduleManage({ dispatch, classSchedule, loading, intl: { formatMessage } }) {
  const add = () => {
    dispatch(routerRedux.push({ pathname: '/classSchedule/add' }));
  };
  const search = (search_value) => {
    dispatch({type:'classSchedule/getCourses',payload:{search_value}})
  };
  const tableProps = { dispatch, classSchedule, loading:loading.models.classSchedule };
  return (
    <div className={styles.content}>
      <Button type="primary" onClick={add} style={{marginTop:10}}>
        {formatMessage(messages.add)}
      </Button>
      <div className="search-bar">
        <RangePickerBar
          valueName="timeRange"
          title={formatMessage(messages.selectData)}
          value={[classSchedule.starttime,classSchedule.endtime]}
          modalName="classSchedule/setRangeTime"
          dispatch={dispatch}
        />
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
