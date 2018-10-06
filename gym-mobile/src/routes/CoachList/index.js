import React from 'react'
import { connect } from 'dva';
import styles from './index.less'
import Coach from '../../components/Coach'
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'

function CoachList({dispatch,coachList}) {
  const { coaches } = coachList;
  const menu = {
    icon:'coachList',
    title:'私教列表'
  };
  return (
    <div>
      <Header dispatch={dispatch}/>
      <MenuBar menu={menu}/>
      <div className={styles.coachList}>
        {
          coaches.map((item,index) => <Coach key={index} coach={item} dispatch={dispatch}/>)
        }
      </div>
    </div>
  )
}
function mapStateToProps({ coachList }) {
  return { coachList };
}
export default connect(mapStateToProps)(CoachList);
