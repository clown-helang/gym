import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import SearchBar from '../../../components/DefaultUI/SearchBar';
import UserCourseManageTable from '../../../components/CourseManage/UserCourseManageTable'
import EditUserCourseCoach from '../../../components/CourseManage/EditUserCourseCoach'
import messages from './messages';
import styles from './index.less';

function UserCourseManage({ dispatch, userCourseManage, loading, intl: { formatMessage } }) {
  const search = (search_value) => {
    dispatch({type:'userCourseManage/getConsumeRecord',payload:{ search_value }})
  };
  const tableProps = { dispatch, userCourseManage, loading };
  return (
    <div className={styles.content}>
      <div className="search-bar">
        <SearchBar
          valueName="search_value"
          title={formatMessage(messages.name)}
          value={userCourseManage.search_value}
          tip={formatMessage(messages.inputTip)}
          search={search}
          modalName="userCourseManage/setSearchValue"
          dispatch={dispatch}
          enterButton={true}
        />
      </div>
      <UserCourseManageTable {...tableProps}/>
      {
        userCourseManage.visible
        ? <EditUserCourseCoach dispatch={dispatch} {...tableProps}/>
        : ''
      }

    </div>
  );
}

UserCourseManage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userCourseManage: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    userCourseManage: state.userCourseManage,
    loading: state.loading
  };
}

export default injectIntl(connect(mapStateToProps)(UserCourseManage));
