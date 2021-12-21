import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { Form, Descriptions, Col, Row, Avatar, Divider } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import styles from '../components/Leagues.less'
import Users from '../components/Leagues'

@withI18n()
@connect(({ loading }) => ({ loading }))
class EditUser extends PureComponent {
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
      type: 'leagues/details',
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
      leagues: { details },
      loading: { effects },
    } = this.props

    const viewMode = pathname.includes('view')
    return (
      <Page inner loading={viewMode ? effects['leagues/details'] : false}>
        <Row type="flex" justify="center">
          <Col lg={24} md={24} sm={24} xs={24}>
            <Descriptions title="User Info">
              <Descriptions.Item label="Id">{details?.id}</Descriptions.Item>
              <Descriptions.Item label="Name">
                {details?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Country">
                {details?.country?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Current Season">
                {details?.season?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Sport">
                {details?.sport_type}
              </Descriptions.Item>
              <Descriptions.Item label="Is Enabled">Enabled</Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Page>
    )
  }
}

EditUser.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(state => {
  return {
    loading: state.loading,
    leagues: state.leagues,
  }
})(Form.create()(EditUser))
