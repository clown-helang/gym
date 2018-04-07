import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import { Button } from 'antd';
import { routerRedux } from 'dva/router';
import NavBar from '../../../components/DefaultUI/NavBar';
import SearchBar from '../../../components/DefaultUI/SearchBar';
import messages from './messages';
import styles from './index.less';

function RechargeRecordQuery({ dispatch, rechargeRecordQuery, loading, intl: { formatMessage } }) {
  const add = () => {
    dispatch(routerRedux.push({ pathname: '/basicInformation/zone_configuration/add' }));
  };
  const search = (search_value) => {
    dispatch({type:'rechargeRecordQuery/getZones',payload:{search_value}})
  };
  const tableProps = { dispatch, rechargeRecordQuery, loading:loading.models.rechargeRecordQuery };
  return (
    <div className={styles.content}>
      <div className="search-bar">
        <SearchBar
          valueName="search_value"
          title={formatMessage(messages.account)}
          value={rechargeRecordQuery.search_value}
          tip={formatMessage(messages.inputTip)}
          search={search}
          modalName="rechargeRecordQuery/setSearchValue"
          dispatch={dispatch}
          enterButton={true}
        />
      </div>
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
