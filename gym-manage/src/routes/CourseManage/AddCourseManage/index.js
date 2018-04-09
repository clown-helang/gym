import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import AddCourseForm from '../../../components/CourseManage/AddCourseForm'
import styles from './index.less';

function AddCourseManage({ dispatch, addCourseManage, loading }) {
  const formProps = { dispatch, addCourseManage, loading:loading };
  return (
    <div className={styles.content}>
      <AddCourseForm {...formProps}/>
    </div>
  );
}

AddCourseManage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  addCourseManage: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    addCourseManage: state.addCourseManage,
    loading: state.loading
  };
}

export default connect(mapStateToProps)(AddCourseManage);
