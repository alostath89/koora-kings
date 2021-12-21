import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { Form } from 'antd'
import { withI18n } from '@lingui/react'
import Teams from '../components/Teams'

@withI18n()
@connect(({ loading }) => ({ loading }))
class EditTeam extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      payload: {},
    }
  }

  render() {
    return <Teams />
  }
}

EditTeam.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(state => {
  return {
    loading: state.loading,
    teams: state.teams,
  }
})(Form.create()(EditTeam))
