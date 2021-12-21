import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from '../../../../src/utils'
import { connect } from 'dva'
import { Form, Descriptions, Col, Row, Avatar, Divider } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'

@withI18n()
@connect(({ loading }) => ({ loading }))
class ViewUserContest extends PureComponent {
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
      type: 'userContests/details',
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
      userContests: { details },
    } = this.props
    const viewMode = pathname.includes('view')
    return (
      <Page inner loading={viewMode ? effects['userContests/details'] : false}>
        <Row type="flex" justify="center">
          <Col lg={24} md={24} sm={24} xs={24}>
            <Descriptions title="User Info">
              <Descriptions.Item label="Id">{details?.id}</Descriptions.Item>
              <Descriptions.Item label="Name">
                {details?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Type">
                {details?.type}
              </Descriptions.Item>
              <Descriptions.Item label="Is Disable Autofinal?">
                {details?.is_disable_autofinal ? 'True' : 'False'}
              </Descriptions.Item>
              <Descriptions.Item label="Is Disable Confidence Points?">
                {details?.is_disable_confidence_points ? 'True' : 'False'}
              </Descriptions.Item>
              <Descriptions.Item label="Is Show In User Lobby?">
                {details?.is_disable_confidence_points ? 'True' : 'False'}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Page>
    )
  }
}

ViewUserContest.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(state => {
  return {
    loading: state.loading,
    userContests: state.userContests,
  }
})(Form.create()(ViewUserContest))
