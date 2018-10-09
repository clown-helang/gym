import React from 'react';
import { connect } from 'dva';
import Header from '../../components/Header';
import MenuBar from '../../components/MenuBar';
import moment from 'moment-timezone';
import styles from './index.less';

let weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
class GroupClassAppoint extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dates:[
        {
          day: moment(),
          weekday: weekdays[moment().weekday()]
        },
        {
          day: moment().add(1,'days'),
          weekday: weekdays[moment().add(1,'days').weekday()]
        },
        {
          day: moment().add(2,'days'),
          weekday: weekdays[moment().add(2,'days').weekday()]
        },
        {
          day: moment().add(3,'days'),
          weekday: weekdays[moment().add(3,'days').weekday()]
        },
        {
          day: moment().add(4,'days'),
          weekday: weekdays[moment().add(4,'days').weekday()]
        },
      ],
      active: moment(),
    }
  }
  changeActive = (active) => {
    this.setState({active})
  };
  render(){
    const { dispatch, groupClassAppoint:{ courses } } = this.props;
    const menu = {
      icon:'courseList',
      title:'团课预约'
    };
    return (
      <div className={styles.groupClassAppoint}>
        <Header dispatch={dispatch} />
        <MenuBar menu={menu}/>

        <div className={styles.weekdays}>
          {
            this.state.dates.map((item,index)=>(
              <div key={index} className={styles.item} onClick={()=>this.changeActive(item.day)}>
                <div className={styles.weekday}>{item.weekday}</div>
                <div className={`${styles.day} ${moment(this.state.active).format('dd') === moment(item.day).format('dd') ? styles.active : ''}`}>
                  {moment(item.day).format('DD')}
                </div>
                {
                  index <= 2
                  ? <div className={styles.star}/>
                  : ''
                }
              </div>
            ))
          }
        </div>

        <div className={styles.courses}>
          {
            courses&&courses.map((item,index)=>(
              <div key={index} className={styles.course}>
                <div className={styles.date}>
                  {item.data?item.data.split(' ')[0]:''}
                </div>

                {
                  item.schedule.map((i,idx)=>(
                    <div className={styles.courseDetail} key={idx}>
                      <div className={styles.top}>
                        <span>{i.starttime.split(' ')[1]}-{i.endtime.split(' ')[1]}</span>
                        <span>{i.classname}</span>
                      </div>
                      <div className={styles.bottom}>
                        <div className={styles.left}>

                        </div>
                        <div className={styles.center}>
                          <p>教练：{i.teacherName}</p>
                          <p>
                            <span>人数：<label style={{color:'#3ddfc7'}}>{i.takepeopelsize}</label>/{i.mixpeopelsize}</span>
                            <span>截止：{i.endtime.split(' ')[1]}</span>
                          </p>
                        </div>
                        <div className={styles.right}>
                          <div className={styles.btn}>
                            未报名
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }

              </div>
            ))
          }
        </div>
      </div>
    )
  }

}
function mapStateToProps({ groupClassAppoint }) {
  return { groupClassAppoint };
}
export default connect(mapStateToProps)(GroupClassAppoint);
