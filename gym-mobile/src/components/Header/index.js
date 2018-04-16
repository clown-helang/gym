import React from 'react'
import styles from './index.less'
import barLogo from '../../assets/bar_logo.png'
import barBg from '../../assets/barBg.png'

function Header({user, type}) {
  return (
    <div>
      <div className={styles.belt} style={{backgroundImage: `url(${barBg})`}}>
        <div className={styles.beltLeft}>
          <img src={barLogo}/>
        </div>
        {
          type !== 'noUser'
          ? <div className={styles.beltRight}>
              <div className={styles.name}>
                <span>{user.name}</span>
              </div>
              <div className={styles.photo}>
                <img src={user.photo}/>
              </div>
            </div>
          : ''
        }
      </div>
    </div>
  )
}

export default Header;
