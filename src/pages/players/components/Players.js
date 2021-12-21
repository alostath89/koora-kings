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
  Checkbox,
  Tooltip,
  Icon,
} from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import styles from './Players.less'
import _ from 'lodash'
import { withRouter } from 'react-router'
const colProps = {
  style: {
    padding: 32,
  },
}
@withI18n()
@connect(({ loading }) => ({ loading }))
class Players extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      payload: {},
      role: ['buyer'],
      roleOptions: [
        { value: 'goalkeeper', label: 'Goalkeeper' },
        { value: 'defender', label: 'Defender' },
        { value: 'midfield', label: 'Midfield' },
        { value: 'forward', label: 'Forward' },
      ],
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  /* Check User Name Length */
  checkNameLength = async (rule, value, callback) => {
    if (value && value.trim().length < 2) {
      await callback(`The ${rule} should be 2 characters at minimum`)
      return
    } else {
      if (value && value.trim().length > 15) {
        await callback(`The ${rule} should be 15 characters at maximum`)
        return
      }
    }
    await callback()
    return
  }

  /* Check Password Length */
  checkPasswordLength = async (rule, value, callback) => {
    if (value && value.trim().length > 8) {
      await callback()
      return
    }
    await callback('Password should be more than 8 digits ')
  }

  /* Role checkbox group */
  onChangeRole = checkedList => {
    this.setState({
      role: checkedList,
    })
  }

  /* cancel form */
  handleCancel = () => {
    this.props.history.push(`/players`)
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
    const { role, paymentError } = this.state
    form.validateFields(async (err, values) => {
      if (err) return err
      if (pathname.includes('edit')) {
        const id = pathname.split('/')[3]
        await dispatch({
          type: 'users/update',
          payload: {
            id,
            ...values,
            mobile: `${values.phoneCode}${values.mobile}`,
          },
        })
      } else {
        dispatch({
          type: 'users/create',
          payload: { ...values, mobile: `${values.phoneCode}${values.mobile}` },
        })
      }
    })
  }

  generatePassword = () => {
    const { form } = this.props
    const generator = require('generate-password')
    const password = generator.generate({
      length: 10,
      numbers: true,
    })
    form.setFieldsValue({
      password,
    })
  }

  render() {
    const {
      loading: { effects },
      userData,
      history: {
        location: { pathname },
      },
      details,
      form: { getFieldDecorator, getFieldValue, resetFields },
    } = this.props
    const editMode = pathname.includes('edit')
    const prefixSelector = getFieldDecorator('phoneCode', {
      initialValue: details?.phoneCode ? details?.phoneCode : '+966',
    })(
      <Select placeholder="Code" id="phoneCode" className="prefix_st">
        {countryCodes.map(code => (
          <Option value={code.dial_code} id={code.dial_code}>
            {code.dial_code}
          </Option>
        ))}
      </Select>
    )
    const { roleOptions } = this.state
    return (
      <Page inner loading={editMode ? effects['players/details'] : false}>
        <Row type={'flex'} justify={'start'}>
          <Col lg={14} md={24} sm={24} xs={24}>
            <Form>
              <Row type={'flex'} justify={'start'}>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item hasFeedback label={<span> Name </span>}>
                    {getFieldDecorator('name', {
                      initialValue: 'Claudio Andrés Bravo Muñoz',
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
                  <Form.Item label={<span> Role </span>}>
                    {getFieldDecorator('role', {
                      initialValue: 'Goalkeeper',
                      rules: [
                        {
                          required: true,
                          message: 'Please choose a Role!',
                        },
                      ],
                    })(
                      <Select
                        getPopupContainer={trigger => trigger.parentNode}
                        placeholder="Choose Role"
                        size="small"
                        style={{ width: '100%' }}
                      >
                        {roleOptions.map(item => (
                          <Select.Option value={item.value} key={item.value}>
                            {item.label}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item label={<span>Salary</span>}>
                    {getFieldDecorator('salary', {
                      initialValue: 510000,
                      rules: [
                        {
                          required: true,
                          message: 'Please enter Salary!',
                        },
                        {
                          validator: (rule, value, callback) => {
                            const numRegex = /^[0-9]+$/
                            if (
                              value &&
                              value.trim() !== '' &&
                              value.trim() > 0
                            ) {
                              if (numRegex.test(value.trim())) {
                                return callback()
                              }
                            } else {
                              return callback(
                                'Entered value should be positive numbers only!'
                              )
                            }
                          },
                        },
                      ],
                    })(<Input placeholder="Enter Salary" />)}
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item hasFeedback label={<span> Team Name </span>}>
                    {getFieldDecorator('teamName', {
                      initialValue: 'Manchester City',
                      rules: [
                        {
                          required: true,
                          message: 'Please enter the Team Name!',
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
                    })(<Input placeholder="Enter the Team Name" />)}
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item label={<span> League </span>}>
                    {getFieldDecorator('league', {
                      initialValue: 'English Premier League',
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
                        <Select.Option value={'English Premier League'}>
                          English Premier League
                        </Select.Option>
                        <Select.Option value={'Italy Serie A'}>
                          Italy Serie A
                        </Select.Option>
                        <Select.Option value={'UEFA Champions League'}>
                          UEFA Champions League
                        </Select.Option>
                      </Select>
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
                    loading={effects['users/update'] || effects['users/create']}
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

Players.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default withRouter(
  connect(state => {
    return {
      loading: state.loading,
      users: state.users,
    }
  })(Form.create()(Players))
)
