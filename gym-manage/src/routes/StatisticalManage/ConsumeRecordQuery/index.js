import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import { Button } from 'antd';
import { routerRedux } from 'dva/router';
import RangePickerBar from '../../../components/DefaultUI/RangePickerBar';
import SearchBar from '../../../components/DefaultUI/SearchBar';
import ConsumeRecordTable from '../../../components/StatisticalManage/ConsumeRecordTable';
import messages from './messages';
import styles from './index.less';

function ConsumeRecordQuery({ dispatch, consumeRecordQuery, loading, intl: { formatMessage } }) {
  const add = () => {
    dispatch(routerRedux.push({ pathname: '/basicInformation/zone_configuration/add' }));
  };
  const search = () => {
    dispatch({type:'consumeRecordQuery/getConsumeRecord'})
  };
  const tableProps = { dispatch, consumeRecordQuery, loading:loading.models.consumeRecordQuery };
  return (
    <div className={styles.content}>
      <div className="search-bar">
        <RangePickerBar
          valueName="timeRange"
          title={formatMessage(messages.selectData)}
          value={[consumeRecordQuery.starttime,consumeRecordQuery.endtime]}
          modalName="consumeRecordQuery/setRangeTime"
          dispatch={dispatch}
        />
        <SearchBar
          valueName="search_value"
          title={formatMessage(messages.salesMan)}
          value={consumeRecordQuery.search_value}
          tip={formatMessage(messages.inputTip)}
          search={search}
          modalName="consumeRecordQuery/setSearchValue"
          dispatch={dispatch}
        />
        <Button type="primary" onClick={search} icon="search" style={{marginLeft:20,position:'relative',top:5}}>{formatMessage(messages.search)}</Button>
      </div>
      <ConsumeRecordTable {...tableProps}/>
    </div>
  );
}

ConsumeRecordQuery.propTypes = {
  dispatch: PropTypes.func.isRequired,
  consumeRecordQuery: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    consumeRecordQuery: state.consumeRecordQuery,
    loading: state.loading
  };
}

export default injectIntl(connect(mapStateToProps)(ConsumeRecordQuery));
