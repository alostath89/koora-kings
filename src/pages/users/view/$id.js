import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { Form, Descriptions, Col, Row } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import styles from '../components/Users.less'
import Users from '../components/Users'

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
      type: 'users/details',
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
      users: { details },
      loading: { effects },
    } = this.props
    const viewMode = pathname.includes('view')
    return (
      <Page inner loading={viewMode ? effects['users/details'] : false}>
        <Row type="flex" justify="center">
          <Col lg={24} md={24} sm={24} xs={24}>
            <Descriptions title={`${details?.full_name} Info`}>
              <Descriptions.Item label="Id">{details?.id}</Descriptions.Item>
              <Descriptions.Item label="Role">
                {details?.role_id?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {details?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Username">
                {details?.username}
              </Descriptions.Item>
              <Descriptions.Item label="Full Name">
                {details?.full_name}
              </Descriptions.Item>
              <Descriptions.Item label="Verified">
                {details?.is_verified ? 'True' : 'False'}
              </Descriptions.Item>
              <Descriptions.Item label="Deleted">
                {details?.is_deleted ? 'True' : 'False'}
              </Descriptions.Item>
              <Descriptions.Item label="Activated">
                {details?.is_active ? 'True' : 'False'}
              </Descriptions.Item>
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
    users: state.users,
  }
})(Form.create()(EditUser))
