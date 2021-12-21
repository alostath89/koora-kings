import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { helpers, countryCodes } from '../../../../src/utils'
import { connect } from 'dva'
import {
  Row,
  Col,
  Button,
  Form,
  Select,
  Divider,
  Input,
  Radio,
  Tooltip,
  Icon,
  message,
} from 'antd'
import { withI18n } from '@lingui/react'
import { Page, ImageUploadCrop } from '../../../../src/components'
import styles from './Teams.less'
import _ from 'lodash'
import { withRouter } from 'react-router'
import BraftEditor from 'braft-editor'
const colProps = {
  style: {
    padding: 32,
  },
}
@withI18n()
@connect(({ loading }) => ({ loading }))
class Teams extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      leagueId: '',
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
      prevProps.loading?.effects['teams/details'] !==
        this.props.loading?.effects['teams/details'] &&
      this.props.details &&
      !_.isEmpty(this.props.details)
    ) {
      this.setState({
        leagueId: this.props?.details?.league,
        logo: this.props?.details?.logo,
      })
    }
  }
  /* cancel form */
  handleCancel = () => {
    this.props.history.push(`/teams`)
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
    form.validateFields(async (err, values) => {
      if (err) return message.error('Please Make sure all fields are filled!')
      values = {
        ...values,
        logo: values.logo[0],
      }
      if (pathname.includes('edit')) {
        const id = pathname.split('/')[3]
        await dispatch({
          type: 'teams/update',
          payload: {
            id,
            ...values,
          },
        })
      } else {
        dispatch({
          type: 'teams/create',
          payload: { ...values },
        })
      }
    })
  }

  handleChangeLeague = e => {
    const { dispatch } = this.props
    dispatch({
      type: 'common/allLeagues',
      payload: {
        name: e,
      },
    })
  }

  handleSelectLeague = (e, key) => {
    this.setState({
      leagueId: key?.key,
    })
  }

  handleUpload = (urls, type) => {
    const { form } = this.props
    this.setState(
      {
        [type]: urls,
      },
      () =>
        form.setFieldsValue({
          [type]: urls,
        })
    )
  }

  render() {
    const {
      loading: { effects },
      history: {
        location: { pathname },
      },
      details,
      common: { leagues },
      form: { getFieldDecorator },
    } = this.props
    const editMode = pathname.includes('edit')

    return (
      <Page inner loading={editMode ? effects['players/details'] : false}>
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
                          message: 'Please enter the username!',
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
                  <Form.Item hasFeedback label={<span> Venue Name </span>}>
                    {getFieldDecorator('venue_name', {
                      initialValue: details?.venue_name,
                      rules: [
                        {
                          required: true,
                          message: 'Please enter the Venue Name!',
                        },
                        {
                          validator: (rule, value, callback) =>
                            helpers.checkEmptyString(rule, value, callback),
                        },
                      ],
                    })(<Input placeholder="Enter the Venue Name" />)}
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
                        showSearch
                        onSearch={this.handleChangeLeague}
                        style={{ width: '100%' }}
                      >
                        {leagues?.map(league => (
                          <Select.Option key={league.id} value={league.id}>
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
                          !_.isArray(this.state?.logo)
                            ? [this.state?.logo]
                            : this.state?.logo
                        }
                        accept="image/png, image/jpg"
                        type="logo"
                        handleUpload={this.handleUpload}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row type={'flex'} justify={'end'}>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <Button
                    type="primary"
                    className={styles.primaryBtn}
                    onClick={this.handleSubmit}
                    loading={effects['teams/update'] || effects['teams/create']}
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

Teams.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default withRouter(
  connect(state => {
    return {
      loading: state.loading,
      teams: state.teams,
      common: state.common,
    }
  })(Form.create()(Teams))
)
