import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { Page, ImageUploadCrop } from 'components'
import {
  Button,
  Col,
  Form,
  Popconfirm,
  Row,
  Card,
  Table,
  Avatar,
  Radio,
  Input,
  Select,
  Modal,
  message,
} from 'antd'
import { withRouter } from 'react-router'
import styles from './index.less'
import Link from 'umi/link'
import { helpers } from 'utils'
import _ from 'lodash'
const { Meta } = Card

@withI18n()
@connect(({ loading }) => ({ loading }))
class Banners extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      bannerInfo: [],
      image: [],
      visible: false,
      selectedRecord: {},
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'banners/list',
    })
  }

  handleUpload = (urls, type) => {
    const { form } = this.props
    form.setFieldsValue({
      image: urls,
    })
  }

  handleAddImage = () => {
    this.setState({
      visible: true,
    })
  }

  onUpdateBanner = record => {
    const {
      form: { setFieldsValue },
    } = this.props
    this.setState({
      visible: true,
      selectedRecord: record,
    })
    setFieldsValue({
      url: record.url,
      image: [record.image],
    })
  }

  handleCancelModal = () => {
    const { form } = this.props
    form.resetFields()
    this.setState({
      visible: false,
      selectedRecord: {},
    })
  }

  confirmRemove = record => {
    const { dispatch } = this.props
    dispatch({
      type: 'banners/removeBannerImage',
      payload: {
        id: record.id,
      },
    })
  }

  handleAddBanner = () => {
    const {
      loading: { effects },
      form,
    } = this.props
    form.validateFields(async (err, values) => {
      if (err) return
      if (effects['common/uploadImage']) {
        return message.warning('Please wait until image finish uploading!')
      }
      const {
        dispatch,
        history: {
          location: { pathname },
        },
      } = this.props
      if (!_.isEmpty(this.state?.selectedRecord)) {
        await dispatch({
          type: 'banners/update',
          payload: {
            id: this.state?.selectedRecord?.id,
            url: values.url,
            image: values.image[0],
          },
        })
      } else {
        values = {
          url: values.url,
          image: values.image[0],
        }
        await dispatch({
          type: 'banners/create',
          payload: values,
        })
      }
      form.resetFields()
      this.setState({
        visible: false,
        selectedRecord: {},
      })
    })
  }
  render() {
    const {
      loading: { effects },
      history: {
        location: { pathname },
      },
      form: { getFieldValue, getFieldDecorator },
      banners: { list },
    } = this.props
    const { visible } = this.state
    const columns = [
      {
        title: <Trans>URL</Trans>,
        dataIndex: 'url',
        key: 'url',
      },
      {
        title: <Trans>Images</Trans>,
        dataIndex: 'image',
        key: 'image',
        render: (text, record) =>
          text && <Avatar shape="square" size={200} src={text} />,
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        render: (text, record) => (
          <div>
            <span
              className={styles.editLink}
              onClick={() => this.onUpdateBanner(record)}
            >
              Edit
            </span>
            <Popconfirm
              title={
                <p> Are you sure you want to delete this Slider Image? </p>
              }
              onConfirm={() => this.confirmRemove(record)}
              onCancel={this.cancel}
            >
              <span className={styles.deleteLink}>Delete</span>
            </Popconfirm>
          </div>
        ),
      },
    ]

    return (
      <Page inner>
        <Row type="flex" justify="end">
          <Col lg={4} md={4} sm={24} xs={24}>
            <Button
              className="ant-btn ant-btn-primary searchBtn"
              onClick={this.handleAddImage}
            >
              Add Banner Image
            </Button>
          </Col>
          <Col lg={24} md={24} sm={24} xs={24}>
            <Table
              bordered
              loading={effects['banners/list']}
              scroll={{ x: true }}
              className={styles.table}
              columns={columns}
              dataSource={list}
              simple
              rowKey={record => record.id}
            />
          </Col>
          <Modal
            title="Add New Banner Image"
            visible={visible}
            onOk={this.handleAddBanner}
            okButtonProps={{
              loading: effects['banners/create'] || effects['banners/update'],
            }}
            onCancel={this.handleCancelModal}
          >
            <Row>
              <Col lg={24} md={24} sm={24} xs={24}>
                <Form.Item hasFeedback label={<span> URL </span>}>
                  {getFieldDecorator('url', {
                    rules: [
                      {
                        validator: (rule, value, callback) =>
                          helpers.checkEmptyString(rule, value, callback),
                      },
                    ],
                  })(<Input placeholder="Enter the URL" />)}
                </Form.Item>
              </Col>
              <Col lg={24} md={24} sm={24} xs={24}>
                <Form.Item>
                  {getFieldDecorator('image', {
                    rules: [
                      {
                        required: visible,
                        message: 'Please upload Banner Image!',
                      },
                    ],
                  })(
                    <ImageUploadCrop
                      images={getFieldValue('image')}
                      type="slider"
                      handleUpload={this.handleUpload}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Modal>
        </Row>
      </Page>
    )
  }
}

Banners.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default withRouter(
  connect(state => {
    return {
      loading: state.loading,
      banners: state.banners,
    }
  })(Form.create()(Banners))
)
