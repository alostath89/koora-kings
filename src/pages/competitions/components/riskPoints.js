import React from 'react'
import { Tag, Input } from 'antd'
import { TweenOneGroup } from 'rc-tween-one'
import { PlusOutlined } from '@ant-design/icons'

class EditableTagGroup extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: '',
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value })
  }

  handleInputConfirm = async () => {
    const { inputValue } = this.state
    let { risk_points } = this.props
    if (inputValue && risk_points.indexOf(inputValue) === -1) {
      risk_points = [...risk_points, inputValue]
    }
    await this.setState({
      inputVisible: false,
      inputValue: '',
    })
    this.props.handleAddRiskPoints(risk_points)
  }

  saveInputRef = input => {
    this.input = input
  }

  render() {
    const { inputVisible, inputValue } = this.state
    return (
      <>
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={this.showInput} className="site-tag-plus">
            <PlusOutlined /> Add New Risk Point
          </Tag>
        )}
      </>
    )
  }
}

export default EditableTagGroup
