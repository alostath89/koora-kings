import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { Form, Descriptions, Col, Row, Avatar, Divider } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'

@withI18n()
@connect(({ loading }) => ({ loading }))
class ViewPlayer extends PureComponent {
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
      loading: { effects },
    } = this.props
    const editMode = pathname.includes('edit')
    return (
      <Page inner loading={editMode ? effects['users/details'] : false}>
        <Row type="flex" justify="center">
          <Col lg={24} md={24} sm={24} xs={24}>
            <Descriptions title="User Info">
              <Descriptions.Item label="Id">2</Descriptions.Item>
              <Descriptions.Item label="Name">
                Claudio Andrés Bravo Muñoz
              </Descriptions.Item>
              <Descriptions.Item label="Salary">5200.00</Descriptions.Item>
              <Descriptions.Item label="Photo Image">
                <Avatar shape="square" style={{ marginLeft: 8 }} src={''} />
              </Descriptions.Item>
              <Descriptions.Item label="Team">مانشستر سيتي</Descriptions.Item>
              <Descriptions.Item label="League">
                الدوري الإنجليزي الممتاز
              </Descriptions.Item>
              <Descriptions.Item label="Position">Goalkeeper</Descriptions.Item>
            </Descriptions>
            <Descriptions title="Player stats">
              <Descriptions.Item label="Goal">2</Descriptions.Item>
              <Descriptions.Item label="Assist">1</Descriptions.Item>
              <Descriptions.Item label="Shot Total">7</Descriptions.Item>
              <Descriptions.Item label="Shot On Goal">9</Descriptions.Item>
              <Descriptions.Item label="Tackle Won" />
              <Descriptions.Item label="League">3</Descriptions.Item>
              <Descriptions.Item label="Intercept">22</Descriptions.Item>
              <Descriptions.Item label="Yellow Card">3</Descriptions.Item>
              <Descriptions.Item label="Red Card" />
              <Descriptions.Item label="Penalty Miss">8</Descriptions.Item>
              <Descriptions.Item label="Fouls Drawn">7</Descriptions.Item>
              <Descriptions.Item label="Total Crosses">4</Descriptions.Item>
              <Descriptions.Item label="Block">4</Descriptions.Item>
              <Descriptions.Item label="Save">3</Descriptions.Item>
              <Descriptions.Item label="Cleansheet">3</Descriptions.Item>
              <Descriptions.Item label="Win">3</Descriptions.Item>
              <Descriptions.Item label="Penalty Save">10</Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Page>
    )
  }
}

ViewPlayer.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(state => {
  return {
    loading: state.loading,
    players: state.players,
  }
})(Form.create()(ViewPlayer))
