import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { injectIntl } from 'react-intl';
import { setSession,getSession } from '../../utils';
import styles from './sider.less';
import logo from '../../assets/logo.png'
const language_html = window.appLocale.language==='chi'?'':`index-${window.appLocale.language}.html`;

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class IndexSider extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      collapsed: false,
      activeHeadMenu:getSession('activeHeadMenu'),
      openKeys: getSession('openKeys'),
      rootSubmenuKeys:getSession('rootSubmenuKeys')
    }
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
    setSession('openKeys',this.state.openKeys);
    setSession('rootSubmenuKeys',this.state.openKeys);
  };
  componentDidMount(){
    window.setCollapsedState = this.toggle;
  }
  menuClick = ({ key }) => {
    const headerMenus = getSession('headerMenus');
    setSession('activeHeadMenu',key);
    this.setState({activeHeadMenu:key});
    window.location.href=key;
  };

  getIcon = icon => {
    if (typeof icon === 'string' && icon.indexOf('http') === 0) {
      return <img src={icon} alt="icon" className={`${styles.icon} sider-menu-item-img`} />;
    }
    if (typeof icon === 'string') {
      return <Icon type={icon} />;
    }
    return icon;
  };

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = item => {
    if (item.child && item.child.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.child);
      // 当无子菜单时就不展示菜单
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.icon
              ? (<span>{this.getIcon(item.icon)}<span>{item.name}</span></span>)
              : (item.name)
            }
            key={item.code}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return <Menu.Item key={item.path}>{this.getIcon(item.icon)}<span>{item.name}</span></Menu.Item>;
    }
  };
  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = menus => {
    if (!menus) {
      return [];
    }
    return menus.filter(item => item.name).map(item => this.getSubMenuOrItem(item)).filter(item => item);
  };
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
      this.setState({ rootSubmenuKeys:openKeys });
      setSession('openKeys',openKeys);
      setSession('rootSubmenuKeys',openKeys);
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
      this.setState({ rootSubmenuKeys:latestOpenKey ? [latestOpenKey] : [] });
      setSession('openKeys',latestOpenKey ? [latestOpenKey] : []);
      setSession('rootSubmenuKeys',latestOpenKey ? [latestOpenKey] : []);
    }
  };
  render() {
    const { menus, intl:{formatMessage} } = this.props;
    return (
      <Sider
        collapsed={this.state.collapsed}
        className={styles.Sider}
        width={240}
      >
        <div className={styles.logo} onClick={()=>{
          window.location.href='/';
          setSession('activeHeadMenu',null);
        }} style={{cursor:'pointer'}}>
          <img src={logo} alt="logo"/>
          <span style={{display:`${!this.state.collapsed ?'inline-block':'none'}`}}>
              {window.baseConfig.systemName[`${window.appLocale.language}`]}
          </span>
        </div>
        {
          menus.length>0
          ? <Menu
                  selectedKeys={this.state.activeHeadMenu?[this.state.activeHeadMenu]:[`/${menus[0].service}/${language_html}#/${menus[0].code}`]}
                  openKeys = {this.state.openKeys}
                  theme="dark"
                  mode="inline"
                  onClick={this.menuClick}
                  onOpenChange={this.onOpenChange}
            >
              {
                this.getNavMenuItems(menus)
              }
            </Menu>
          : ''
        }
      </Sider>
    )
  }
}

IndexSider.propTypes = {
  menus: PropTypes.array
};

export default injectIntl(IndexSider);
