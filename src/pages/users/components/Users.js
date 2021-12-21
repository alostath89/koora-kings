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
  Popover,
} from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from '../../../../src/components'
import styles from './Users.less'
import _ from 'lodash'
import { withRouter } from 'react-router'
const colProps = {
  style: {
    padding: 32,
  },
}
@withI18n()
@connect(({ loading }) => ({ loading }))
class Users extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      payload: {},
      role: ['buyer'],
      roleOptions: [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
        { value: 'auto', label: 'Auto' },
      ],
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'common/getAllCountries',
      payload: {},
    })
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
    this.props.history.push(`/users`)
  }

  /* submit form */
  handleSubmit = () => {
    const {
      form,
      dispatch,
      history: {
        location: { pathname },
      },
      details,
    } = this.props
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
            country:
              details?.country_id?.name === values.country
                ? details?.country_id?.id
                : values.country,
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
      history: {
        location: { pathname },
      },
      common: { countries },
      details,
      form: { getFieldDecorator },
    } = this.props
    const editMode = pathname.includes('edit')
    const prefixSelector = getFieldDecorator('phoneCode', {
      initialValue: details?.phoneCode ? details?.phoneCode : '+966',
    })(
      <Select
        getPopupContainer={trigger => trigger.parentNode}
        placeholder="Code"
        id="phoneCode"
        className="prefix_st"
      >
        {countries?.map(code => (
          <Option value={code.country_code} id={code.country_code}>
            {code.country_code}
          </Option>
        ))}
      </Select>
    )
    const { roleOptions } = this.state

    return (
      <Page inner loading={editMode ? effects['users/details'] : false}>
        <Row type={'flex'} justify={'start'}>
          <Col lg={14} md={24} sm={24} xs={24}>
            <Form>
              <Row type={'flex'} justify={'start'}>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item hasFeedback label={<span> Full Name </span>}>
                    {getFieldDecorator('full_name', {
                      initialValue: details?.full_name,
                      rules: [
                        {
                          required: true,
                          message: 'Please enter the Full Name!',
                        },
                        {
                          min: 8,
                          message: 'Full Name should be at least 8 characters',
                        },
                        {
                          validator: (rule, value, callback) =>
                            helpers.checkEmptyString(rule, value, callback),
                        },
                      ],
                    })(<Input placeholder="Enter the Full Name" />)}
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item hasFeedback label={<span> Username </span>}>
                    {getFieldDecorator('username', {
                      initialValue: details?.username,
                      rules: [
                        {
                          required: true,
                          message: 'Please enter the username!',
                        },
                        {
                          min: 8,
                          message: 'Username should be at least 8 characters',
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
                  <Form.Item hasFeedback label={<span> E-mail </span>}>
                    {getFieldDecorator('email', {
                      initialValue: details?.email,
                      rules: [
                        {
                          required: true,
                          message: 'Please enter the email!',
                        },
                        {
                          validator: (rule, value, callback) => {
                            let validation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            if (value && validation.test(value.trim())) {
                              callback()
                              return
                            }
                            callback('Email format is not correct ')
                          },
                        },
                      ],
                    })(
                      <Input
                        placeholder="email@domain.com"
                        autoComplete="off"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item hasFeedback label={<span> Password </span>}>
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          required: !editMode,
                          message: 'Please choose a password!',
                        },
                        {
                          validator: this.checkPasswordLength,
                        },
                      ],
                    })(<Input.Password />)}
                  </Form.Item>
                  <Button onClick={this.generatePassword}>
                    Generate new password
                  </Button>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item label={<span> Role </span>}>
                    {getFieldDecorator('role', {
                      initialValue: details?.role_id?.name,
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
                  <Form.Item label={<span> Country </span>}>
                    {getFieldDecorator('country', {
                      initialValue: details?.country_id?.name,
                      rules: [
                        {
                          required: true,
                          message: 'Please choose a Country!',
                        },
                      ],
                    })(
                      <Select
                        getPopupContainer={trigger => trigger.parentNode}
                        placeholder="Choose Country"
                        size="small"
                        style={{ width: '100%' }}
                      >
                        {countries?.map(country => (
                          <Select.Option value={country.id} id={country.id}>
                            {country.name}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item
                    className="prefix_left"
                    label={<span>Mobile</span>}
                  >
                    {getFieldDecorator('mobile', {
                      initialValue: details?.mobile?.substr(
                        details?.mobile?.length - 9
                      ),
                      rules: [
                        {
                          required: true,
                          message: 'Mobile is required!',
                        },
                        {
                          pattern: '^[0-9]+$',
                          message:
                            ' Mobile Number should contains numbers only!',
                        },
                        {
                          min: 9,
                          max: 9,
                          message:
                            'Mobile Number should contains 9 numbers only!',
                        },
                      ],
                    })(
                      <Input
                        placeholder="Enter mobile number"
                        style={{ width: '100%' }}
                        addonBefore={prefixSelector}
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

Users.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default withRouter(
  connect(state => {
    return {
      loading: state.loading,
      users: state.users,
      common: state.common,
    }
  })(Form.create()(Users))
)
