import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Form, Input, Table, Checkbox, DatePicker, Modal } from 'antd'
import { withI18n } from '@lingui/react'
import styles from './Competitions.less'
import _ from 'lodash'
import { withRouter } from 'react-router'
import moment from 'moment'
import EditableTagGroup from './riskPoints'
import { TweenOneGroup } from 'rc-tween-one'

const { RangePicker } = DatePicker

@withI18n()
@connect(({ loading }) => ({ loading }))
class Round extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  getMatchesList = (momentDate, value) =>
    this.props.getMatchesList(momentDate, value)

  render() {
    const {
      loading: { effects },
      form: { getFieldDecorator },
      roundNum,
      risk_points,
      selectedMatches,
      handleSelectMatches,
      matches,
      tie,
      visible,
    } = this.props
    const tagChild = risk_points?.map(this.props.forMap)
    const columns = [
      {
        dataIndex: 'date',
        key: 'date',
        render: (text, record) => moment.unix(text).format('MM/DD/YYYY HH:mm'),
      },
      {
        dataIndex: 'localTeam',
        key: 'localTeam',
        render: (text, record) => record?.local_team_id?.name,
      },
      {
        dataIndex: 'visitorTeam',
        key: 'visitorTeam',
        render: (text, record) => record?.visitor_team_id?.name,
      },
    ]
    return (
      <Modal
        title="Add Round"
        visible={this.props.visible}
        onOk={this.props.handleNewRound}
        onCancel={this.props.cancelModal}
      >
        <Row type={'flex'} justify={'start'}>
          <Col xs={24}>
            <Form.Item>
              {getFieldDecorator('round_name')(
                <Input placeholder={`Round ${roundNum}`} />
              )}
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item>
              {getFieldDecorator('round_name_ar')(
                <Input placeholder={` راوند رقم ${roundNum}`} />
              )}
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label={<span> Date </span>}>
              {getFieldDecorator('date', {
                rules: [
                  {
                    required: visible,
                    message: 'Please select start date!',
                  },
                ],
              })(
                <RangePicker
                  format={'DD/MM/YYYY HH:mm'}
                  placeholder={['From', 'To']}
                  getPopupContainer={trigger => trigger.parentNode}
                  onChange={this.getMatchesList}
                  showTime
                />
              )}
            </Form.Item>
          </Col>
          {!_.isEmpty(matches) && (
            <Col xs={24}>
              <Table
                rowSelection={{
                  selectedRowKeys: selectedMatches?.map(row => row.id),
                  onChange: (selectedRowKeys, selectedRows) =>
                    handleSelectMatches(selectedRowKeys, selectedRows),
                }}
                bordered
                className={styles.table}
                columns={columns}
                dataSource={matches}
                pagination={false}
                loading={effects['competitions/matchesList']}
                simple
                rowKey={record => record.id}
              />
            </Col>
          )}
          <Col xs={24}>
            <Form.Item label={<span>Multiplier (Confidence pints)</span>}>
              {getFieldDecorator('multiplier', {
                rules: [
                  {
                    pattern: /^[0-9]+$/,
                    message: 'Entered value should be positive numbers only!',
                  },
                ],
              })(<Input placeholder="Enter multiplier" />)}
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item>
              {getFieldDecorator('tie', {
                initialValue: tie,
              })(
                <Checkbox onClick={this.props.onSelectNoTie} checked={tie}>
                  No Tie
                </Checkbox>
              )}
            </Form.Item>
          </Col>
          <Col lg={24} md={24} sm={24} xs={24}>
            <Form.Item label={<span>Risk Point</span>}>
              {getFieldDecorator('risk_points')(
                <EditableTagGroup
                  risk_points={risk_points}
                  handleAddRiskPoints={this.props.handleAddRiskPoints}
                />
              )}
            </Form.Item>
            <div style={{ marginBottom: 16 }}>
              <TweenOneGroup
                enter={{
                  scale: 0.8,
                  opacity: 0,
                  type: 'from',
                  duration: 100,
                  onComplete: e => {
                    e.target.style = ''
                  },
                }}
                leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                appear={false}
              >
                {tagChild}
              </TweenOneGroup>
            </div>
          </Col>
        </Row>
      </Modal>
    )
  }
}

Round.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default withRouter(
  connect(state => {
    return {
      loading: state.loading,
      common: state.common,
      competitions: state.competitions,
    }
  })(Round)
)
