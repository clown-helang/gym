 import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import AddClassScheduleForm from '../../../components/CourseManage/AddClassScheduleForm'
import styles from './index.less';

function AddClassSchedule({ dispatch, addClassSchedule, loading }) {
  const formProps = { dispatch, addClassSchedule, loading:loading };
  return (
    <div className={styles.content}>
      <AddClassScheduleForm {...formProps}/>
    </div>
  );
}

 AddClassSchedule.propTypes = {
  dispatch: PropTypes.func.isRequired,
  addClassSchedule: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    addClassSchedule: state.addClassSchedule,
    loading: state.loading
  };
}

export default connect(mapStateToProps)(AddClassSchedule);
