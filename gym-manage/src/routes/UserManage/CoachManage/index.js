import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import { routerRedux } from 'dva/router';
import CoachManageTable from '../../../components/UserManage/CoachManage/CoachManageTable'
import SearchBar from '../../../components/DefaultUI/SearchBar';
import messages from './messages';
import styles from './index.less';

function CoachManage({ dispatch, coachManage, loading, intl: { formatMessage } }) {
  const add = () => {
    dispatch(routerRedux.push({ pathname: '/basicInformation/zone_configuration/add' }));
  };
  const search = (search_value) => {
    dispatch({type:'coachManage/getZones',payload:{search_value}})
  };
  const tableProps = { dispatch, coachManage, loading:loading.models.coachManage };
  return (
    <div className={styles.content}>
      <div className="search-bar">
        <SearchBar
          valueName="search_value"
          title={formatMessage(messages.name)}
          value={coachManage.search_value}
          tip={formatMessage(messages.inputTip)}
          search={search}
          modalName="coachManage/setSearchValue"
          dispatch={dispatch}
          enterButton={true}
        />
      </div>
      <CoachManageTable {...tableProps}/>
    </div>
  );
}

CoachManage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  coachManage: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    coachManage: state.coachManage,
    loading: state.loading
  };
}

export default injectIntl(connect(mapStateToProps)(CoachManage));
