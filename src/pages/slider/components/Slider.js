import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from '../../../../src/utils'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { Page, ImageUploadCrop } from 'components'
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
  Table,
  Tag,
  Avatar,
  message,
} from 'antd'
import styles from '../../KKContests/components/KKContests.less'
import { withRouter } from 'react-router'
import { helpers } from '../../../../src/utils'
import _ from 'lodash'
import BraftEditor from 'braft-editor'

@withI18n()
@connect(({ loading }) => ({ loading }))
class Slider extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      sliderInfo: [],
      countryNames: [],
      selectedRecord: {},
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'common/getAllCountries',
      payload: {},
    })
    dispatch({
      type: 'common/allContests',
      payload: {},
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.loading?.effects['slider/details'] !==
        this.props.loading?.effects['slider/details'] &&
      this.props.details &&
      !_.isEmpty(this.props.details)
    ) {
      this.setState({
        sliderInfo: this.props.details?.images,
      })
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch({
      type: 'slider/clearDetails',
    })
  }

  handleShowModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleUpload = (urls, type) => {
    const { form } = this.props
    form.setFieldsValue({
      logo: urls,
    })
  }

  handleAddSlider = () => {
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
      const type = pathname.split('/')[3]
      if (values.country.includes('all')) {
        values.country = 'all'
      }
      if (!_.isEmpty(this.state?.selectedRecord)) {
        values = {
          ...values,
          id: this.state?.selectedRecord?.id,
          slider_place: type,
          logo: values.logo[0],
        }
        await dispatch({
          type: 'slider/update',
          payload: values,
        })
      } else {
        values = {
          slider_place: type,
          sliders: [
            {
              ...values,
              logo: values.logo[0],
            },
          ],
        }
        await dispatch({
          type: 'slider/create',
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

  onUpdateSlider = record => {
    const {
      form: { setFieldsValue },
    } = this.props
    this.setState({
      visible: true,
      selectedRecord: record,
    })
    setFieldsValue({
      ...record,
      logo: [record.logo],
      country: record.country?.map(row => row.id),
      contest: record?.contest?.id,
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
    const {
      dispatch,
      history: {
        location: { pathname },
      },
    } = this.props
    const type = pathname.split('/')[3]
    const values = {
      slider_place: type,
      id: record.id,
    }
    dispatch({
      type: 'slider/removeSliderImage',
      payload: values,
    })
  }

  render() {
    const {
      loading: { effects },
      history: {
        location: { pathname },
      },
      common: { countries, allContests },
      form: { getFieldDecorator, getFieldValue },
      details,
    } = this.props
    const { sliderInfo, visible, selectedRecord } = this.state
    const editMode = pathname.includes('edit')
    const columns = [
      {
        title: 'Image',
        dataIndex: 'logo',
        key: 'logo',
        width: 200,
        render: (text, record) =>
          text && <Avatar shape="square" size={100} src={text} />,
      },
      {
        title: 'URL/Contest',
        dataIndex: 'URLContest',
        key: 'URLContest',
        width: 200,
        render: (text, record) =>
          record.url ? record.url : record?.contest?.name || '',
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        width: 200,
        render: (text, record) => text?.map(row => <Tag>{row.name}</Tag>),
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        render: (text, record) => (
          <div>
            <span
              className={styles.editLink}
              onClick={() => this.onUpdateSlider(record)}
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
        <Row type={'flex'} justify={'start'}>
          <Col lg={6} md={6} sm={24} xs={24}>
            <Button
              onClick={this.handleShowModal}
              type="primary"
              className={styles.primaryBtn}
            >
              Add Slider Image
            </Button>
          </Col>
          <Col lg={24} md={24} sm={24} xs={24}>
            <Table
              bordered
              columns={columns}
              className={styles.table}
              loading={effects['slider/details']}
              dataSource={sliderInfo}
              simple
              pagination={true}
              scroll={{ x: true }}
              rowKey={record => record.logo}
            />
          </Col>
          <Modal
            title="Add Slider"
            visible={visible}
            onOk={this.handleAddSlider}
            okButtonProps={{
              loading: effects['slider/create'] || effects['slider/update'],
            }}
            onCancel={this.handleCancelModal}
          >
            <Row>
              <Col lg={24} md={24} sm={24} xs={24}>
                <Form.Item>
                  {getFieldDecorator('logo', {
                    rules: [
                      {
                        required: visible,
                        message: 'Please upload slider Image!',
                      },
                    ],
                  })(
                    <ImageUploadCrop
                      images={getFieldValue('logo')}
                      type="slider"
                      handleUpload={this.handleUpload}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col lg={24} md={24} sm={24} xs={24}>
                <Form.Item label={<span> Text Type </span>}>
                  {getFieldDecorator('slider_type')(
                    <Radio.Group>
                      <Radio value={'url'}>url</Radio>
                      <Radio value={'contest'}>Contest</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
              {this.props.form.getFieldValue('slider_type') === 'url' ? (
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item hasFeedback label={<span> URL </span>}>
                    {getFieldDecorator('url', {
                      initialValue: selectedRecord?.url,
                      rules: [
                        {
                          validator: (rule, value, callback) =>
                            helpers.checkEmptyString(rule, value, callback),
                        },
                      ],
                    })(<Input placeholder="Enter the URL" />)}
                  </Form.Item>
                </Col>
              ) : null}
              {this.props.form.getFieldValue('slider_type') === 'contest' ? (
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item hasFeedback label={<span> Contest </span>}>
                    {getFieldDecorator('contest')(
                      <Select
                        getPopupContainer={trigger => trigger.parentNode}
                        placeholder="Choose Contest"
                        size="small"
                        style={{ width: '100%' }}
                        onChange={this.handleChangeContest}
                      >
                        {allContests?.map(contest => (
                          <Select.Option value={contest.id} key={contest.id}>
                            {contest.name}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              ) : null}
              <Col lg={24} md={24} sm={24} xs={24}>
                <Form.Item label={<span> Country </span>}>
                  {getFieldDecorator('country')(
                    <Select
                      mode="multiple"
                      getPopupContainer={trigger => trigger.parentNode}
                      placeholder="Choose Country"
                      size="small"
                      style={{ width: '100%' }}
                      onChange={this.handleChangeCountries}
                    >
                      <Select.Option value={'all'} key={'all'}>
                        All
                      </Select.Option>
                      {countries?.map(country => (
                        <Select.Option value={country.id} key={country.id}>
                          {country.name}
                        </Select.Option>
                      ))}
                    </Select>
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

Slider.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default withRouter(
  connect(state => {
    return {
      loading: state.loading,
      common: state.common,
    }
  })(Form.create()(Slider))
)
