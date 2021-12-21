import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { helpers } from '../../../../src/utils'
import { connect } from 'dva'
import {
  Row,
  Col,
  Button,
  Form,
  Select,
  Input,
  Tag,
  Descriptions,
  Popconfirm,
  Card,
  Table,
  Divider,
} from 'antd'
import { withI18n } from '@lingui/react'
import { Page, ImageUploadCrop } from '../../../../src/components'
import styles from './Competitions.less'
import _ from 'lodash'
import { withRouter } from 'react-router'
import moment from 'moment'
import Round from './Round'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

@withI18n()
@connect(({ loading }) => ({ loading }))
class Competitions extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      roundNum: 0,
      selectedRecord: {},
      rounds: [],
      visible: false,
      editing: false,
      risk_points: [],
      selectedMatches: [],
      matches: [],
      tie: false,
      editModal: false,
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'common/allLeagues',
      payload: {},
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.loading?.effects['competitions/details'] !==
        this.props.loading?.effects['competitions/details'] &&
      this.props.details &&
      !_.isEmpty(this.props.details)
    ) {
      this.setState({
        rounds: this.props?.details?.rounds.map(row => {
          return {
            ...row,
            generatedID: Math.random()
              .toString(36)
              .substring(7),
            risk_points: row.risk_points.split(','),
          }
        }),
        logo: this.props?.details?.logo,
      })
    }
  }

  handleUpload = urls => {
    const { form } = this.props
    this.setState(
      {
        logo: urls[0],
      },
      () =>
        form.setFieldsValue({
          logo: urls[0],
        })
    )
  }

  handleViewRoundModal = () => {
    const { form } = this.props
    const { selectedRecord, rounds } = this.state
    form.setFieldsValue({
      round_name: `Round ${rounds.length}`,
      round_name_ar: ` راوند رقم ${rounds.length}`,
      multiplier: !_.isEmpty(selectedRecord)
        ? selectedRecord.multiplier
        : !_.isEmpty(rounds)
        ? rounds[0].multiplier
        : null,
      date: [],
    })
    this.setState({
      visible: true,
      risk_points: !_.isEmpty(selectedRecord)
        ? selectedRecord.risk_points
        : !_.isEmpty(rounds)
        ? rounds[0].risk_points
        : [],
      selectedMatches: [],
      matches: [],
      tie: false,
      editModal: false,
    })
  }
  cancelModal = () => {
    this.setState({
      visible: false,
    })
  }
  handleCloseTag = async removedTag => {
    const risk_points = this.state.risk_points.filter(tag => tag !== removedTag)
    await this.setState({ risk_points })
  }
  forMap = tag => {
    const tagElem = (
      <Tag
        closable
        onClose={e => {
          e.preventDefault()
          this.handleCloseTag(tag)
        }}
      >
        {tag}
      </Tag>
    )
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    )
  }

  handleAddRiskPoints = async points => {
    const { form } = this.props
    await this.setState({
      risk_points: points,
    })
    form.setFieldsValue({
      risk_points: points,
    })
  }

  setSelectedMatches = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedMatches: selectedRows,
    })
  }

  getMatchesList = async (momentDate, value) => {
    const {
      dispatch,
      form: { getFieldValue },
    } = this.props
    const league = getFieldValue('league')
    if (momentDate[0] && momentDate[1] && league) {
      const payload = {
        league,
        from: moment(momentDate[0]).unix(),
        to: moment(momentDate[1]).unix(),
      }
      await dispatch({
        type: 'competitions/matchesList',
        payload,
      })
      this.setState({
        matches: this.props.competitions?.matches,
      })
    }
  }

  onSelectNoTie = e => {
    this.setState({
      tie: !this.state.tie,
    })
  }

  handleNewRound = async () => {
    const { form } = this.props
    const { editModal, selectedRecord, rounds } = this.state
    const date = form.getFieldValue('date')
    let newRound = {
      generatedID: Math.random()
        .toString(36)
        .substring(7),
      name: form.getFieldValue('round_name'),
      name_ar: form.getFieldValue('round_name_ar'),
      from: moment(date[0]).unix(),
      to: moment(date[1]).unix(),
      multiplier: form.getFieldValue('multiplier'),
      tie: this.state.tie,
      risk_points: this.state.risk_points,
      matches: this.state.selectedMatches,
    }
    if (editModal) {
      const editedRound = {
        ...newRound,
        id: selectedRecord.id,
      }
      const updatedRounds = _.clone(rounds)
      this.setState({
        rounds: updatedRounds.map(row => {
          if (row.generatedID === selectedRecord.generatedID) {
            row = editedRound
          }
          return row
        }),
      })
    } else {
      this.setState({
        rounds: [...this.state.rounds, newRound],
      })
    }

    form.setFieldsValue({
      round_name: null,
      round_name_ar: null,
      multiplier: null,
      date: [],
    })
    this.setState({
      visible: false,
      risk_points: [],
      selectedMatches: [],
      tie: false,
      matches: [],
      editModal: false,
    })
  }

  confirmRemoveRound = selectedRecord => {
    const { rounds } = this.state
    this.setState({
      rounds: rounds.filter(row => !_.isEqual(row, selectedRecord)),
    })
  }

  handleEditRoundModal = async selectedRecord => {
    const { form, dispatch } = this.props
    form.setFieldsValue({
      round_name: selectedRecord.name,
      round_name_ar: selectedRecord.name_ar,
      multiplier: selectedRecord.multiplier,
      date:
        selectedRecord.from &&
        selectedRecord.from !== 'TBD' &&
        selectedRecord.to &&
        selectedRecord.to !== 'TBD'
          ? [moment.unix(selectedRecord.from), moment.unix(selectedRecord.to)]
          : [],
    })
    if (
      form.getFieldValue('league') &&
      selectedRecord.from &&
      selectedRecord.to
    ) {
      const payload = {
        league: form.getFieldValue('league'),
        from: selectedRecord.from,
        to: selectedRecord.to,
      }
      await dispatch({
        type: 'competitions/matchesList',
        payload,
      })
      this.setState({
        matches: this.props.competitions?.matches,
      })
    } else {
      message.error(
        'You have to choose League and dates for successfully finding matches!'
      )
    }
    this.setState({
      visible: true,
      selectedRecord,
      risk_points: selectedRecord.risk_points,
      selectedMatches: selectedRecord.matches,
      tie: selectedRecord.tie,
      editModal: true,
    })
  }

  /* cancel form */
  handleCancel = () => {
    this.props.history.push(`/competitions`)
  }

  /* submit form */
  handleSubmit = () => {
    const {
      form,
      dispatch,
      history: {
        location: { pathname },
      },
    } = this.props
    const { rounds, logo } = this.state
    form.validateFields(async (err, values) => {
      if (err) return
      else if (_.isEmpty(rounds)) return message.error('You should add rounds!')
      values = {
        ...values,
        logo,
        number_of_rounds:
          Number(values.number_of_rounds) || this.state.rounds.length,
        rounds: rounds.map(row => {
          return {
            ...row,
            risk_points: row.risk_points[0] === '' ? [] : row.risk_points,
            matches: row.matches.map(match => match.id.toString()),
          }
        }),
      }
      if (pathname.includes('edit')) {
        const id = pathname.split('/')[3]
        await dispatch({
          type: 'competitions/update',
          payload: {
            id,
            ...values,
          },
        })
      } else {
        dispatch({
          type: 'competitions/create',
          payload: values,
        })
      }
    })
  }

  render() {
    const {
      loading: { effects },
      history: {
        location: { pathname },
      },
      details,
      common: { leagues },
      form,
      form: { getFieldDecorator, getFieldValue },
    } = this.props
    const {
      rounds,
      visible,
      risk_points,
      matches,
      selectedMatches,
      tie,
    } = this.state
    const editMode = pathname.includes('edit')

    return (
      <Page inner loading={editMode ? effects['competitions/details'] : false}>
        <Row type={'flex'} justify={'start'}>
          <Col lg={14} md={24} sm={24} xs={24}>
            <Form>
              <Row type={'flex'} justify={'start'}>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item hasFeedback label={<span> Name </span>}>
                    {getFieldDecorator('name', {
                      initialValue: details?.name,
                      rules: [
                        {
                          required: true,
                          message: 'Please enter Competition Name!',
                        },
                        {
                          min: 8,
                          message: 'Name should be at least 8 characters',
                        },
                        {
                          validator: (rule, value, callback) =>
                            helpers.checkEmptyString(rule, value, callback),
                        },
                      ],
                    })(<Input placeholder="Enter the username" />)}
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item hasFeedback label={<span> Arabic Name </span>}>
                    {getFieldDecorator('name_ar', {
                      initialValue: details?.name_ar,
                      rules: [
                        {
                          required: true,
                          message: 'Please enter Competition Arabic Name!',
                        },
                        {
                          validator: (rule, value, callback) =>
                            helpers.checkEmptyString(rule, value, callback),
                        },
                      ],
                    })(<Input placeholder="Enter the username" />)}
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item label={<span> League </span>}>
                    {getFieldDecorator('league', {
                      initialValue: details?.league?.id,
                      rules: [
                        {
                          required: true,
                          message: 'Please choose a League!',
                        },
                      ],
                    })(
                      <Select
                        getPopupContainer={trigger => trigger.parentNode}
                        placeholder="Choose League"
                        size="small"
                        style={{ width: '100%' }}
                      >
                        {leagues?.map(league => (
                          <Select.Option value={league.id} key={league.id}>
                            {league.name}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item label={<span>Logo</span>}>
                    {getFieldDecorator('logo', {
                      initialValue: this.state?.logo,
                      rules: [
                        {
                          required: true,
                          message: 'Logo is required!',
                        },
                      ],
                    })(
                      <ImageUploadCrop
                        images={
                          this.state?.logo
                            ? !_.isArray(this.state?.logo)
                              ? [this.state?.logo]
                              : this.state?.logo
                            : null
                        }
                        handleUpload={this.handleUpload}
                        type="logo"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Divider orientation="left">Rounds</Divider>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item
                    hasFeedback
                    label={<span> Number of Rounds </span>}
                  >
                    {getFieldDecorator('number_of_rounds', {
                      initialValue:
                        details?.number_of_rounds ||
                        this.state.rounds.length ||
                        0,
                      rules: [
                        {
                          required: true,
                          message: 'Please enter Rounds Number!',
                        },
                        {
                          pattern: /^[0-9]+$/,
                          message:
                            'Entered value should be positive numbers only!',
                        },
                      ],
                    })(<Input placeholder="Enter Rounds Number" />)}
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  {!getFieldValue('league') ? (
                    <Tag color="red" style={{ marginBottom: '10px' }}>
                      Choose League First!
                    </Tag>
                  ) : null}
                </Col>
                <Col lg={5} md={5} sm={12} xs={12}>
                  <Button
                    disabled={!getFieldValue('league')}
                    type="primary"
                    style={{ marginBottom: '30px' }}
                    className={styles.primaryBtn}
                    onClick={this.handleViewRoundModal}
                  >
                    Add Round
                  </Button>
                </Col>

                <Round
                  form={this.props.form}
                  roundNum={rounds.length}
                  visible={visible}
                  handleNewRound={this.handleNewRound}
                  cancelModal={this.cancelModal}
                  risk_points={risk_points}
                  forMap={this.forMap}
                  handleAddRiskPoints={this.handleAddRiskPoints}
                  getMatchesList={(momentDate, value) =>
                    this.getMatchesList(momentDate, value)
                  }
                  selectedMatches={selectedMatches}
                  matches={matches}
                  handleSelectMatches={this.setSelectedMatches}
                  tie={tie}
                  onSelectNoTie={this.onSelectNoTie}
                />

                {!_.isEmpty(rounds) &&
                  rounds?.map(row => (
                    <Col lg={24} md={24} sm={24} xs={24}>
                      <Card
                        style={{ marginBottom: '20px' }}
                        title={row.round}
                        actions={[
                          <EditOutlined
                            onClick={() => this.handleEditRoundModal(row)}
                            key="edit"
                          />,
                          <Popconfirm
                            key="delete"
                            title={
                              <p>Are you sure you want to delete this Round?</p>
                            }
                            onConfirm={() => this.confirmRemoveRound(row)}
                            onCancel={this.cancel}
                          >
                            <DeleteOutlined key="delete" />
                          </Popconfirm>,
                        ]}
                      >
                        <Descriptions>
                          <Descriptions.Item label="Round">
                            {row.name}
                          </Descriptions.Item>
                          <Descriptions.Item label="Arabic Name">
                            {row.name_ar}
                          </Descriptions.Item>
                          <Descriptions.Item label="No Tie">
                            {row.tie ? 'Yes' : 'No'}
                          </Descriptions.Item>
                          <Descriptions.Item label="Multiplier">
                            {row.multiplier}
                          </Descriptions.Item>
                          <Descriptions.Item label="Risk Points">
                            {row.risk_points.map(row => (
                              <span className={styles.riskPoints}>{row}</span>
                            ))}
                          </Descriptions.Item>
                        </Descriptions>
                        <Table
                          columns={[
                            {
                              title: 'From',
                              dataIndex: 'from',
                              key: 'from',
                              render: (text, record) =>
                                moment.unix(row.from).format('MM/DD/YYYY'),
                            },
                            {
                              title: 'To',
                              dataIndex: 'to',
                              key: 'to',
                              render: (text, record) =>
                                moment.unix(row.to).format('MM/DD/YYYY'),
                            },
                            {
                              dataIndex: 'localTeam',
                              key: 'localTeam',
                              render: (text, record) =>
                                record?.local_team
                                  ? record?.local_team?.name
                                  : record?.local_team_id?.name,
                            },
                            {
                              dataIndex: 'visitorTeam',
                              key: 'visitorTeam',
                              render: (text, record) =>
                                record?.visitor_team
                                  ? record?.visitor_team?.name
                                  : record?.visitor_team_id?.name,
                            },
                          ]}
                          dataSource={row.matches}
                          simple
                          showHeader={false}
                          bordered
                          pagination={false}
                          rowKey={record => record.id}
                        />
                      </Card>
                    </Col>
                  ))}
              </Row>
              <Row type={'flex'} justify={'end'}>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <Button
                    type="primary"
                    className={styles.primaryBtn}
                    onClick={this.handleSubmit}
                    loading={
                      effects['competitions/update'] ||
                      effects['competitions/create']
                    }
                  >
                    {editMode ? 'Save' : 'Create'}
                  </Button>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <Button
                    className={styles.secondaryBtn}
                    onClick={this.handleCancel}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Page>
    )
  }
}

Competitions.propTypes = {
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
  })(Form.create()(Competitions))
)
