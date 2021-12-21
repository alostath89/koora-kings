/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from '../../../../src/components'
import { Trans, withI18n } from '@lingui/react'
import { Form, Button, Row, Col, Input, Select, Tag, Divider } from 'antd'
import Link from 'umi/link'
import styles from './List.less'
import queryString from 'query-string'
import { withRouter } from 'react-router'
import { connect } from 'dva'

const { Option } = Select
const { Search } = Input

const ColProps = {
  style: {
    marginBottom: 16,
  },
}

@withI18n()
@Form.create()
class Filter extends Component {
  handleFields = fields => {
    const { createTime } = fields
    if (createTime.length) {
      fields.createTime = [
        moment(createTime[0]).format('YYYY-MM-DD'),
        moment(createTime[1]).format('YYYY-MM-DD'),
      ]
    }
    return fields
  }

  handleSubmit = () => {
    const { form, history } = this.props
    const { validateFieldsAndScroll } = form

    let queryUrl = ''
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }

      if (Object.keys(values).length > 0) {
        queryUrl = `?${queryString.stringify(values)}`
      }

      history.replace(`/users${queryUrl || ''}`)
    })
  }

  handleReset = () => {
    const { form, history } = this.props
    const { getFieldsValue, setFieldsValue } = form

    const fields = getFieldsValue()

    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)

    history.replace(`/users`)
  }

  render() {
    const { onAdd, filter, form, i18n } = this.props
    const { getFieldDecorator } = form
    const { first_name, roles, phone_number, email } = filter

    let initialCreateTime = []
    if (filter.createTime && filter.createTime[0]) {
      initialCreateTime[0] = moment(filter.createTime[0])
    }
    if (filter.createTime && filter.createTime[1]) {
      initialCreateTime[1] = moment(filter.createTime[1])
    }

    return (
      <div className={styles.searchAndFilter}>
        <Row gutter={24}>
          <Divider orientation="left">Search & Filter</Divider>
          <Col {...ColProps} xs={24} md={12} lg={8}>
            <FilterItem label={i18n.t`Full Name`}>
              {getFieldDecorator('first_name', { initialValue: first_name })(
                <Search
                  placeholder={i18n.t`Search Full Name`}
                  onSearch={this.handleSubmit}
                />
              )}
            </FilterItem>
          </Col>
          <Col {...ColProps} xs={24} md={12} lg={8}>
            <FilterItem label={i18n.t`Phone`}>
              {getFieldDecorator('phone_number', {
                initialValue: phone_number,
              })(
                <Search
                  placeholder={i18n.t`Search Phone`}
                  onSearch={this.handleSubmit}
                />
              )}
            </FilterItem>
          </Col>
          <Col {...ColProps} xs={24} md={12} lg={8}>
            <FilterItem label={i18n.t`Email`}>
              {getFieldDecorator('email', {
                initialValue: email,
              })(
                <Search
                  placeholder={i18n.t`Search Email`}
                  onSearch={this.handleSubmit}
                />
              )}
            </FilterItem>
          </Col>
          <Col {...ColProps} xs={24} md={24} lg={24}>
            <Row
              type="flex"
              justify="space-between"
              className={styles.filterBtns}
            >
              <Col {...ColProps} xs={24} sm={24} md={24} lg={12}>
                <div>
                  <Button
                    className="margin-right searchBtn"
                    onClick={this.handleSubmit}
                  >
                    <Trans>Search</Trans>
                  </Button>
                  <Button onClick={this.handleReset} className="secondaryBtn">
                    <Trans>Reset</Trans>
                  </Button>
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
    }
  })(Filter)
)
