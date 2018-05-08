import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import { Button, Tabs, Icon } from 'antd';
import BasicInformation from '../../../components/UserManage/MemberManage/MemberDetail/BasicInformation'
import ClassRecord from '../../../components/UserManage/MemberManage/MemberDetail/ClassRecord'
import RechargeRecord from '../../../components/UserManage/MemberManage/MemberDetail/RechargeRecord'
import messages from './messages';
import styles from './index.less';

const TabPane = Tabs.TabPane;
function MemberDetail({ dispatch, memberDetail, loading, intl: { formatMessage } }) {
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
