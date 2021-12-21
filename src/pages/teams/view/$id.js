import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from '../../../../src/utils'
import { connect } from 'dva'
import { Form, Descriptions, Col, Row, Avatar, Divider } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from '../../../../src/components'
import styles from '../components/Teams.less'
import Users from '../components/Teams'

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
      type: 'teams/details',
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
      teams: { details },
    } = this.props
    const viewMode = pathname.includes('view')
    return (
      <Page inner loading={viewMode ? effects['teams/details'] : false}>
        <Row type="flex" justify="center">
          <Col lg={24} md={24} sm={24} xs={24}>
            <Descriptions title="User Info">
              <Descriptions.Item label="Id">{details?.id}</Descriptions.Item>
              <Descriptions.Item label="Name">
                {details?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Venue Name">
                {details?.venue_name}
              </Descriptions.Item>
              <Descriptions.Item label="League">
                {details?.league?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Logo">
                <Avatar
                  shape="square"
                  style={{ marginLeft: 8 }}
                  src={details?.logo}
                />
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
    teams: state.teams,
  }
})(Form.create()(EditUser))
