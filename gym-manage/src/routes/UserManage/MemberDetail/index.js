import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import BasicInformation from '../../../components/UserManage/MemberManage/MemberDetail/BasicInformation'
import styles from './index.less';

function MemberDetail({ dispatch, memberDetail, loading }) {
  return (
    <div className={styles.content}>
      <BasicInformation memberDetail={memberDetail} loading={loading.models.memberDetail}/>
    </div>
  );
}

MemberDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  memberDetail: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    memberDetail: state.memberDetail,
    loading: state.loading
  };
}

export default injectIntl(connect(mapStateToProps)(MemberDetail));
