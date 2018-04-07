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
  // handleChange = (event) => {
  //   const max_length = 50;
  //   const _vaule = trim(event.target.value);
  //
  //   if(get_length(_vaule)>=max_length){
  //     this.props.dispatch({type:this.props.modalName, payload: {name:cut_str(_vaule,max_length)}});
  //   }else{
  //     this.props.dispatch({type:this.props.modalName, payload: {name:_vaule}});
  //   }
  // };
  render(){
    const {title, value} = this.props;
    return (
      <div style = {{display: 'inline-flex'}}>
        <h5 style = {{display: 'inline-block', width: 80, fontSize: 14, position: 'relative', top: 4}}>{title}</h5>
        <RangePicker />
      </div>
    );
  }
}

export default RangePickerBar;
