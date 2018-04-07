import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import { routerRedux } from 'dva/router';
import SearchBar from '../../../components/DefaultUI/SearchBar';
import MemberManageTable from '../../../components/UserManage/MemberManage/MemberManageTable'
import EditUserRule from '../../../components/UserManage/CustomComponent/EditUserRule'
import Recharge from '../../../components/UserManage/CustomComponent/Recharge'
import messages from './messages';
import styles from './index.less';

function MemberManage({ dispatch, memberManage, loading, intl: { formatMessage } }) {
  const add = () => {
    dispatch(routerRedux.push({ pathname: '/basicInformation/zone_configuration/add' }));
  };
  const search = (search_value) => {
    dispatch({type:'memberManage/getZones',payload:{search_value}})
  };
  const submitEdit = (postData) =>{
    console.log('submit---',postData);
    dispatch({type:'memberManage/setEditVisible',payload:{editVisible:false}})
  };
  const cancelEdit = () =>{
    dispatch({type:'memberManage/setEditVisible',payload:{editVisible:false}})
  };

  const submitRecharge = (postData) =>{
    console.log('submit---',postData);
    dispatch({type:'memberManage/setRechargeVisible',payload:{rechargeVisible:false}})
  };
  const cancelRecharge = () =>{
    dispatch({type:'memberManage/setRechargeVisible',payload:{rechargeVisible:false}})
  };

  const { editData:{name, phone, rule, account}, editVisible, rechargeVisible } = memberManage;

  const tableProps = { dispatch, memberManage, loading:loading.models.memberManage };
  const editProps = { account, name, phone, rule, visible:editVisible, loading:false, submitEdit, cancelEdit};
  const rechargeProps = { account, name, visible:rechargeVisible, loading:false, submitRecharge, cancelRecharge};
  return (
    <div className={styles.content}>
      <div className="search-bar">
        <SearchBar
          valueName="search_value"
          title={formatMessage(messages.name)}
          value={memberManage.search_value}
          tip={formatMessage(messages.inputTip)}
          search={search}
          modalName="memberManage/setSearchValue"
          dispatch={dispatch}
          enterButton={true}
        />
      </div>
      <MemberManageTable {...tableProps}/>
      {
        editVisible ? <EditUserRule {...editProps}/> : ''
      }
      {
        rechargeVisible ? <Recharge {...rechargeProps} /> : ''
      }
    </div>
  );
}

MemberManage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  memberManage: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    memberManage: state.memberManage,
    loading: state.loading
  };
}

export default injectIntl(connect(mapStateToProps)(MemberManage));
