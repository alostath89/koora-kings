import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { helpers, countryCodes } from 'utils'
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
  DatePicker,
  Icon,
} from 'antd'
import { withI18n } from '@lingui/react'
import { Page, ImageUploadCrop } from 'components'
import styles from './Leagues.less'
import _ from 'lodash'
import moment from 'moment'
import { withRouter } from 'react-router'
const colProps = {
  style: {
    padding: 32,
  },
}
@withI18n()
@connect(({ loading }) => ({ loading }))
class Leagues extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      payload: {},
      role: ['buyer'],
      roleOptions: [
        { value: 'goalkeeper', label: 'Goalkeeper' },
        { value: 'defender', label: 'Defender' },
        { value: 'midfield', label: 'Midfield' },
        { value: 'forward', label: 'Forward' },
      ],
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
      type: 'common/getAllSeasons',
      payload: {},
    })
  }

  /* Check User Name Length */
  checkNameLength = async (rule, value, callback) => {
    if (value && value.trim().length < 2) {
      await callback(`The ${rule} should be 2 characters at minimum`)
      return
    } else {
      if (value && value.trim().length > 15) {
        await callback(`The ${rule} should be 15 characters at maximum`)
        return
      }
    }
    await callback()
    return
  }

  /* Check Password Length */
  checkPasswordLength = async (rule, value, callback) => {
    if (value && value.trim().length > 8) {
      await callback()
      return
    }
    await callback('Password should be more than 8 digits ')
  }

  /* Role checkbox group */
  onChangeRole = checkedList => {
    this.setState({
      role: checkedList,
    })
  }

  /* cancel form */
  handleCancel = () => {
    this.props.history.push(`/leagues`)
  }

  /* submit form */
  handleSubmit = () => {
    const {
      form,
      dispatch,
      history: {
        location: { pathname },
      },
      details,
    } = this.props
    const { role, paymentError } = this.state
    form.validateFields(async (err, values) => {
      if (err) {
        return err
      }
      values = {
        ...values,
        date_start: `${moment(values.date_start).unix()}`,
        date_end: `${moment(values.date_end).unix()}`,
        iscup: values.iscup ? 1 : 0,
      }
      if (pathname.includes('edit')) {
        const id = pathname.split('/')[3]
        await dispatch({
          type: 'leagues/update',
          payload: {
            id,
            ...values,
          },
        })
      } else {
        dispatch({
          type: 'leagues/create',
          payload: {
            ...values,
          },
        })
      }
    })
  }

  endDateDisabledDate = current => {
    const {
      form: { getFieldValue },
    } = this.props
    const startDate = moment(getFieldValue('date_start'))
    return current && current < startDate
  }

  handleSelect = (e, key, type) => {
    console.log(e, key)
  }

  render() {
    const {
      loading: { effects },
      history: {
        location: { pathname },
      },
      common: { countries, seasons },
      details,
      form: { getFieldDecorator, getFieldValue },
    } = this.props
    const editMode = pathname.includes('edit')
    return (
      <Page inner loading={editMode ? effects['leagues/details'] : false}>
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
                          message: 'Please enter the username!',
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
                  <Form.Item hasFeedback label={<span> Current Season </span>}>
                    {getFieldDecorator('season', {
                      initialValue: details?.season?.id,
                      rules: [
                        {
                          required: true,
                          message: 'Please choose the Current Season!',
                        },
                      ],
                    })(
                      <Select
                        getPopupContainer={trigger => trigger.parentNode}
                        placeholder="Choose Season"
                        size="small"
                        style={{ width: '100%' }}
                      >
                        {seasons?.map(season => (
                          <Select.Option value={season.id} key={season.name}>
                            {season.name}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item label={<span> Is Cup </span>}>
                    {getFieldDecorator('iscup', {
                      initialValue: details?.iscup,
                      rules: [
                        {
                          required: true,
                          message: 'Please choose a if Is Cup!',
                        },
                      ],
                    })(
                      <Radio.Group>
                        <Radio value={true}>True</Radio>
                        <Radio value={false}>False</Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item label={<span> Country </span>}>
                    {getFieldDecorator('country', {
                      initialValue: details?.country?.id,
                      rules: [
                        {
                          required: true,
                          message: 'Please choose a Country!',
                        },
                      ],
                    })(
                      <Select
                        getPopupContainer={trigger => trigger.parentNode}
                        placeholder="Choose Country"
                        size="small"
                        style={{ width: '100%' }}
                      >
                        {countries?.map(country => (
                          <Select.Option value={country.id} key={country.name}>
                            {country.name}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                `
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item label={<span> Start Date </span>}>
                    {getFieldDecorator('date_start', {
                      initialValue: details?.date_start
                        ? moment.unix(details?.date_start)
                        : null,
                      rules: [
                        {
                          required: true,
                          message: 'Please select start date!',
                        },
                      ],
                    })(
                      <DatePicker
                        id="date_start"
                        format={'MM/DD/YYYY'}
                        placeholder="select start date"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item label={<span> End Date </span>}>
                    {getFieldDecorator('date_end', {
                      initialValue: details?.date_end
                        ? moment.unix(details?.date_end)
                        : null,
                      rules: [
                        {
                          required: true,
                          message: 'Please select end date!',
                        },
                      ],
                    })(
                      <DatePicker
                        format={'MM/DD/YYYY'}
                        disabled={!getFieldValue('date_start')}
                        disabledDate={this.endDateDisabledDate}
                        placeholder="select end date"
                      />
                    )}
                  </Form.Item>
                </Col>
                `
              </Row>
              <Row type={'flex'} justify={'end'}>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <Button
                    type="primary"
                    className={styles.primaryBtn}
                    onClick={this.handleSubmit}
                    loading={
                      effects['leagues/update'] || effects['leagues/create']
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

Leagues.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default withRouter(
  connect(state => {
    return {
      loading: state.loading,
      leagues: state.leagues,
      common: state.common,
    }
  })(Form.create()(Leagues))
)
