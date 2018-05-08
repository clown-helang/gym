import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import { Button } from 'antd';
import { routerRedux } from 'dva/router';
import RangePickerBar from '../../../components/DefaultUI/RangePickerBar';
import SearchBar from '../../../components/DefaultUI/SearchBar';
import ClassRecordTable from '../../../components/StatisticalManage/ClassRecordTable';
import messages from './messages';
import styles from './index.less';

function ClassRecordQuery({ dispatch, classRecordQuery, loading, intl: { formatMessage } }) {
  const add = () => {
    dispatch(routerRedux.push({ pathname: '/basicInformation/zone_configuration/add' }));
  };
  const search = () => {
    dispatch({type:'classRecordQuery/getClassRecord'})
  };
  const tableProps = { dispatch, classRecordQuery, loading:loading.models.classRecordQuery };
  return (
    <div className={styles.content}>
      <div className="search-bar">
        <RangePickerBar
          valueName="timeRange"
          title={formatMessage(messages.selectData)}
          value={[classRecordQuery.starttime,classRecordQuery.endtime]}
          modalName="classRecordQuery/setRangeTime"
          dispatch={dispatch}
        />
        <SearchBar
          valueName="username"
          title={formatMessage(messages.memberName)}
          value={classRecordQuery.username}
          tip={formatMessage(messages.inputTip)}
          search={search}
          modalName="classRecordQuery/setUserName"
          dispatch={dispatch}
        />
        <SearchBar
          valueName="teachername"
          title={formatMessage(messages.coachName)}
          value={classRecordQuery.teachername}
          tip={formatMessage(messages.inputTip)}
          search={search}
          modalName="classRecordQuery/setTeacherName"
          dispatch={dispatch}
        />
        <Button type="primary" onClick={search} icon="search" style={{marginLeft:20,position:'relative',top:5}}>{formatMessage(messages.search)}</Button>
      </div>
      <ClassRecordTable {...tableProps}/>
    </div>
  );
}

ClassRecordQuery.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classRecordQuery: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    classRecordQuery: state.classRecordQuery,
    loading: state.loading
  };
}

export default injectIntl(connect(mapStateToProps)(ClassRecordQuery));
