import React from 'react';
import { Icon } from 'antd'
import styles from './index.less'



function Header({dispatch, home}) {
  return (
    <div className={styles.footer}>
      <img src={logo}/>
    </div>
  )
}

export default Header;
