import React from 'react'
import { connect } from 'dva';
import { Icon } from 'antd';
import Header from '../../components/Header';
import MenuBar from '../../components/MenuBar';
import { Preview, PreviewHeader, PreviewFooter, PreviewBody, PreviewItem, PreviewButton } from 'react-weui';

import styles from './index.less'
function ClassRecord({dispatch,user}) {
  const menu = {
    icon:'classRecord',
    title:'上课记录'
  };
  return (
    <div>
      <Header dispatch={dispatch} user={user}/>
      <MenuBar menu={menu}/>
      {
        user.classRecord.map((item,index)=>{
          return (
            <Preview style={{marginTop:5}} key={index}>
              <PreviewHeader>
                <PreviewItem label="课程" value={item.className} />
              </PreviewHeader>
              <PreviewBody>
                <PreviewItem label="教练" value={item.coachName}/>
                <PreviewItem label="时间" value={item.classTime}/>
                {
                  item.state === 'finish'
                  ? <PreviewItem label="状态" value="已完结"/>
                  : <PreviewItem label="状态" value="已预约"/>
                }
                {
                  item.comments !== ''
                    ? <PreviewItem label="评论" value={item.comments}/>
                    : ''
                }
              </PreviewBody>
              <PreviewFooter>
                {
                  item.comments === ''
                  ? <PreviewButton style={{color:'#3ddfc7'}}><Icon type='form'/> 评论</PreviewButton>
                  : <PreviewButton style={{color:'#3ddfc7'}}><Icon type='delete'/> 删除评论</PreviewButton>
                }
              </PreviewFooter>
            </Preview>
          )
        })
      }

    </div>
  )
}
function mapStateToProps({ user }) {
  return { user };
}
export default connect(mapStateToProps)(ClassRecord);
