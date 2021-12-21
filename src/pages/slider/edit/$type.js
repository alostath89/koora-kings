import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import Slider from '../components/Slider'
import { Form } from 'antd'
@withI18n()
@connect(({ loading }) => ({ loading }))
class EditSlider extends PureComponent {
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
    const slider_place = pathname.split('/')[3]
    dispatch({
      type: 'slider/details',
      payload: {
        slider_place,
      },
    })
  }

  render() {
    const {
      slider: { details },
    } = this.props
    return (
      <Page inner loading={false}>
        <Slider details={details} />
      </Page>
    )
  }
}

EditSlider.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(state => {
  return {
    loading: state.loading,
    slider: state.slider,
  }
})(Form.create()(EditSlider))
