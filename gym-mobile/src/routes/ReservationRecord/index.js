import React from 'react'
import { connect } from 'dva';
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'
import { Preview, PreviewHeader, PreviewFooter, PreviewBody, PreviewItem, PreviewButton, Input, Form, FormCell,
  CellBody, CellHeader, Label, ButtonArea, TextArea} from 'react-weui';
import { getSession } from '../../utils';
import { Icon, Modal } from 'antd';
import moment from 'moment-timezone'
import styles from './index.less'

function warning() {
  const modal = Modal.warning({
    title: '温馨提示',
    content: '课程结束时间大于当前时间，不能强制结束',
  });
  setTimeout(() => modal.destroy(), 3000);
}

let _defaultValue = moment().format('YYYY-MM-DD').toString()
function ReservationRecord({dispatch,personalCenter}) {
  const { date,classRecord, teacherComment, commentVisible, groupClassSchedule,classlogid } = personalCenter;
  const menu = {
    icon:'reservationRecord',
    title:'预约记录'
  };
  const handleDateChange = (e) =>{
    dispatch({type:'personalCenter/setDate',payload:{date: e.target.value}})
    dispatch({type:'personalCenter/getTeacherClassRecord',payload:{
      classtecherid: getSession('id'),
      starttime:moment(e.target.value).format('YYYY-MM-DD')+" 00:00:00",
      endtime:moment(e.target.value).format('YYYY-MM-DD')+" 23:59:59",
    }})
    dispatch({type:'personalCenter/getGroupClassSchedule'})
  }
  console.log('classRecord',classRecord)
  console.log('groupClassSchedule',groupClassSchedule)
  const comments = (classlogid) => {
    dispatch({type:'personalCenter/setCommentVisible',payload:{commentVisible:true, classlogid}})
  }
  const cancelComment = () =>{
    dispatch({type:'personalCenter/setCommentVisible',payload:{commentVisible:false, classlogid: ''}})
  }
  const submitComment = (id,type) =>{
    console.log(3333,teacherComment)
    if(type === 'group'){
      dispatch({type:'personalCenter/groupClassTeacherComment',payload:{id,techersay:teacherComment}})
    } else{
      dispatch({type:'personalCenter/personalClassTeacherComment',payload:{id,techersay:teacherComment}})
    }
    dispatch({type:'personalCenter/setCommentVisible',payload:{commentVisible:false, classlogid: ''}})

  }
  const handleComment = (e) =>{
    console.log('e',e.target.value)
    dispatch({type:'personalCenter/setTeacherComment',payload:{ teacherComment:e.target.value }})
  }
  const classOver = (course) => {
    let flag = moment(course.endtime).isBefore(moment());
    console.log(flag,course,course.classtimetableid)
    if(!flag){
      warning()
    } else {
      dispatch({type:'personalCenter/teacherOverGroupClass',payload:{classtimetableid:course.id}})
    }
  }
  return (
    <div className={styles.box}>
      <Header />
      <MenuBar menu={menu}/>
      <Form>
        <FormCell>
          <CellHeader>
            <Label>选择日期</Label>
          </CellHeader>
          <CellBody>
            <Input type="date" name="date" value = {date} onChange={handleDateChange}/>
          </CellBody>
        </FormCell>
      </Form>
      {
        classRecord.map((item,index) => {
          if(item.type.toString()==='2'){
            return (
              <div key={index}>
                <div className={styles.reservationRecord}>
                  <div className={styles.recordHeader}>
                    <div className={styles.headerLeft}>
                      私教
                    </div>
                    <div className={styles.headerRight}>
                      <span>{item.classname}</span>
                    </div>
                  </div>
                  <div className={styles.bodyItem}>
                    <span>时间</span>
                    <span>{item.starttime.split(' ')[1]+' ~ '+item.endtime.split(' ')[1]}</span>
                  </div>
                  <div className={styles.bodyItem}>
                    <span>学员</span>
                    <span>{item.classstudent}</span>
                  </div>
                  {
                    !(item.techersay)
                      ? ''
                      : <div className={styles.bodyItem}>
                        <span style={{width:'30%'}}>评论</span>
                        <span style={{width:'70%'}}>{item.techersay}</span>
                      </div>
                  }

                  <div className={styles.bodyItem}>
                    <span style={{width:'30%'}}>状态</span>
                    <span style={{width:'70%'}}>{
                      item.isover === '0'
                        ? '已预约'
                        : item.isover === '1'
                        ? '已结课'
                        : '已取消'
                    }</span>
                  </div>
                </div>
                {
                  commentVisible&&parseInt(personalCenter.classlogid) === parseInt(item.id)
                    ? <Form style={{marginTop:0}} >
                      <FormCell>
                        <CellBody>
                          <TextArea placeholder="输入你的评论..."  onChange={handleComment} rows={3}  maxLength={200}/>
                        </CellBody>
                      </FormCell>
                    </Form>
                    : ''
                }
                {
                  commentVisible&&parseInt(personalCenter.classlogid) === parseInt(item.id)
                  ? <PreviewFooter style={{backgroundColor:'#fff'}}>
                      <PreviewButton style={{color:'#3ddfc7'}} onClick={cancelComment}><Icon type='close-circle-o'/> 取消评论</PreviewButton>
                      <PreviewButton style={{color:'#3ddfc7'}} onClick={()=>submitComment(item.id,'personal')}><Icon type='check-circle-o'/> 提交评论</PreviewButton>
                    </PreviewFooter>
                  : item.isover.toString() === '1'
                    ? !(item.studentsay)
                      ? <PreviewFooter style={{backgroundColor:'#fff'}}>
                          <PreviewButton style={{color:'#3ddfc7'}} onClick={()=>comments(item.id)}><Icon type='edit'/> 评论</PreviewButton>
                        </PreviewFooter>
                      : ''
                    : ''

                }
              </div>
            )
          }
        })
      }
      {
        groupClassSchedule.map((item,index) => {
          return (
            <div key={index}>
              <div className={styles.reservationRecord}>
                <div className={styles.recordHeader}>
                  <div className={styles.headerLeft}>
                    团课
                  </div>
                  <div className={styles.headerRight}>
                    <span>{item.classname}</span>
                  </div>
                </div>
                <div className={styles.bodyItem}>
                  <span style={{width:'30%'}}>时间</span>
                  <span style={{width:'70%'}}>{item.starttime.split(' ')[1]+' ~ '+item.endtime.split(' ')[1]}</span>
                </div>
                {
                  !(item.techersay)
                  ? ''
                  : <div className={styles.bodyItem}>
                      <span style={{width:'30%'}}>评论</span>
                      <span style={{width:'70%'}}>{item.techersay}</span>
                    </div>
                }

                <div className={styles.bodyItem}>
                  <span style={{width:'30%'}}>状态</span>
                  <span style={{width:'70%'}}>{
                    item.isover === '0'
                    ? '已预约'
                    : item.isover === '1'
                      ? '已结课'
                      : '已取消'
                  }</span>
                </div>
              </div>
              {
                commentVisible&&parseInt(personalCenter.classlogid) === parseInt(item.id)
                  ? <Form style={{marginTop:0}} >
                    <FormCell>
                      <CellBody>
                        <TextArea placeholder="输入你的评论..."  onChange={handleComment} rows={3}  maxLength={200}/>
                      </CellBody>
                    </FormCell>
                  </Form>
                  : ''
              }
              {
                commentVisible&&parseInt(personalCenter.classlogid) === parseInt(item.id)
                ? <PreviewFooter style={{backgroundColor:'#fff'}}>
                    <PreviewButton style={{color:'#3ddfc7'}} onClick={cancelComment}><Icon type='close-circle-o'/> 取消评论</PreviewButton>
                    <PreviewButton style={{color:'#3ddfc7'}} onClick={()=>submitComment(item.classtimetableid,'group')}><Icon type='check-circle-o'/> 提交评论</PreviewButton>
                  </PreviewFooter>
                : item.isover.toString() === '1'
                  ? !(item.techersay)
                    ? <PreviewFooter style={{backgroundColor:'#fff'}}>
                        <PreviewButton style={{color:'#3ddfc7'}} onClick={()=>comments(item.id)}><Icon type='edit'/> 评论</PreviewButton>
                      </PreviewFooter>
                    : ''
                  : <PreviewFooter style={{backgroundColor:'#fff'}}>
                      <PreviewButton style={{color:'#3ddfc7'}} onClick={()=>classOver(item)}><Icon type='check-circle-o'/> 结课确认</PreviewButton>
                    </PreviewFooter>
              }
            </div>
          )
        })
      }

    </div>
  )
}
function mapStateToProps({ personalCenter }) {
  return { personalCenter };
}
export default connect(mapStateToProps)(ReservationRecord);
