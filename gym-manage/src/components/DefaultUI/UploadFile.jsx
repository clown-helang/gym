import React,{Component} from 'react';
import {Upload, message, Button, Icon} from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import {getSession} from '../../utils';
import {baseURL} from '../../utils/config';
import api from '../../utils/api';
import messages from './messages';
import styles from './UploadFile.less';

let uuid = 0;
class UploadFiles extends Component{
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.value&&(typeof nextProps.value) === 'object'){
      let value = nextProps.value.successful_files?nextProps.value.successful_files:nextProps.value;
      let _fileList =this.state.fileList;
      if(value!==undefined&&this.props.value!==value&&value!==''){
        value.map(item=>{
          let flag=false;
          _fileList.map(value=>{
            if(value.resource_url===item.resource_url||value.resource_url===item.url){
              flag=true;
            }
          });
          if(!flag){
            if(item.id!==undefined){
              _fileList.push({
                uid: uuid++,
                name: item.original_name,
                status: 'done',
                url: item.resource_url,
                id:item.id
              })
            }else{
              _fileList.push({
                uid: uuid++,
                name: item.original_name,
                status: 'done',
                url: item.resource_url,
              })
            }
          }
        });
        this.setState({
          fileList: _fileList
        });
      }
    }
  }
  onChange = ({file, fileList, event}) => {
    if (file.status === 'done') {
      this.triggerChange(fileList);
    } else if (file.status === 'error') {
      message.error(`${file.name}`+this.props.intl.formatMessage(messages.form.uploadFailed));
    }
    this.setState({ fileList });

  };
  onRemove = (e) => {
    const _fileList = this.state.fileList.filter(item => item.uid!==e.uid);
    this.setState({
      fileList: _fileList
    });
    this.triggerChange(_fileList);
  };
  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      if (changedValue === undefined) {
        onChange('');
      } else {
        onChange(changedValue);
      }
    }
  };

  render(){
    const { target } = this.props;
    let url = '';
    switch(target){
      case 'ClassIntroduce':
        url = `${baseURL}${api.uploadClassIntroduce}`;break;
      case 'ClassBg':
        url = `${baseURL}${api.uploadClassBg}`;break;
      case 'TeacherPhoto':
        url = `${baseURL}${api.uploadTeacherPhoto}`;break;
      case 'TeacherIntroduce':
        url = `${baseURL}${api.uploadTeacherIntroduce}`;break;
    }
    const headers = {
      "Authorization": 'Bearer ' + getSession("token")
    };
    return (
      <Upload
        className={styles.upload}
        accept=".jpg,.png"
        action={url}
        listType='picture'
        headers={headers}
        onChange={this.onChange}
        fileList={this.state.fileList}
        onRemove={this.onRemove}>
        {
          this.state.fileList.length>0
            ?''
            :(
              <div>
                <Button>
                  <Icon type="upload"/>
                  {window.appLocale.messages['common.uploadPicture']}
                </Button>
                <span className={styles.uploadExtra}>
                  {window.appLocale.messages['common.uploadPictureTip']}
                </span>
              </div>
            )
        }
      </Upload>
    );
  }
}

export default injectIntl(UploadFiles);
