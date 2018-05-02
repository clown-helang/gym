import React from 'react'
import { connect } from 'dva';
import TX from '../../assets/touxiang.jpg'
import styles from './index.less'
import Coach from '../../components/Coach'
import pengyuyan from '../../assets/pengyuyan.jpg'
import yuchunlei from '../../assets/yuchunlei.jpg'
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'

function CourseList({dispatch,courseList}) {
  const coach = [
    {
      url: yuchunlei,
      name: '于春雷 ',
      phone: '15592345687',
      description: [{
        url: '',
        description: '国家体育总局一级社会体育指导员，运动营养师导师，哥伦比亚运动营养师，健身营养师导师，私人教练培训导师 ' +
        '亚洲形体健身学院培训导师。赴国外学习和深造，青鸟健身私教训练部经理，国家健身教练考评员，。私人健身教练行业十年工作经验。' +
        '于春雷出生于1982年10月，2002年考入山西师范大学，2003年开始接触健身此后开始疯狂吸收各个方面的健身理念。2006年7月14日毕' +
        '业。两周后即在当年北京唯一的五星健身中心青鸟健身百盛店任教，07年4月至09年6月在青鸟健身百盛店私人教练，学习了先进的训练' +
        '理论和管理经验。并多次为北京电台拍摄外国人士健身事迹。'
      }]
    },
    {
      url: pengyuyan,
      name: '彭于晏 ',
      description: [{
        url: yuchunlei,
        description: '1982年3月24日出生于台湾澎湖，中国台湾影视男演员、歌手。2002年，彭于晏出演了首部电视剧《爱情白皮书》 ' +
        '而踏入演艺圈。2005年因出演仙侠剧《仙剑奇侠传》中唐钰一角而受到关注。2006年主演剧情片《六号出口》。2007年凭借爱情片' +
        '《基因决定我爱你》提名第44届台湾电影金马奖最佳新演员，并为金马短片单元制作片头，完成了个人导演处女作。2009年发行首张个' +
        '人EP《非爱不可》。2011年彭于晏凭借励志片《翻滚吧！阿信》提名第48届台湾电影金马奖最佳男主角。'
      }]
    },
    {
      url: yuchunlei,
      name: '于春雷 ',
      phone: '15592345687',
      description: [{
        url: '',
        description: '国家体育总局一级社会体育指导员，运动营养师导师，哥伦比亚运动营养师，健身营养师导师，私人教练培训导师 ' +
        '亚洲形体健身学院培训导师。赴国外学习和深造，青鸟健身私教训练部经理，国家健身教练考评员，。私人健身教练行业十年工作经验。' +
        '于春雷出生于1982年10月，2002年考入山西师范大学，2003年开始接触健身此后开始疯狂吸收各个方面的健身理念。2006年7月14日毕' +
        '业。两周后即在当年北京唯一的五星健身中心青鸟健身百盛店任教，07年4月至09年6月在青鸟健身百盛店私人教练，学习了先进的训练' +
        '理论和管理经验。并多次为北京电台拍摄外国人士健身事迹。'
      }]
    },
    {
      url: pengyuyan,
      name: '彭于晏 ',
      description: [{
        url: yuchunlei,
        description: '1982年3月24日出生于台湾澎湖，中国台湾影视男演员、歌手。2002年，彭于晏出演了首部电视剧《爱情白皮书》 ' +
        '而踏入演艺圈。2005年因出演仙侠剧《仙剑奇侠传》中唐钰一角而受到关注。2006年主演剧情片《六号出口》。2007年凭借爱情片' +
        '《基因决定我爱你》提名第44届台湾电影金马奖最佳新演员，并为金马短片单元制作片头，完成了个人导演处女作。2009年发行首张个' +
        '人EP《非爱不可》。2011年彭于晏凭借励志片《翻滚吧！阿信》提名第48届台湾电影金马奖最佳男主角。'
      }]
    },
  ];
  const menu = {
    icon:'coachList',
    title:'私教列表'
  };
  const user = {
    name:'彭于晏',
    photo: TX
  };

  return (
    <div>
      <Header dispatch={dispatch} user={user}/>
      <MenuBar menu={menu}/>
      <div className={styles.courses}>
        {
          coach.map((item,index) => <Coach key={index} coach={item} dispatch={dispatch}/>)
        }
      </div>
    </div>
  )
}
function mapStateToProps({ courseList }) {
  return { courseList };
}
export default connect(mapStateToProps)(CourseList);
