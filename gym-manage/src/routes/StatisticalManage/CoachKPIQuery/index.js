import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import { Button } from 'antd';
import { routerRedux } from 'dva/router';
import RangePickerBar from '../../../components/DefaultUI/RangePickerBar';
import CoachKPITable from '../../../components/StatisticalManage/CoachKPITable';
import messages from './messages';
import styles from './index.less';

function CoachKPIQuery({ dispatch, coachKPIQuery, loading, intl: { formatMessage } }) {
  const add = () => {
    dispatch(routerRedux.push({ pathname: '/basicInformation/zone_configuration/add' }));
  };
  const search = (search_value) => {
    dispatch({type:'coachKPIQuery/getZones',payload:{search_value}})
  };
  const tableProps = { dispatch, coachKPIQuery, loading:loading.models.coachKPIQuery };
  return (
    <div className={styles.content}>
      <div className="search-bar">
        <RangePickerBar
          valueName="search_value"
          title={formatMessage(messages.selectData)}
          value={coachKPIQuery.search_value}
          modalName="coachKPIQuery/setSearchValue"
          dispatch={dispatch}
        />
        <Button type="primary" icon="search" style={{marginLeft:20,position:'relative',top:5}}>{formatMessage(messages.search)}</Button>
      </div>
      <CoachKPITable {...tableProps}/>
    </div>
  );
}

CoachKPIQuery.propTypes = {
  dispatch: PropTypes.func.isRequired,
  coachKPIQuery: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    coachKPIQuery: state.coachKPIQuery,
    loading: state.loading
  };
}

export default injectIntl(connect(mapStateToProps)(CoachKPIQuery));
