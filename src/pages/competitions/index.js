import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from '../../../src/utils'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { Page } from '../../../src/components'
import List from '../../../src/pages/teams/components/List'
import Filter from '../../../src/pages/teams/components/Filter'

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
        <Filter {...this.filterProps} />
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
