import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import { routerRedux } from 'dva/router';
import RechargeRecordTable from '../../../components/StatisticalManage/RechargeRecordTable';
import RangePickerBar from '../../../components/DefaultUI/RangePickerBar';
import SearchBar from '../../../components/DefaultUI/SearchBar';
import { Button } from 'antd';
import messages from './messages';
import styles from './index.less';

function RechargeRecordQuery({ dispatch, rechargeRecordQuery, loading, intl: { formatMessage } }) {
  const add = () => {
    dispatch(routerRedux.push({ pathname: '/basicInformation/zone_configuration/add' }));
  };
  const search = () => {
    dispatch({type:'rechargeRecordQuery/getRechargeRecord'})
  };
  const tableProps = { dispatch, rechargeRecordQuery, loading:loading.models.rechargeRecordQuery };
  return (
    <div className={styles.content}>
      <div className="search-bar">
        <RangePickerBar
          valueName="timeRange"
          title={formatMessage(messages.selectData)}
          value={[rechargeRecordQuery.starttime,rechargeRecordQuery.endtime]}
          modalName="rechargeRecordQuery/setRangeTime"
          dispatch={dispatch}
        />
        <SearchBar
          valueName="studentname"
          title={formatMessage(messages.memberName)}
          value={rechargeRecordQuery.studentname}
          tip={formatMessage(messages.inputTip)}
          search={search}
          modalName="rechargeRecordQuery/setStudentName"
          dispatch={dispatch}
        />
        <SearchBar
          valueName="adminname"
          title={formatMessage(messages.name)}
          value={rechargeRecordQuery.adminname}
          tip={formatMessage(messages.inputTip)}
          search={search}
          modalName="rechargeRecordQuery/setAdminName"
          dispatch={dispatch}
        />
        <Button type="primary" onClick={search} icon="search" style={{marginLeft:20,position:'relative',top:5}}>{formatMessage(messages.search)}</Button>
      </div>
      <RechargeRecordTable {...tableProps}/>
    </div>
  );
}

RechargeRecordQuery.propTypes = {
  dispatch: PropTypes.func.isRequired,
  rechargeRecordQuery: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    rechargeRecordQuery: state.rechargeRecordQuery,
    loading: state.loading
  };
}

export default injectIntl(connect(mapStateToProps)(RechargeRecordQuery));
