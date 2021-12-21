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
import { helpers } from '../../../../src/utils'

const { Option } = Select

@withI18n()
@Form.create()
class Filter extends Component {
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

  handleSubmit = () => {
    const { form, history } = this.props
    const { leagueId } = this.state
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
          leagueName: values.league,
          league: leagueId,
        }
        helpers.checkEmptyFilters(values, '/sponsoredContests', history)
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
        leagueId: '',
      })
      form.resetFields()
      history.replace(`/sponsoredContests`)
    }
  }

  handleChangeLeague = (e, key) => {
    this.setState({
      leagueId: key?.key,
    })
  }

  handleSearchLeague = e => {
    const { dispatch } = this.props
    dispatch({
      type: 'common/allLeagues',
      payload: {
        name: e,
      },
    })
  }

  render() {
    const {
      filter,
      form,
      common: { leagues },
    } = this.props

    const { getFieldDecorator } = form
    const { name, leagueName } = filter
    return (
      <div className={styles.searchAndFilter}>
        <Row gutter={24} type={'flex'} justify={'start'}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Team Name">
              {getFieldDecorator('name', {
                initialValue: name,
              })(<Input placeholder="Search Team Name" />)}
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="League">
              {getFieldDecorator('league', {
                initialValue: leagueName,
              })(
                <Select
                  getPopupContainer={trigger => trigger.parentNode}
                  placeholder="Search League"
                  style={{ width: '100%' }}
                  onChange={this.handleChangeLeague}
                  onSearch={this.handleSearchLeague}
                  showSearch
                >
                  {leagues?.map(league => (
                    <Option value={league.name} key={league.id}>
                      {league.name}
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
              <Col xs={24} md={12} lg={5}>
                <div className="mt10">
                  <Link
                    style={{ paddingTop: '3px' }}
                    to={`/sponsoredContests/create`}
                    className="ant-btn ant-btn-secondary"
                    id="client-add"
                  >
                    Create Sponsored Contests
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
      sponsoredContests: state.sponsoredContests,
      common: state.common,
    }
  })(Filter)
)
