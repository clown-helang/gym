import React from 'react'
import { connect } from 'dva';
import { Icon } from 'antd';
import {
  InfiniteLoader, Cells, CellsTitle, Cell, CellBody, CellFooter, Page,
  Preview, PreviewHeader, PreviewFooter, PreviewBody, PreviewItem, PreviewButton
} from 'react-weui';
import Header from '../../components/Header';
import MenuBar from '../../components/MenuBar';

function ClassRecord({dispatch,user}) {
  const menu = {
    icon:'classRecord',
    title:'上课记录'
  };
  const onLoadMore = () =>{
    const { page_number } = user;
    dispatch({type:'user/setPageNumber',payload:{ page_number: page_number+1 }})
    dispatch({type:'user/getClassRecord'})
  }
  const classOver = (id,isover) => {
    console.log('classOver', id)
  }
  const comments = (id) =>{
    console.log('comments', id)
  }
  return (
    <div>
      <Header dispatch={dispatch} user={user}/>
      <MenuBar menu={menu}/>
      <InfiniteLoader onLoadMore={onLoadMore}>
        <Page className="infinite" title="Infinite Loader" subTitle="滚动加载" >
        {
          user.classRecord.map((item,index)=>{
            return (
              <Preview style={{marginTop:5}} key={index}>
                <PreviewHeader>
                  <PreviewItem label="课程" value={item.classname} />
                </PreviewHeader>
                <PreviewBody>
                  <PreviewItem label="教练" value={item.classtecher}/>
                  <PreviewItem label="时间" value={item.starttime+' ~ '+item.endtime}/>
                  {
                    item.isover === '0'
                      ? <PreviewItem label="状态" value="已预约"/>
                      : item.isover === '1'
                        ? <PreviewItem label="状态" value="已结课"/>
                        : <PreviewItem label="状态" value="已取消"/>
                  }
                  {
                    item.studentsay !== null||''
                    ? <PreviewItem label="评论" value={item.studentsay}/>
                    : ''
                  }
                </PreviewBody>
                <PreviewFooter>
                  {
                    item.isover === '0'
                      ? <div>
                          <PreviewButton style={{color:'#3ddfc7'}} onClick={()=>classOver(item.id,'2')}><Icon type='close-circle-o'/> 取消预约</PreviewButton>
                          <PreviewButton style={{color:'#3ddfc7'}} onClick={()=>classOver(item.id,'1')}><Icon type='check-circle-o'/> 结课确认</PreviewButton>
                        </div>
                      : item.isover === '1'&& item.studentsay === null
                        ? <PreviewButton style={{color:'#3ddfc7'}} onClick={()=>comments(item.id)}><Icon type='edit'/> 评论</PreviewButton>
                        : ''
                  }
                </PreviewFooter>
              </Preview>
            )
          })
        }
        </Page>
      </InfiniteLoader>
    </div>
  )
}
function mapStateToProps({ user }) {
  return { user };
}
export default connect(mapStateToProps)(ClassRecord);
