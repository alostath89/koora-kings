import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import List from './components/List'

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
