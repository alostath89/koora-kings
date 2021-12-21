import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { Form } from 'antd'
import { withI18n } from '@lingui/react'
import SponsoredContests from '../components/SponsoredContests'

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
      type: 'common/detailsSponsoredKKContests',
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
      loading: { effects },
      common: { sponsoredKKContestsDetails },
    } = this.props
    return <SponsoredContests details={sponsoredKKContestsDetails} />
  }
}

EditUser.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(state => {
  return {
    loading: state.loading,
    common: state.common,
  }
})(Form.create()(EditUser))
