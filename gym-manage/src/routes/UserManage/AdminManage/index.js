import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import AdminManageTable from '../../../components/UserManage/AdminManage/AdminManageTable'
import AddAdminModal from '../../../components/UserManage/AddAdminModal'
import EditAdminUserRule from '../../../components/UserManage/CustomComponent/EditAdminUserRule'
import SearchBar from '../../../components/DefaultUI/SearchBar';
import { Button } from 'antd';
import messages from './messages';
import styles from './index.less';

function CoachManage({ dispatch, adminManage, loading, intl: { formatMessage } }) {
  const add = () => {
    dispatch({type:'adminManage/initAddData'})
    dispatch({type:'adminManage/setAddVisible',payload:{addVisible:true}})
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
  const { editData:{realname, phone, usertype, account}, visible, addVisible, addAdminDTO } = adminManage;

  const tableProps = { dispatch, adminManage, loading:loading.models.adminManage };
  const editProps = { realname, phone, usertype, visible, loading:false, submitEdit, cancelEdit};
  const addProps = { addAdminDTO, loading:false, dispatch, addVisible};
  return (
    <div className={styles.content}>
      <Button type="primary" onClick={add} style={{marginTop:10}}>
        {formatMessage(messages.add)}
      </Button>
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
        visible ? <EditAdminUserRule {...editProps}/> : ''
      }
      {
        addVisible ? <AddAdminModal {...addProps}/> : ''
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
