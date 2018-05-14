import React from 'react'
import styles from './index.less'
import barLogo from '../../assets/bar_logo.png'
import barBg from '../../assets/barBg.png'
import { getSession, setSession } from '../../utils';

function Header({ type }) {
  const name = getSession('realname')
  const headImgUrl = getSession('headimgurl')
  return (
    <div>
      <div className={styles.belt} style={{backgroundImage: `url(${barBg})`}}>
        <div className={styles.beltLeft}>
          <img src={barLogo}/>
        </div>
        {
          type !== 'noUser'
          ? <div className={styles.beltRight}>
              <div className={styles.photo}>
                <img src={headImgUrl}/>
              </div>
              <div className={styles.name}>
                <span>{name}</span>
              </div>

            </div>
          : ''
        }
      </div>
    </div>
  )
}

export default Header;
