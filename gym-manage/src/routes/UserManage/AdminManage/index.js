import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import { routerRedux } from 'dva/router';
import AdminManageTable from '../../../components/UserManage/AdminManage/AdminManageTable'
import EditUserRule from '../../../components/UserManage/CustomComponent/EditUserRule'
import SearchBar from '../../../components/DefaultUI/SearchBar';
import messages from './messages';
import styles from './index.less';

function CoachManage({ dispatch, adminManage, loading, intl: { formatMessage } }) {
  const add = () => {
    dispatch(routerRedux.push({ pathname: '/basicInformation/zone_configuration/add' }));
  };
  const search = (search_value) => {
    dispatch({type:'adminManage/getAdmins',payload:{search_value}})
  };
  const submitEdit = (postData) =>{
    dispatch({type:'adminManage/changeUserType',payload:{type:postData.type}})
    dispatch({type:'adminManage/setVisible',payload:{visible:false}})
  };
  const cancelEdit = () =>{
    dispatch({type:'adminManage/setVisible',payload:{visible:false}})
  };
  const { editData:{realname, phone, usertype, account}, visible } = adminManage;

  const tableProps = { dispatch, adminManage, loading:loading.models.adminManage };
  const editProps = { realname, phone, usertype, visible, loading:false, submitEdit, cancelEdit};
  return (
    <div className={styles.content}>
      <div className="search-bar">
        <SearchBar
          valueName="search_value"
          title={formatMessage(messages.name)}
          value={adminManage.search_value}
          tip={formatMessage(messages.inputTip)}
          search={search}
          modalName="adminManage/setSearchValue"
          dispatch={dispatch}
          enterButton={true}
        />
      </div>
      <AdminManageTable {...tableProps}/>
      {
        visible ? <EditUserRule {...editProps}/> : ''
      }
    </div>
  );
}

CoachManage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  adminManage: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    adminManage: state.adminManage,
    loading: state.loading
  };
}

export default injectIntl(connect(mapStateToProps)(CoachManage));
