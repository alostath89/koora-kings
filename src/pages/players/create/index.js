import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { Form } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import styles from '../components/Players.less'
import Users from '../components/Players'

@withI18n()
@connect(({ loading }) => ({ loading }))
class CreateUser extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      payload: {},
    }
  }

  render() {
    return <Users />
  }
}

CreateUser.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(state => {
  return {
    loading: state.loading,
    users: state.users,
  }
})(Form.create()(CreateUser))