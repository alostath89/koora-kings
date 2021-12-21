import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { helpers, countryCodes } from '../../../../src/utils'
import { connect } from 'dva'
import {
  Row,
  Col,
  Button,
  Form,
  Select,
  Divider,
  Input,
  Radio,
  Tooltip,
  Icon,
  Checkbox,
} from 'antd'
import { withI18n } from '@lingui/react'
import { Page, ImageUploadCrop } from 'components'
import styles from './KKContests.less'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import _ from 'lodash'
import { withRouter } from 'react-router'
const { Option } = Select

@withI18n()
@connect(({ loading }) => ({ loading }))
class KKContests extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      payload: {},
      is_disable_autofinal: false,
      is_disable_confidence_points: false,
      is_show_in_user_lobby: false,
      is_private: false,
      logo: '',
      logo_prize: '',
      logo_mobile_prize: '',
      attachments: [],
      editorState:
        this.props?.details && !_.isEmpty(this.props?.details)
          ? BraftEditor.createEditorState(this.props?.details?.prize_text)
          : BraftEditor.createEditorState('<p></p>'),
      outputHTML:
        this.props?.details && !_.isEmpty(this.props?.details)
          ? this.props?.details?.prize_text
          : '<p></p>',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'common/getAllCountries',
      payload: {},
    })
    dispatch({
      type: 'common/allCompetitions',
      payload: {},
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.loading?.effects['common/detailsSponsoredKKContests'] !==
        this.props.loading?.effects['common/detailsSponsoredKKContests'] &&
      this.props.details &&
      !_.isEmpty(this.props.details)
    ) {
      this.setState({
        is_disable_confidence_points: this.props.details
          ?.is_disable_confidence_points,
        is_disable_autofinal: this.props.details?.is_disable_autofinal,
        is_show_in_user_lobby: this.props.details?.is_show_in_user_lobby,
        is_private: this.props.details?.type === 'private' ? true : false,
        logo: [this.props.details?.logo],
        logo_prize: [this.props.details?.logo_prize],
        logo_mobile_prize: [this.props.details?.logo_mobile_prize],
        attachments: this.props.details?.attachments,
        editorState:
          this.props?.details && !_.isEmpty(this.props?.details)
            ? BraftEditor.createEditorState(this.props?.details?.prize_text)
            : BraftEditor.createEditorState('<p></p>'),
        outputHTML:
          this.props?.details && !_.isEmpty(this.props?.details)
            ? this.props?.details?.prize_text
            : '<p></p>',
      })
    }
  }

  /* cancel form */
  handleCancel = () => {
    this.props.history.push(`/KKContests`)
  }

  /* submit form */
  handleSubmit = () => {
    const {
      form,
      dispatch,
      history: {
        location: { pathname },
      },
    } = this.props
    const { outputHTML } = this.state
    form.validateFields(async (err, values) => {
      if (err) return
      values = {
        ...values,
        logo: values.logo[0],
        logo_prize: values.logo_prize[0],
        prize_text: outputHTML,
        category: 'kk',
        type: values.is_private ? 'private' : 'public',
      }
      if (pathname.includes('edit')) {
        const id = pathname.split('/')[3]
        await dispatch({
          type: 'common/updateSponsoredKKContests',
          payload: {
            id: Number(id),
            ...values,
          },
        })
      } else {
        dispatch({
          type: 'common/addSponsoredKKContests',
          payload: { ...values },
        })
      }
    })
  }

  handleUpload = (urls, type) => {
    const { form } = this.props
    this.setState(
      {
        [type]: urls,
      },
      () =>
        form.setFieldsValue({
          [type]: urls,
        })
    )
  }

  handleChange = editorState => {
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML(),
    })
  }

  onChangeCheck = (e, field) => {
    this.setState({
      [field]: !this.state[field],
    })
  }

  render() {
    const {
      loading: { effects },
      userData,
      history: {
        location: { pathname },
      },
      details,
      common: { competitions, countries },
      form: { getFieldDecorator, getFieldValue, resetFields },
    } = this.props
    const editMode = pathname.includes('edit')
    const {
      editorState,
      is_disable_autofinal,
      is_disable_confidence_points,
      is_show_in_user_lobby,
      is_private,
    } = this.state
    return (
      <Page
        inner
        loading={
          editMode ? effects['common/detailsSponsoredKKContests'] : false
        }
      >
        <Row type={'flex'} justify={'start'}>
          <Col lg={14} md={24} sm={24} xs={24}>
            <Form>
              <Row type={'flex'} justify={'start'}>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item hasFeedback label={<span> Name </span>}>
                    {getFieldDecorator('name', {
                      initialValue: details?.name,
                      rules: [
                        {
                          required: true,
                          message: 'Please enter the Contest Name!',
                        },
                        {
                          min: 8,
                          message: 'Name should be at least 8 characters',
                        },
                        {
                          validator: (rule, value, callback) =>
                            helpers.checkEmptyString(rule, value, callback),
                        },
                      ],
                    })(<Input placeholder="Enter the username" />)}
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item label={<span> Competition </span>}>
                    {getFieldDecorator('competition', {
                      initialValue: details?.competition,
                      rules: [
                        {
                          required: true,
                          message: 'Please choose Competition!',
                        },
                      ],
                    })(
                      <Select
                        getPopupContainer={trigger => trigger.parentNode}
                        placeholder="Choose League"
                        size="small"
                        style={{ width: '100%' }}
                      >
                        {competitions?.map(competition => (
                          <Option value={competition.id} key={competition.id}>
                            {competition.name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item label={<span>Logo</span>}>
                    {getFieldDecorator('logo', {
                      initialValue: this.state?.logo,
                      rules: [
                        {
                          required: true,
                          message: 'Logo is required!',
                        },
                      ],
                    })(
                      <ImageUploadCrop
                        images={this.state?.logo}
                        type="logo"
                        handleUpload={this.handleUpload}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item label={<span>Logo Prize</span>}>
                    {getFieldDecorator('logo_prize', {
                      initialValue: this.state?.logo_prize,
                      rules: [
                        {
                          required: true,
                          message: 'Logo is required!',
                        },
                      ],
                    })(
                      <ImageUploadCrop
                        images={this.state?.logo_prize}
                        type="logo_prize"
                        handleUpload={this.handleUpload}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item label={<span>Banners</span>}>
                    {getFieldDecorator('attachments', {
                      initialValue: this.state?.attachments
                        ? this.state?.attachments.map(row =>
                            _.isObject(row) ? row.file : row
                          )
                        : null,
                      rules: [
                        {
                          required: true,
                          message: 'Banners required!',
                        },
                      ],
                    })(
                      <ImageUploadCrop
                        images={
                          this.state?.attachments
                            ? this.state?.attachments.map(row =>
                                _.isObject(row) ? row.file : row
                              )
                            : null
                        }
                        type="attachments"
                        handleUpload={this.handleUpload}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <BraftEditor
                    value={editorState}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item>
                    {getFieldDecorator('is_show_in_user_lobby', {
                      initialValue: is_show_in_user_lobby,
                    })(
                      <Checkbox
                        checked={is_show_in_user_lobby}
                        onChange={e =>
                          this.onChangeCheck(e, 'is_show_in_user_lobby')
                        }
                      >
                        Show on User Lobby?
                      </Checkbox>
                    )}
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item>
                    {getFieldDecorator('is_disable_confidence_points', {
                      initialValue: is_disable_confidence_points,
                    })(
                      <Checkbox
                        checked={is_disable_confidence_points}
                        onChange={e =>
                          this.onChangeCheck(e, 'is_disable_confidence_points')
                        }
                      >
                        Disable confidence points?
                      </Checkbox>
                    )}
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item>
                    {getFieldDecorator('is_disable_autofinal', {
                      initialValue: is_disable_autofinal,
                    })(
                      <Checkbox
                        checked={is_disable_autofinal}
                        onChange={e =>
                          this.onChangeCheck(e, 'is_disable_autofinal')
                        }
                      >
                        Disable Autofinal?
                      </Checkbox>
                    )}
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item>
                    {getFieldDecorator('is_private', {
                      initialValue: details?.type === 'private',
                    })(
                      <Checkbox
                        onChange={e => this.onChangeCheck(e, 'is_private')}
                        checked={is_private}
                      >
                        Is Private?
                      </Checkbox>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row type={'flex'} justify={'end'}>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <Button
                    type="primary"
                    className={styles.primaryBtn}
                    onClick={this.handleSubmit}
                    loading={
                      effects['common/updateSponsoredKKContests'] ||
                      effects['common/addSponsoredKKContests']
                    }
                  >
                    {editMode ? 'Save' : 'Create'}
                  </Button>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <Button
                    className={styles.secondaryBtn}
                    onClick={this.handleCancel}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Page>
    )
  }
}

KKContests.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default withRouter(
  connect(state => {
    return {
      loading: state.loading,
      sponsoredContests: state.sponsoredContests,
      common: state.common,
    }
  })(Form.create()(KKContests))
)
