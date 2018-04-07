import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {Layout} from 'antd';
import IndexHeader from '../../components/Home/Header';
import IndexSider from '../../components/Home/Sider';
import BreadcrumbUI from '../../components/DefaultUI/BreadcrumbUI';
import NavBar from '../../components/DefaultUI/NavBar';
import { injectIntl,FormattedMessage } from 'react-intl';
import { getSession, isTrue } from '../../utils';
import { menus } from '../../utils/config';
import messages from './messages';
import styles from './home.less';

class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      collapsed: false
    }
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render(){
    const {children, dispatch, home,intl:{formatMessage}} = this.props;
    const {user} = home;
    let path = [], title = '';

    console.log()
    home.path.map((item) => {
      if (isTrue(item)) {
        path.push({
          key: item,
          value: formatMessage(messages.BreadcrumbUI[item]),
        });
      }
    });
    if(home.path[home.path.length-1]){
      title = formatMessage(messages.BreadcrumbUI[home.path[home.path.length-1]])
    }
    const {Content} = Layout;
    const setUser = (user) => {
      dispatch({type:'home/setUser',payload:{user}})
    };
    const headerProps = { user };
    return (
      <Layout>
        <IndexSider menus = {menus} collapsed = {this.state.collapsed}/>
        <Layout>
          <Content>
            <IndexHeader {...headerProps} toggle ={this.toggle} collapsed = {this.state.collapsed}/>
            {
              path.length>0
              ? <div className={styles.titleAndBreadcrumb}>
                  <NavBar title={title} />
                  <div style = {{marginLeft:20,marginBottom:10}}>
                    <BreadcrumbUI path={path} />
                  </div>
                </div>
              : ''
            }
            <div className={styles.container}>
              {children||(
                <div className={styles.welcome}>
                  <FormattedMessage {...messages.welcometitle}/>
                </div>
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
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

export default injectIntl(connect(mapStateToProps)(Home));
