import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Footer from '../../components/Home/Footer'
import styles from './index.less';
import footerBg from '../../assets/footer.png';
import 'react-weui/build/packages/react-weui.css';
import 'weui';
class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      collapsed: false
    }
  }
  render(){
    const {children, dispatch } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          {children||''}
        </div>
        <div className={styles.footer} style={{backgroundImage: `url(${footerBg})`}}>
          <Footer dispatch={dispatch} />
        </div>
      </div>
    )
  }

}

Home.propTypes = {
  dispatch: PropTypes.func,
  home: PropTypes.object
};

function mapStateToProps({ home }) {
  return { home };
}

export default connect(mapStateToProps)(Home);
