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
        return <i className={`iconfont ${styles.icon}`} style={{fontSize:24}}>&#xe68c;</i>
      case 'coachDetail':
        return <i className={`iconfont ${styles.icon}`}>&#xe610;</i>
      case 'myCourse':
        return <i className={`iconfont ${styles.icon}`}>&#xe62b;</i>
      case 'classRecord':
        return <i className={`iconfont ${styles.icon}`} style={{fontSize:24}}>&#xe63d;</i>
      case 'consumeRecord':
        return <i className={`iconfont ${styles.icon}`}>&#xe6f6;</i>
      case 'consumeDetail':
        return <i className={`iconfont ${styles.icon}`}>&#xe610;</i>
      case 'reservationRecord':
        return <i className={`iconfont ${styles.icon}`}>&#xe656;</i>
      case 'setBreaks':
        return <i className={`iconfont ${styles.icon}`}>&#xe693;</i>
      case 'courseBooking':
        return <i className={`iconfont ${styles.icon}`}>&#xe62e;</i>
      case 'buyCourse':
        return <i className={`iconfont ${styles.icon}`}>&#xe747;</i>
      default:
        return null
    }
  }
  return (
    <div className={styles.menuBar}>
      {iconGenerator(menu.icon)}
      <span>{menu.title}</span>
    </div>
  )
}

export default MenuBar;
