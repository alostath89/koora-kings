import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Layout, Button } from 'antd'
import { langFromPath } from 'utils'
import { Trans, withI18n } from '@lingui/react'
import classnames from 'classnames'
import config from '../../../src/utils/config'
import styles from './Header.less'
import './CustomHeader.less'
const { SubMenu } = Menu
@withI18n()
class CustomHeader extends PureComponent {
  handleClickMenu = e => {
    e.key === 'SignOut' && this.props.onSignOut()
  }
  render() {
    const { fixed, collapsed, onCollapseChange, pathname, i18n } = this.props
    const language = pathname.includes('ar') ? 'ar' : 'en'
    const menu = (
      <Menu mode="vertical" className={styles.customHeaderMenu_vertical}>
        <Menu.Item key="home">Home</Menu.Item>
        <Menu.Item key="faq">FAQ</Menu.Item>
        <Menu.Item key="company">Company</Menu.Item>
        <Menu.Item key="about">About Us</Menu.Item>
        <Menu.Item key="careers">Careers</Menu.Item>
        <Menu.Item key="blog">Blog</Menu.Item>
        <Menu.Item key="press">Press</Menu.Item>

        <Menu.Item key="signin">
          <div className={styles.buttons}>
            <Button type="primary">Get started now</Button>
            <Button>About US</Button>
          </div>
        </Menu.Item>
      </Menu>
    )
    const rightContent = (
      <Menu
        mode="horizontal"
        className={
          language === 'en'
            ? styles.customHeaderMenu
            : `${styles.customHeaderMenu} ${styles.customHeaderMenuAr}`
        }
      >
        <Menu.Item key="mail">{i18n.t`home`}</Menu.Item>
        <Menu.Item key="mail">FAQ</Menu.Item>
        <SubMenu
          key="SubMenu"
          title="Pages"
          className={styles.customHeaderMenu_pages}
        >
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="lang" className={styles.langIcon}>
          <img src={config.enFlag} alt="" />
          <span>English</span>
        </Menu.Item>
        <Menu.Item key="signin">
          <Button className={styles.customHeaderMenu_signIn}> Sign In </Button>
        </Menu.Item>
      </Menu>
    )
    return (
      <Layout.Header
        className={`customHeader ${classnames(styles.header, {
          [styles.fixed]: fixed,
          [styles.collapsed]: collapsed,
        })}`}
        id="layoutHeader"
      >
        <div
          className={
            language === 'en'
              ? `headerContainer`
              : `headerContainer headerContainerAr`
          }
          style={{ paddingTop: config.fixedHeader ? 72 : 0 }}
          id="primaryLayout"
        >
          <div className={`button ${styles.button}`}>
            <img alt="logo" src={config.logoPath} className="iconLogo" />
          </div>
          {/* {window.innerWidth >= 992 ? (
            <div className={styles.rightContainer}>{rightContent}</div>
          ) : (
            <div className={styles.customHeaderMenu_withFlag}>
              <img src={config.enFlag} alt="" />
              <div
                className={styles.expandButton}
                onClick={onCollapseChange.bind(this, !collapsed)}
              >
                {collapsed ? (
                  <Icon type="menu-fold" />
                ) : (
                  <Icon type="menu-unfold" />
                )}
              </div>
              {!collapsed ? menu : null}
            </div>
          )} */}
        </div>
      </Layout.Header>
    )
  }
}

CustomHeader.propTypes = {
  fixed: PropTypes.bool,
  user: PropTypes.object,
  menus: PropTypes.array,
  collapsed: PropTypes.bool,
  onSignOut: PropTypes.func,
  notifications: PropTypes.array,
  onCollapseChange: PropTypes.func,
  onAllNotificationsRead: PropTypes.func,
}

export default CustomHeader
