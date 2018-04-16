import React from 'react'
import { connect } from 'dva';
import TX from '../../assets/touxiang.jpg'
import styles from './index.less'
import yujia1 from '../../assets/yujia1.jpg'
import yujia2 from '../../assets/yujia2.jpg'
import yujia3 from '../../assets/yujia3.jpg'
import yujia4 from '../../assets/yujia4.jpg'
import yujia5 from '../../assets/yujia5.jpg'
import yujia from '../../assets/yujia.jpg'
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'

function CourseList({dispatch,courseList}) {
  const course = {
    url: yujia,
    name: '团体瑜伽课30节 ',
    oldPrice: 2000,
    vipPrice: 1888,
    introduce:[
      {
        url:yujia1,
        description:'瑜伽，不仅只是一套流行或时髦的健身运动这么简单。瑜伽是一个非常古老的能量知识修炼方法' +
        '，集哲学、科学和艺术于一身。瑜伽的基础建立在古印度哲学上，数千年来，心理、生理和精神上的戒律已经成为' +
        '印度文化中的一个重要组成部分。古代的瑜伽信徒发展了瑜伽体系，因为他们深信通过运动身体和调控呼吸，可以控制' +
        '心智和情感，以及保持健康的身体。'
      },
      {
        url:yujia2,
        description:'瑜伽起源于印度，距今有五千多年的历史文化被人们称为“世界的瑰宝”。瑜伽发源印度北部的喜马拉雅山麓地带，' +
        '古印度瑜伽修行者在大自然中修炼身心时，无意中发现各种动物与植物天生具有治疗、放松、睡眠、或保持清醒的方法，患病时能' +
        '不经任何治疗而自然痊愈。于是古印度瑜伽修行者根据动物的姿势观察、模仿并亲自体验，创立出一系列有益身心的锻炼系统，' +
        '也就是体位法。这些姿势历经了五千多年的锤炼，瑜伽教给人们的治愈法，让世世代代的人从中获益。'
      },
      {
        url:yujia3,
        description:'由公元前5000年开始，直到梨俱吠陀的出现为止，约有3000多年的时期，是瑜伽原始发展，缺少文字记载的时期，' +
        '瑜伽由一个原始的哲学思想逐渐发展成为修行的法门，其中的静坐、冥想及苦行，是瑜伽修行的中心。'
      },
      {
        url:yujia4,
        description:"瑜伽之祖帕坦伽利（Patanjali），一般认为他诞生于公元前约200至500年间的印度拉尔（Ra'r'h）地区。传说中，" +
        " 帕坦伽利的母亲哥妮卡（Gonika'）是个饱学的瑜伽行者，她一直希望将所学传给一位贤能之士但未能如愿。哥妮卡心里想说她的生" +
        "命所剩无几，她就向太阳神祈求，希望可以赐给她一位所寻觅的贤者。她双手捧水闭眼向太阳神祷告，正当她要献水给太阳神时，她睁" +
        "眼看到手中有一条小蛇，小蛇瞬间化成人形，向她说：“我想做你的孩子。”哥妮卡答应了，并为他取名Patanjali。Pat的意思是掉落，" +
        "an‘jali的意思是双手合十，因为帕坦伽利就像由天掉落至她手中的人，所以就取名为Patanjali（印地语：पतंजलि）。"
      },
      {
        url:yujia5,
        description:"瑜伽发展到了今天，已经成为世界广泛传播的一项身心锻炼修习法。从印度传至欧美、亚太、非洲等等，" +
        "因为它对心理的减压以及对生理的保健等明显作用而备受推崇。同时不断演变出了各种各式的瑜伽分支方法，比如热瑜伽、" +
        "哈他瑜伽、高温瑜伽、养生瑜伽等等，以及一些瑜伽管理科学。"
      },
    ]
  };
  const menu = {
    icon:'profile',
    title:`课程详情 —— ${course.name}`
  };
  const user = {
    name:'彭于晏',
    photo: TX
  };
  return (
    <div>
      <Header dispatch={dispatch} user={user}/>
      <MenuBar menu={menu}/>
      <div className={styles.courseLogo}>
        <img src={course.url}/>
      </div>
      <div className={styles.coursePrice}>
        <span>原价：{course.oldPrice}</span>
        <span>VIP价：{course.vipPrice}</span>
        <a>立即购买</a>
      </div>
      <div className={styles.coursesIntroduce}>
        {
          course.introduce.map((item,index)=>{
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
function mapStateToProps({ courseList }) {
  return { courseList };
}
export default connect(mapStateToProps)(CourseList);
