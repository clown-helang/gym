import React from 'react'
import { connect } from 'dva';
import { Icon } from 'antd';
import {
  InfiniteLoader, Cells, CellsTitle, Cell, CellBody, CellFooter, Page, FormCell, TextArea,
  Preview, PreviewHeader, PreviewFooter, PreviewBody, PreviewItem, PreviewButton,Form
} from 'react-weui';
import Header from '../../components/Header';
import MenuBar from '../../components/MenuBar';

function ClassRecord({dispatch,personalCenter}) {
  const menu = {
    icon:'classRecord',
    title:'上课记录'
  };
  const onLoadMore = () =>{
    const { page_number } = personalCenter;
    dispatch({type:'personalCenter/setPageNumber',payload:{ page_number: page_number+1 }})
    dispatch({type:'personalCenter/getClassRecord'})
  }
  const classOver = (classlogid,isover) => {
    isover === '1'
    ? dispatch({type:'personalCenter/setClassOver',payload:{ classlogid }})
    : dispatch({type:'personalCenter/cancelAppointClass',payload:{ classlogid }})
  }
  const comments = (classlogid) =>{
    console.log('comments',classlogid)
    dispatch({type:'personalCenter/setCommentVisible',payload:{ commentVisible:true,classlogid }})
  }
  const handleComment = (e) =>{
    dispatch({type:'personalCenter/setComment',payload:{ comment:e.target.value }})
  }
  const cancelComment = () => {
    dispatch({type:'personalCenter/setCommentVisible',payload:{ commentVisible:false,classlogid:'' }})
  }
  const submitComment = () => {
    dispatch({type:'personalCenter/classComment'})
  }
  return (
    <div>
      <Header />
      <MenuBar menu={menu}/>
      <InfiniteLoader onLoadMore={onLoadMore}>
        <Page className="infinite" title="Infinite Loader" subTitle="滚动加载" >
        {
          personalCenter.classRecord.map((item,index)=>{
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
                {
                  personalCenter.commentVisible&&parseInt(personalCenter.classlogid) === parseInt(item.id)
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
                  personalCenter.commentVisible&&parseInt(personalCenter.classlogid) === parseInt(item.id)
                  ? <PreviewFooter>
                      <PreviewButton style={{color:'#3ddfc7'}} onClick={cancelComment}><Icon type='close-circle-o'/> 取消评论</PreviewButton>
                      <PreviewButton style={{color:'#3ddfc7'}} onClick={submitComment}><Icon type='check-circle-o'/> 提交评论</PreviewButton>
                    </PreviewFooter>
                  : item.isover === '0'
                    ? <PreviewFooter>
                      <PreviewButton style={{color:'#3ddfc7'}} onClick={()=>classOver(item.id,'2')}><Icon type='close-circle-o'/> 取消预约</PreviewButton>
                      <PreviewButton style={{color:'#3ddfc7'}} onClick={()=>classOver(item.id,'1')}><Icon type='check-circle-o'/> 结课确认</PreviewButton>
                    </PreviewFooter>
                    : item.isover === '1'&& item.studentsay === null
                      ? <PreviewFooter>
                        <PreviewButton style={{color:'#3ddfc7'}} onClick={()=>comments(item.id)}><Icon type='edit'/> 评论</PreviewButton>
                      </PreviewFooter>
                      : ''
                }
              </Preview>
            )
          })
        }

        </Page>
      </InfiniteLoader>
    </div>
  )
}
function mapStateToProps({ personalCenter }) {
  return { personalCenter };
}
export default connect(mapStateToProps)(ClassRecord);
