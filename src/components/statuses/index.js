import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Tag } from 'antd'

export const statuses = [
  { text: <Tag color="gold">Pending</Tag>, value: 'pending' },
  { text: <Tag color="green">Approved</Tag>, value: 'approved' },
  { text: <Tag color="red">Rejected</Tag>, value: 'rejected' },
]

class Status extends Component {
  render() {
    let { status } = this.props
    const statusComponent = statuses.find(row => row.value === status)
    return statusComponent ? statusComponent.text : null
  }
}
Status.propTypes = {
  status: PropTypes.string.isRequired,
  order: PropTypes.bool,
}

export default Status
