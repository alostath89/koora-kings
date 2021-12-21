import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import List from './components/List'
import Filter from './components/Filter'
import Link from 'umi/link'
import { Col, Row } from 'antd'

@withI18n()
@connect(({ loading }) => ({ loading }))
class Users extends PureComponent {
  get filterProps() {
    const { location, dispatch } = this.props
    const { query } = location

    return {
      filter: {
        ...query,
      },
      onFilterChange: value => {
        this.handleRefresh({
          ...value,
        })
      },
      onAdd() {
        dispatch({
          type: 'users/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
  }
  render() {
    return (
      <Page inner loading={false}>
        <Row type={'flex'} justify={'end'}>
          <Col xs={24} md={12} lg={4}>
            <div className="mt10">
              <Link
                style={{ paddingTop: '3px' }}
                to={`/KKContests/create`}
                className="ant-btn ant-btn-secondary"
                id="client-add"
              >
                Create KKContests
              </Link>
            </div>
          </Col>
        </Row>
        {/*<Filter {...this.filterProps} />*/}
        <List {...this.listProps} />
      </Page>
    )
  }
}

Users.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Users
