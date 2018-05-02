import React from 'react'
import styles from './index.less'
import {Icon} from 'antd'

function MenuBar({menu}) {
  const iconGenerator = (type) =>{
    switch (type)
    {
      case 'courseList':
        return <i className={`iconfont ${styles.icon}`}>&#xe692;</i>
      case 'coachList':
        return <i className={`iconfont ${styles.icon}`}>&#xe61c;</i>
      case 'myCourse':
        return <i className={`iconfont ${styles.icon}`}>&#xe65a;</i>
      case 'classRecord':
        return <i className={`iconfont ${styles.icon}`}>&#xe63d;</i>
      case 'consumeRecord':
        return <i className={`iconfont ${styles.icon}`}>&#xe6f6;</i>
      case 'reservationRecord':
        return <i className={`iconfont ${styles.icon}`}>&#xe656;</i>
      case 'setBreaks':
        return <i className={`iconfont ${styles.icon}`}>&#xe693;</i>
      default:
        return null
    }
  }
  return (
    <div className={styles.menuBar}>
      {iconGenerator(menu.icon)}
      <a>{menu.title}</a>
    </div>
  )
}

export default MenuBar;
