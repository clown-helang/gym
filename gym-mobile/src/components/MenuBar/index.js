import React from 'react'
import styles from './index.less'
import {Icon} from 'antd'

function MenuBar({menu}) {
  return (
    <div className={styles.menuBar}>
        <span className={styles.icon}>
           <Icon type={menu.icon}/>
        </span>
      <a>{menu.title}</a>
    </div>
  )
}

export default MenuBar;
