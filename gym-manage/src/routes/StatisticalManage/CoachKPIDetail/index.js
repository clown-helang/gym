import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import { Tabs, Icon } from 'antd';
import ClassRecord from '../../../components/StatisticalManage/CoachKPIDetail/ClassRecord'
import SalesRecord from '../../../components/StatisticalManage/CoachKPIDetail/SalesRecord'
import messages from './messages';
import styles from './index.less';

const TabPane = Tabs.TabPane;
function CoachKPIDetail({ dispatch, coachKPIDetail, loading, intl: { formatMessage } }) {
  return (
    <div className={styles.content}>
      <Tabs defaultActiveKey="1">
        <TabPane tab={<span><Icon type="idcard" />{formatMessage(messages.classRecord)}</span>} key="1">
          <ClassRecord dispatch={dispatch} coachKPIDetail={coachKPIDetail} loading={loading.models.coachKPIDetail} />
        </TabPane>
        <TabPane tab={<span><Icon type="calendar" />{formatMessage(messages.salesRecord)}</span>} key="2">
          <SalesRecord dispatch={dispatch} coachKPIDetail={coachKPIDetail} loading={loading.models.coachKPIDetail} />
        </TabPane>
      </Tabs>
    </div>
  );
}

CoachKPIDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  coachKPIDetail: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    coachKPIDetail: state.coachKPIDetail,
    loading: state.loading
  };
}

export default injectIntl(connect(mapStateToProps)(CoachKPIDetail));
