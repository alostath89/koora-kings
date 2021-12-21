import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from '../../../../src/utils'
import { connect } from 'dva'
import { Form, Descriptions, Col, Row, Avatar } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import { withRouter } from 'react-router'

@withI18n()
@connect(({ loading }) => ({ loading }))
class ViewSponsoredContest extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const {
      dispatch,
      history: {
        location: { pathname },
      },
    } = this.props
    const id = pathname.split('/')[3]
    dispatch({
      type: 'common/detailsSponsoredKKContests',
      payload: {
        id,
      },
    })
  }

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
      history: {
        location: { pathname },
      },
      loading: { effects },
      common: { sponsoredKKContestsDetails },
    } = this.props
    const viewMode = pathname.includes('view')
    return (
      <Page
        inner
        loading={
          viewMode ? effects['common/detailsSponsoredKKContests'] : false
        }
      >
        <Row type="flex" justify="center">
          <Col lg={24} md={24} sm={24} xs={24}>
            <Descriptions title="KK Contest Info">
              <Descriptions.Item label="Id">
                {sponsoredKKContestsDetails?.id}
              </Descriptions.Item>
              <Descriptions.Item label="Name">
                {sponsoredKKContestsDetails?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Type">
                {sponsoredKKContestsDetails?.type}
              </Descriptions.Item>
              <Descriptions.Item label="Is Disable Autofinal?">
                {sponsoredKKContestsDetails?.is_disable_autofinal
                  ? 'True'
                  : 'False'}
              </Descriptions.Item>
              <Descriptions.Item label="Is Disable Confidence Points?">
                {sponsoredKKContestsDetails?.is_disable_confidence_points
                  ? 'True'
                  : 'False'}
              </Descriptions.Item>
              <Descriptions.Item label="Is Show In User Lobby?">
                {sponsoredKKContestsDetails?.is_disable_confidence_points
                  ? 'True'
                  : 'False'}
              </Descriptions.Item>
              <Descriptions.Item label="Logo">
                <Avatar size={200} src={sponsoredKKContestsDetails?.logo} />
              </Descriptions.Item>
              <Descriptions.Item label="Logo Prize">
                <Avatar
                  size={200}
                  src={sponsoredKKContestsDetails?.logo_prize}
                />
              </Descriptions.Item>
            </Descriptions>
            <Descriptions title="Banners">
              {sponsoredKKContestsDetails?.attachments?.map(row => (
                <Descriptions.Item>
                  <Avatar shape="square" size={200} src={row?.file} />
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Col>
        </Row>
      </Page>
    )
  }
}

ViewSponsoredContest.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default withRouter(
  connect(state => {
    return {
      loading: state.loading,
      KKContests: state.KKContests,
      common: state.common,
    }
  })(Form.create()(ViewSponsoredContest))
)
