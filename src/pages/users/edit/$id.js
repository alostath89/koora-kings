import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from '../../../../src/utils'
import { connect } from 'dva'
import { Form } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from '../../../../src/components'
import styles from '../components/Users.less'
import Users from '../components/Users'

@withI18n()
@connect(({ loading }) => ({ loading }))
class EditUser extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      payload: {},
    }
  }
  componentDidMount() {
    const {
      dispatch,
      history: {
        location: { pathname },
      },
    } = this.props
    const id = pathname.split('/')[3]
    dispatch({
      type: 'users/details',
      payload: {
        id,
      },
    })
  }

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
      history: {
        location: { pathname },
      },
      users: { details },
      loading: { effects },
    } = this.props
    return <Users details={details} />
  }
}

EditUser.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(state => {
  return {
    loading: state.loading,
    users: state.users,
  }
})(Form.create()(EditUser))
