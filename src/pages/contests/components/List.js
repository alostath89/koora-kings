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

      this.setState({
        searchQuery: { ...searchQuery },
        pagination: { ...pagination },
        filteredInfo: { ...filteredInfo },
      })

      payload.limit = this.state.pagination.pageSize

      dispatch({ type: 'userContests/list', payload })
    } else {
      payload.limit = this.state.pagination.pageSize
      payload.page = this.state.pagination.current
      dispatch({ type: 'userContests/list', payload })
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

    history.replace(`/contests${queryUrl || ''}`)
  }

  render() {
    const {
      loading: { effects },
      userContests: { total, list },
    } = this.props

    const { pagination } = this.state
    const { page } = queryString.parse(location.search)

    const columns = [
      {
        title: <Trans>ID</Trans>,
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: <Trans>Name</Trans>,
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: <Trans>Type</Trans>,
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        render: (text, record) => (
          <div>
            <Link
              className={styles.editLink}
              to={`/contests/view/${record.id}`}
            >
              View
            </Link>
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
              loading={effects['userContests/list']}
              scroll={{ x: true }}
              className={styles.table}
              columns={columns}
              dataSource={list}
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
      userContests: state.userContests,
    }
  })(List)
)
