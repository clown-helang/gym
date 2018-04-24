import React from 'react'
import { connect } from 'dva';
import Header from '../../components/Header'
import MenuBar from '../../components/MenuBar'
import { Preview, PreviewHeader, PreviewFooter, PreviewBody, PreviewItem, PreviewButton } from 'react-weui';

function ConsumeRecord({dispatch,user}) {
  const menu = {
    icon:'tags-o',
    title:'消费记录'
  };
  return (
    <div>
      <Header dispatch={dispatch} user={user}/>
      <MenuBar menu={menu}/>
      <div>
        {
          user.consumeRecord.map((item,index) => {
            return (
              <Preview style={{marginTop:5}} key={index}>
                <PreviewHeader>
                  <PreviewItem label="总价" value={`￥ ${item.price}`} />
                </PreviewHeader>
                <PreviewBody>
                  <PreviewItem label="课程名称" value={`${item.courseName}`}/>
                  <PreviewItem label="购买时间" value={item.consume_time}/>
                </PreviewBody>
              </Preview>
            )
          })
        }
      </div>
    </div>
  )
}
function mapStateToProps({ user }) {
  return { user };
}
export default connect(mapStateToProps)(ConsumeRecord);
