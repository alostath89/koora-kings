import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from '../../../../src/utils'
import { connect } from 'dva'
import { Form } from 'antd'
import { withI18n } from '@lingui/react'
import Competitions from '../components/Competitions'

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
    return <Competitions />
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
