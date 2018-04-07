import React from 'react';
import { Input } from 'antd';
import { get_length, cut_str,trim } from '../../utils';
import styles from './searchbar.less';

/**
 * 搜索框
 */
const Search = Input.Search;
class SearchBar extends React.Component{
  constructor(props) {
    super(props);
  }
  handleChange = (event) => {
    const max_length = 50;
    const _vaule = trim(event.target.value);

    if(get_length(_vaule)>=max_length){
      this.props.dispatch({type:this.props.modalName, payload: {name:cut_str(_vaule,max_length)}});
    }else{
      this.props.dispatch({type:this.props.modalName, payload: {name:_vaule}});
    }
  };
  render(){
    const {title, tip, search, value} = this.props;
    return (
      <div className={styles.search}>
        <h5 className={styles.title}>{title}</h5>
        <Search enterButton placeholder={tip} onSearch={search} autoComplete="off" value={value} onChange={this.handleChange} />
      </div>
    );
  }
}

export default SearchBar;
