import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Helmet } from 'react-helmet'
import { Loader } from '../../src/components'
import { queryLayout } from 'utils'
import NProgress from 'nprogress'
import config from '../../src/utils/config'
import withRouter from 'umi/withRouter'

import PublicLayout from './PublicLayout'
import PrimaryLayout from './PrimaryLayout'
import CustomLayout from './CustomLayout'
import './BaseLayout.less'

const LayoutMap = {
  primary: PrimaryLayout,
  public: PublicLayout,
  custom: CustomLayout,
}

@withRouter
@connect(({ loading }) => ({ loading }))
class BaseLayout extends PureComponent {
  previousPath = ''

  render() {
    const { loading, children, location } = this.props
    let Container
    if (
      location?.pathname?.startsWith('/about') ||
      location?.pathname?.startsWith('/help')
    ) {
      Container = LayoutMap['public']
    } else {
      Container = LayoutMap[queryLayout(config.layouts, location?.pathname)]
    }
    const currentPath = location?.pathname + location?.search
    if (currentPath !== this.previousPath) {
      NProgress.start()
    }

    if (!loading.global) {
      NProgress.done()
      this.previousPath = currentPath
    }

    return (
      <Fragment>
        <Helmet>
          <title>{config.siteName}</title>
        </Helmet>
        <Loader fullScreen spinning={loading.effects['app/query']} />
        <Container>{children}</Container>
      </Fragment>
    )
  }
}

BaseLayout.propTypes = {
  loading: PropTypes.object,
}

export default BaseLayout
