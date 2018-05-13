import React,{Component} from 'react';
import styles from './index.less'
import { routerRedux } from 'dva/router'
import PropTypes from 'prop-types';

class Coach extends Component{
  render(){
    const {dispatch, coach} = this.props;
    const redirect = (path) => {
      dispatch(routerRedux.push({ pathname: path ,query:{id: coach.id}}));
    }
    return (
      <div className={styles.coach} onClick={()=>{redirect('/coachDetail')}}>
        <div className={styles.avatar}>
          <img src={coach.topimg&&coach.topimg.length>0?coach.topimg[0].resource_url:null}/>
        </div>
        <div className={styles.coachIntroduce}>
          <p>
            {coach.realname}
          </p>
          <p>
            {
              coach.introduce&&coach.introduce.length>0
              ? coach.introduce[0].description.substr(12)
              : '这个教练什么介绍都没有...'
            }
          </p>
        </div>
      </div>
    )
  }
}
Coach.propTypes = {
  dispatch: PropTypes.func.isRequired,
  coach: PropTypes.object.isRequired
};

export default Coach;
