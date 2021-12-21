import React, { Component } from 'react'
import { Upload, Icon } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { InboxOutlined } from '@ant-design/icons'
import _ from 'lodash'
import './ImageUploadCrop.less'
const { Dragger } = Upload
class ImageUploadCrop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: [],
      uploading: false,
    }
  }
  componentDidMount() {
    if (this.props.images) {
      const { images } = this.props
      let fileList = images
        ? images?.map((url, i) => ({
            uid: i,
            name: url?.substring(url.lastIndexOf('/') + 1),
            status: 'done',
            url,
          }))
        : []
      this.setState({ fileList })
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.images !== this.props.images) {
      const { images } = nextProps
      let fileList = images
        ? images?.map((url, i) => ({
            uid: i,
            name: url?.substring(url.lastIndexOf('/') + 1),
            status: 'done',
            url,
          }))
        : []
      this.setState({ fileList })
    }
  }
  handleUploadPhotos = async ({ onSuccess, onError, file }) => {
    const { fileList } = this.state
    const { type } = this.props
    let uploadedImage
    const formData = new FormData()
    formData.append('files', file)
    await this.props.dispatch({
      type: 'common/uploadImage',
      payload: formData,
    })
    const {
      common: { logo, imgUploadedSuccessful },
    } = this.props
    if (imgUploadedSuccessful) {
      uploadedImage = logo
      const newImage = {
        uid: uploadedImage?.substring(uploadedImage.lastIndexOf('/') + 1),
        name: uploadedImage?.substring(uploadedImage.lastIndexOf('/') + 1),
        status: 'done',
        url: uploadedImage,
      }
      this.setState(
        {
          fileList:
            type === 'attachments' || type === 'banners'
              ? [newImage, ...fileList]
              : [newImage],
        },
        () =>
          this.props.handleUpload(this.state.fileList.map(row => row.url), type)
      )
    }
    onSuccess(
      this.setState({
        uploading: false,
      })
    )
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ uploading: true })
    }
  }

  onRemove = file => {
    let url = file.url
    const { type } = this.props
    this.setState(
      {
        fileList: this.state.fileList.filter(row => row.url !== url),
      },
      () =>
        this.props.handleUpload(this.state.fileList.map(row => row.url), type)
    )
  }

  render() {
    const {
      loading: { effects },
      photosCount,
    } = this.props
    const { fileList, uploading } = this.state
    let uploadButton = (
      <div>
        <Icon type="upload" />
        <div className="ant-upload-text">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </div>
      </div>
    )
    if (uploading) {
      uploadButton = <div>Uploading.. </div>
    }
    return (
      <div className="image-upload">
        <Dragger
          accept="image/png, image/jpg, image/jpeg"
          fileList={fileList}
          multiple={false}
          disabled={effects['common/uploadImage']}
          onChange={this.handleChange}
          onRemove={this.onRemove}
          listType="picture-card"
          customRequest={this.handleUploadPhotos}
        >
          {uploadButton}
        </Dragger>
      </div>
    )
  }
}

ImageUploadCrop.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(state => {
  return {
    loading: state.loading,
    common: state.common,
  }
})(ImageUploadCrop)
