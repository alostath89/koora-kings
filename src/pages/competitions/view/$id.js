import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from '../../../../src/utils'
import { connect } from 'dva'
import {
  Form,
  Descriptions,
  Col,
  Row,
  Avatar,
  Divider,
  Card,
  Popconfirm,
  Table,
} from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Page } from '../../../../src/components'
import _ from 'lodash'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import styles from '../components/Competitions.less'
import moment from 'moment'

@withI18n()
@connect(({ loading }) => ({ loading }))
class ViewCompetition extends PureComponent {
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
      type: 'competitions/details',
      payload: {
        id,
      },
    })
  }

  render() {
    const {
      history: {
        location: { pathname },
      },
      loading: { effects },
      competitions: { details },
    } = this.props
    const viewMode = pathname.includes('view')
    return (
      <Page inner loading={viewMode ? effects['competitions/details'] : false}>
        <Row type="flex" justify="center">
          <Col lg={24} md={24} sm={24} xs={24}>
            <Descriptions title="Competition Info">
              <Descriptions.Item label="Id">{details?.id}</Descriptions.Item>
              <Descriptions.Item label="Name">
                {details?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Arabic Name">
                {details?.name_ar}
              </Descriptions.Item>
              <Descriptions.Item label="League">
                {details?.league?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Logo">
                <Avatar size="large" src={details?.logo} />
              </Descriptions.Item>
              <Descriptions.Item label="Number Of Rounds">
                {details.number_of_rounds}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Page>
    )
  }
}

ViewCompetition.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(state => {
  return {
    loading: state.loading,
    competitions: state.competitions,
  }
})(Form.create()(ViewCompetition))
