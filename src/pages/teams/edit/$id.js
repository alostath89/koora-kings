import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from '../../../../src/utils'
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
  componentDidMount() {
    const {
      dispatch,
      history: {
        location: { pathname },
      },
    } = this.props
    const id = pathname.split('/')[3]
    dispatch({
      type: 'teams/details',
      payload: {
        id,
      },
    })
  }

  render() {
    const {
      teams: { details },
    } = this.props
    return <Teams details={details} />
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
