import React from 'react'
import { connect } from 'dva';
import TX from '../../assets/touxiang.jpg'
import styles from './index.less'
import Coach from '../../components/Coach'
import pengyuyan from '../../assets/pengyuyan.jpg'
import yuchunlei from '../../assets/yuchunlei.jpg'
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'

function CoachList({dispatch,coachList}) {
  const { coaches } = coachList;
  const menu = {
    icon:'coachList',
    title:'私教列表'
  };
  console.log('coaches--',coaches)
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
