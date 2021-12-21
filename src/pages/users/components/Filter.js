/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Trans, withI18n } from '@lingui/react'
import {
  Form,
  Button,
  Row,
  Col,
  DatePicker,
  Input,
  Select,
  Tag,
  Divider,
  message,
} from 'antd'
import Link from 'umi/link'
import queryString from 'query-string'
import { withRouter } from 'react-router'
import { connect } from 'dva'
import _ from 'lodash'
import styles from './List.less'
import { helpers } from 'utils'

const { Option } = Select

@withI18n()
@Form.create()
class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countryId: '',
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'common/getAllCountries',
      payload: {},
    })
  }

  handleSubmit = () => {
    const { form, history } = this.props
    const { countryId } = this.state
    const { validateFieldsAndScroll } = form

    validateFieldsAndScroll((errors, values) => {
      // check if user clicked on search without typing anything on search inputs
      // it will return an array on undefined values, so here we check if all its values undefined to not do anything
      if (
        Object.values(values)
          .map(row => row)
          .join('') === ''
      ) {
        return
      } else {
        values = {
          ...values,
          countryName: values.country,
          country: countryId,
        }
        helpers.checkEmptyFilters(values, '/users', history)
      }
    })
  }

  handleReset = () => {
    const { history, form } = this.props
    if (
      Object.values(form.getFieldsValue())
        .map(row => row)
        .join('') === ''
    ) {
      return
    } else {
      this.setState({
        countryId: '',
      })
      form.resetFields()
      history.replace(`/users`)
    }
  }

  handleChangeCountry = (e, key) => {
    this.setState({
      countryId: key?.key,
    })
  }

  handleSearchCountry = e => {
    const { dispatch } = this.props
    dispatch({
      type: 'common/getAllCountries',
      payload: {
        name: e,
      },
    })
  }

  render() {
    const {
      filter,
      form,
      common: { countries },
    } = this.props
    const { getFieldDecorator } = form
    const { countryName, mobile, username } = filter
    return (
      <div className={styles.searchAndFilter}>
        <Row gutter={24} type={'flex'} justify={'start'}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="User Name">
              {getFieldDecorator('username', {
                initialValue: username,
              })(<Input placeholder="Search User Name" />)}
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Mobile">
              {getFieldDecorator('mobile', {
                initialValue: mobile,
              })(<Input placeholder="Search Mobile Number" />)}
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Country">
              {getFieldDecorator('country', {
                initialValue: countryName,
              })(
                <Select
                  getPopupContainer={trigger => trigger.parentNode}
                  placeholder="Search Country"
                  onChange={this.handleChangeCountry}
                  onSearch={this.handleSearchCountry}
                  showSearch
                  style={{ width: '100%' }}
                >
                  {countries?.map(country => (
                    <Option value={country.name} key={country.id}>
                      {country.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={24}>
            <Row
              type="flex"
              align="middle"
              justify="space-between"
              gutter={12}
              className={styles.filterBtns}
            >
              <Col xs={24} md={12} lg={12}>
                <div className={styles.filterDiv}>
                  <Button
                    icon="search"
                    onClick={this.handleSubmit}
                    className="ant-btn ant-btn-primary searchBtn"
                    id="client-search"
                    style={{ marginRight: '20px' }}
                  >
                    Search
                  </Button>
                  <Button
                    icon="reload"
                    onClick={this.handleReset}
                    className="ant-btn ant-btn-primary searchBtn"
                    id="client-clean"
                  >
                    Reset
                  </Button>
                </div>
              </Col>
              <Col xs={24} md={12} lg={3}>
                <div className="mt10">
                  <Link
                    style={{ paddingTop: '3px' }}
                    to={`/users/create`}
                    className="ant-btn ant-btn-secondary"
                    id="client-add"
                  >
                    Create User
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default withRouter(
  connect(state => {
    return {
      loading: state.loading,
      users: state.users,
      common: state.common,
    }
  })(Filter)
)
