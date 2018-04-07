import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import EditCoachForm from '../../../components/UserManage/CoachManage/EditCoachForm'


function EditCoach({ dispatch, editCoach, loading }) {
  const formProps = { dispatch, editCoach, loading:loading };
  return (
    <EditCoachForm {...formProps}/>
  );
}

EditCoach.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editCoach: PropTypes.object.editCoach
};

function mapStateToProps(state) {
  return {
    editCoach: state.editCoach,
    loading: state.loading
  };
}

export default connect(mapStateToProps)(EditCoach);
