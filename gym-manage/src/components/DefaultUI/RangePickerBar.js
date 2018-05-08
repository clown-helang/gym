import React from 'react';
import { DatePicker } from 'antd';
import { get_length, cut_str,trim } from '../../utils';
import styles from './searchbar.less';
const { RangePicker } = DatePicker;

/**
 * 搜索框
 */
class RangePickerBar extends React.Component{
  constructor(props) {
    super(props);
  }
  onChange = (date, dateString) => {
    const payload = {};
    payload[this.props.valueName] = dateString||[];
    this.props.dispatch({type:this.props.modalName, payload});
  };
  render(){
    const {title, value} = this.props;
    return (
      <div style = {{display: 'inline-flex',marginRight:50}}>
        <h5 style = {{display: 'inline-block', width: 90, fontSize: 14, position: 'relative', top: 4}}>{title}</h5>
        <RangePicker onChange={this.onChange} />
      </div>
    );
  }
}

export default RangePickerBar;
