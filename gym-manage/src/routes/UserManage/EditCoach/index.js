import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import EditCoachForm from '../../../components/UserManage/CoachManage/EditCoachForm'
import styles from './index.less';

function EditCoach({ dispatch, editCoach, loading }) {
  const formProps = { dispatch, editCoach, loading:loading };
  return (
    <div className={styles.content}>
      <EditCoachForm {...formProps}/>
    </div>
  );
}

EditCoach.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editCoach: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    editCoach: state.editCoach,
    loading: state.loading
  };
}

export default connect(mapStateToProps)(EditCoach);
