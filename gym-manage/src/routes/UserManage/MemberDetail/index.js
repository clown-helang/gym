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
      <Tabs defaultActiveKey="1">
        <TabPane tab={<span><Icon type="idcard" />{formatMessage(messages.baseInformation)}</span>} key="1">
          <BasicInformation memberDetail={memberDetail} loading={loading.models.memberDetail}/>
        </TabPane>
        <TabPane tab={<span><Icon type="calendar" />{formatMessage(messages.classRecord)}</span>} key="2">
          <ClassRecord dispatch={dispatch} memberDetail={memberDetail} loading={loading.models.memberDetail} />
        </TabPane>
        <TabPane tab={<span><Icon type="bank" />{formatMessage(messages.rechargeRecord)}</span>} key="3">
          <RechargeRecord dispatch={dispatch} memberDetail={memberDetail} loading={loading.models.memberDetail} />
        </TabPane>
      </Tabs>
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
