import React,{Component} from 'react';
import {Upload, Icon, Modal, message} from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import {getSession} from '../../utils';
import {baseURL} from '../../utils/config';
import api from '../../utils/api';

let uuid = 100;
class UploadPicture extends Component{
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: []
    }
  }
  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url||file.response.successful_files[0].resource_url,
      previewVisible: true,
    });
  };
  onChange = ({file, fileList, event}) => {
    if (file.status === 'done') {
      let success_file=[{
        horizontal_resolution:file.response.successful_files[0].horizontal_resolution,
        name:file.response.successful_files[0].name,
        original_name:file.response.successful_files[0].original_name,
        url:file.response.successful_files[0].resource_url,
        size:file.response.successful_files[0].size,
        vertical_resolution:file.response.successful_files[0].vertical_resolution
      }];
      this.triggerChange(success_file);
    } else if (file.status === 'error') {
      message.error(`${file.name}`+window.appLocale.messages.uploadFailed);
    }
    this.setState({ fileList });
  };
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      if(value.length>0){
        this.setState({
          previewVisible: false,
          previewImage: value[0].url,
          fileList: [
            {
              uid: uuid++,
              name: value[0].name,
              status: 'done',
              url: value[0].url,
              horizontal_resolution:value[0].horizontal_resolution,
              original_name:value[0].original_name,
              size:value[0].size,
              vertical_resolution:value[0].vertical_resolution
            }
          ]
        });
      }else{
        this.setState({
          previewVisible: false,
          previewImage: '',
          fileList: []
        });
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    if (this.state.previewVisible !== nextState.previewVisible) {
      return true;
    }
    else if (nextProps.value.length>0 && this.state.fileList.length === 0) {
      return true;
    }
    else if (nextProps.value.length>0 && nextProps.value.length>0 === this.props.value.length>0) {
      return false;
    } else {
      return true;
    }
  }
  onRemove = (file) => {
    const token = getSession('token');
    let url=file.url||this.state.fileList[0].response.successful_files[0].resource_url;
    const payload = {
      token,
      urls:[url]
    };
    this.setState({fileList: []});
    this.triggerChange([]);
  };
  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      if (changedValue == undefined) {
        onChange([]);
      } else {
        onChange(changedValue);
      }
    }
  };

  render(){
    const headers = {
      "Authorization": 'Bearer ' + getSession("token")
    };
    const { previewVisible, previewImage } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">{window.appLocale.messages['common.upload']}</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={`${baseURL}${api.savePictures}`}
          headers={headers}
          listType="picture-card"
          fileList={this.state.fileList}
          onPreview={this.handlePreview}
          onChange={this.onChange}
          onRemove={this.onRemove}
        >
          {this.state.fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }

}
export default injectIntl(UploadPicture);
