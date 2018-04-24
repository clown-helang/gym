import React from 'react'
import { connect } from 'dva';
import TX from '../../assets/touxiang.jpg'
import styles from './index.less'
import pengyuyan1 from '../../assets/pengyuyan1.jpg'
import pengyuyan2 from '../../assets/pengyuyan2.jpg'
import pengyuyan3 from '../../assets/pengyuyan3.jpg'
import pengyuyan4 from '../../assets/pengyuyan4.jpg'
import pengyuyan from '../../assets/pengyuyan.jpg'
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'
import { routerRedux } from 'dva/router'
function CoachDetail({dispatch,coachDetail}) {
  const coach = {
    url: pengyuyan,
    name: '彭于晏',
    phone: '15993857534',
    introduce:[
      {
        url:pengyuyan1,
        description:'彭于晏，1982年3月24日出生于台湾澎湖，中国台湾影视男演员、歌手。2002年，彭于晏出演了首部电视剧《爱情白皮书》' +
        ' 而踏入演艺圈 [1]  。2005年因出演仙侠剧《仙剑奇侠传》中唐钰一角而受到关注。2006年主演剧情片《六号出口》。2007年凭借爱情片' +
        '《基因决定我爱你》提名第44届台湾电影金马奖最佳新演员，并为金马短片单元制作片头，完成了个人导演处女作 [2-3]  。2009年发行首' +
        '张个人EP《非爱不可》。'
      },
      {
        url:pengyuyan2,
        description:'凭借电影《基因决定我爱你》与汤唯等人一起入围第44届台湾电影金马奖最佳新演员 [2]  ，并为金马短片单元制' +
        '作片头，完成导演处女作。同年，拍摄钮承泽执导的电视剧《我在垦丁天气晴》，入围2008年第43届台湾电视金钟奖戏剧节目最佳男主角 ' +
        '[16]  。因为拍戏的关系，彭于晏在垦丁一待就是四个月，因此认识了许多在地的好朋友，也进一步发现了属于垦丁特有的魅力与故事，' +
        '于是在2008年，彭于晏出版了《彭于晏·垦丁15x6》一书，把自己在垦丁的点点滴滴记录下来 [17]  。'
      },
      {
        url:pengyuyan3,
        description:'彭于晏与前经纪公司发生合约纠纷，期间，彭于晏接演了台湾励志电影《听说》，为该戏学习手语，这部与台北听障' +
        '奥运主题结合的影片上档后佳评如潮，成为2009年纯台湾资金与工作人员影片的开票冠军 [18]  。'
      },
      {
        url:pengyuyan4,
        description:"彭于晏出生于单亲家庭，自小父母离异，13岁随家人移民加拿大。他并不喜欢读书，却考上了温哥华最好的大学，读商科。他说，" +
        "其实我一直知道，前途与爱好是两回事。他爱漫画，爱篮球，但在看不到前途的时候，他从不执著"
      },
    ],
    courseList:[
      {
        id:'1',
        name: '腹肌塑性课'
      },
      {
        id:'2',
        name: '完美胸型塑造'
      }
    ],
  };
  const menu = {
    icon:'profile',
    title:`教练详情`
  };
  const user = {
    name:'彭于晏',
    photo: TX
  };
  const redirect = (path) => {
    dispatch(routerRedux.push({ pathname: path }));
  }
  return (
    <div>
      <Header dispatch={dispatch} user={user}/>
      <MenuBar menu={menu}/>
      <div className={styles.coach}>
        <div className={styles.avatar}>
          <img src={coach.url}/>
        </div>
        <div className={styles.coachBasicInfor}>
          <p>{coach.name}</p>
          <p>联系方式：{coach.phone}</p>
        </div>
      </div>
      <div className={styles.professorCourse}>
        <p>教授课程</p>
        {
          coach.courseList.map((item,index)=>{
            return (
              <div className={styles.course} key={index}>
                <div className={styles.courseName}>{item.name}</div>
                {
                  index===0
                  ? <div className={styles.button} onClick={()=>redirect('/buyCourse')}>购买</div>
                  : <div className={styles.button2}>已购买</div>
                }

              </div>
            )
          })
        }
      </div>
      <div className={styles.coachIntroduce}>
        {
          coach.introduce.map((item,index)=>{
            return (
              <div key={index} className={styles.introduceSection}>
                <p>{item.description}</p>
                <img src={item.url}/>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
function mapStateToProps({ coachDetail }) {
  return { coachDetail };
}
export default connect(mapStateToProps)(CoachDetail);
