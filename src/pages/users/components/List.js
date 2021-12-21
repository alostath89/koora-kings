import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Switch, Icon, Tag, Row, Col, Popconfirm } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import Link from 'umi/link'
import styles from './List.less'
import { connect } from 'dva'
import { Page } from '../../../components'
import queryString from 'query-string'
import { withRouter } from 'react-router'

@withI18n()
class List extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pagination: { pageSize: 25, current: 1, total: 0 },
    }
  }

  componentDidMount() {
    const { dispatch, location } = this.props
    this.paginate(location.search)
  }

  componentWillReceiveProps(nextProps) {
    const { location, total } = this.props

    if (total && this.state.pagination.total !== total) {
      this.setState(prevState => ({
        pagination: {
          ...prevState.pagination,
          total,
        },
      }))
    }

    if (
      location.search !== nextProps.location.search &&
      nextProps.location.pathname !== '/login'
    ) {
      this.paginate(nextProps.location.search)
    }
  }

  paginate = search => {
    const { location, dispatch } = this.props
    let payload = {}
    let searchQuery = {}
    let filteredInfo = {}
    let pagination = { ...this.state.pagination }

    if (search) {
      const searchQuery = queryString.parse(search)
      if (searchQuery.page) {
        payload.page = parseInt(searchQuery.page)
        pagination.current = searchQuery.page
      }

      if (searchQuery.username) {
        payload.username = searchQuery.username
        pagination.username = searchQuery.username
      }

      if (searchQuery.mobile) {
        payload.mobile = searchQuery.mobile
        pagination.mobile = searchQuery.mobile
      }

      if (searchQuery.country) {
        payload.country = searchQuery.country
        pagination.country = searchQuery.country
      }

      this.setState({
        searchQuery: { ...searchQuery },
        pagination: { ...pagination },
        filteredInfo: { ...filteredInfo },
      })

      payload.limit = this.state.pagination.pageSize

      dispatch({ type: 'users/list', payload })
    } else {
      payload.limit = this.state.pagination.pageSize
      payload.page = this.state.pagination.current
      dispatch({ type: 'users/list', payload })
    }
  }

  onPaginationChange = (options, filters, sorter) => {
    const { history } = this.props
    const { current } = options
    const { pagination } = this.state

    let queryParams = history.location.search
      ? queryString.parse(history.location.search)
      : {}
    let queryUrl = ''

    // set page number to current page
    this.setState({ pagination: { ...pagination, current } })

    queryParams.page = current

    if (Object.keys(queryParams).length > 0) {
      queryUrl = `?${queryString.stringify(queryParams)}`
    }

    history.replace(`/users${queryUrl || ''}`)
  }

  confirmRemove = record => {
    const { dispatch } = this.props
    dispatch({
      type: 'users/removeUser',
      payload: {
        id: record.id,
      },
    })
  }

  handleToggleEnable = (checked, record) => {
    const { dispatch } = this.props
    dispatch({
      type: 'users/toggleUsers',
      payload: {
        id: record.id,
        active: !record.is_active,
      },
    })
  }

  render() {
    const {
      loading: { effects },
      users: { total, list },
    } = this.props

    const { pagination } = this.state
    const { page } = queryString.parse(location.search)

    const columns = [
      {
        title: <Trans>ID</Trans>,
        dataIndex: 'id',
        key: 'id',
        width: 150,
      },
      {
        title: <Trans>Username</Trans>,
        dataIndex: 'username',
        key: 'username',
        width: 200,
      },
      {
        title: <Trans>E-mail</Trans>,
        dataIndex: 'email',
        key: 'email',
        width: 150,
      },
      {
        title: <Trans>Phone</Trans>,
        dataIndex: 'mobile',
        key: 'mobile',
        width: 150,
      },
      {
        title: <Trans>Full Name</Trans>,
        dataIndex: 'full_name',
        key: 'full_name',
        width: 150,
      },
      {
        title: <Trans>Country</Trans>,
        dataIndex: 'country',
        key: 'country',
        render: (text, record) => (
          <Tag color="green">{record.country_id?.name}</Tag>
        ),
        width: 150,
      },
      {
        title: <Trans>Activate/Deactivate</Trans>,
        dataIndex: 'isActive',
        key: 'isActive',
        fixed: 'right',
        render: (text, record) => (
          <Popconfirm
            title={
              <p>
                {record.is_active
                  ? 'Do you want to deactivate the user?'
                  : 'Do you want to Activate the user?'}
              </p>
            }
            onConfirm={checked => this.handleToggleEnable(checked, record)}
            onCancel={this.cancel}
          >
            <Switch
              disabled={effects['users/toggleUsers']}
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              checked={record.is_active}
            />
          </Popconfirm>
        ),
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        fixed: 'right',
        width: 150,
        render: (text, record) => (
          <div>
            <Link className={styles.editLink} to={`/users/edit/${record.id}`}>
              Edit
            </Link>
            <Link className={styles.editLink} to={`/users/view/${record.id}`}>
              View
            </Link>
            <Popconfirm
              title={<p> Are you sure you want to delete this user? </p>}
              onConfirm={() => this.confirmRemove(record)}
              onCancel={this.cancel}
            >
              <span className={styles.deleteLink}>Delete</span>
            </Popconfirm>
          </div>
        ),
      },
    ]

    return (
      <Page inner>
        <Row type="flex" justify="center">
          <Col lg={24} md={24} sm={24} xs={24}>
            <Table
              bordered
              pagination={{
                total,
                pageSize: Number(pagination.pageSize),
                current: Number(page),
              }}
              onChange={this.onPaginationChange}
              loading={effects['users/list']}
              scroll={{ x: 1200 }}
              className={styles.table}
              columns={columns}
              dataSource={list || []}
              simple
              rowKey={record => record.id}
            />
          </Col>
        </Row>
      </Page>
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object,
}

export default withRouter(
  connect(state => {
    return {
      loading: state.loading,
      users: state.users,
    }
  })(List)
)
