import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button } from 'antd';
import { injectIntl } from 'react-intl';
import { routerRedux } from 'dva/router';
import SearchBar from '../../../components/DefaultUI/SearchBar';
import CourseTable from '../../../components/CourseManage/CourseTable'
import messages from './messages';
import styles from './index.less';

function CourseManage({ dispatch, courseManage, loading, intl: { formatMessage } }) {
  const add = () => {
    dispatch(routerRedux.push({ pathname: '/courseManage/add' }));
  };
  const search = (search_value) => {
    dispatch({type:'courseManage/getCourses',payload:{search_value}})
  };
  const tableProps = { dispatch, courseManage, loading:loading.models.courseManage };
  return (
    <div className={styles.content}>
      <Button type="primary" onClick={add} style={{marginTop:10}}>
        {formatMessage(messages.add)}
      </Button>
      <div className="search-bar">
        <SearchBar
          valueName="search_value"
          title={formatMessage(messages.name)}
          value={courseManage.search_value}
          tip={formatMessage(messages.inputTip)}
          search={search}
          modalName="courseManage/setSearchValue"
          dispatch={dispatch}
          enterButton={true}
        />
      </div>
      <CourseTable {...tableProps}/>
    </div>
  );
}

CourseManage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  courseManage: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    courseManage: state.courseManage,
    loading: state.loading
  };
}

export default injectIntl(connect(mapStateToProps)(CourseManage));
