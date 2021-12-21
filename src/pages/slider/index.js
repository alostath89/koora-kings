import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import List from './components/List'
import { Col, Row } from 'antd'
import Link from 'umi/link'

@withI18n()
@connect(({ loading }) => ({ loading }))
class Slider extends PureComponent {
  render() {
    return (
      <Page inner loading={false}>
        <List />
      </Page>
    )
  }
}

Slider.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Slider
