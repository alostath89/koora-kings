import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Icon, Input } from 'antd'
import { GlobalFooter } from 'ant-design-pro'
import { Trans, withI18n } from '@lingui/react'
import { router, helpers, config, setLocale } from '../../../src/utils'
import styles from './index.less'
import '../../layouts/BaseLayout.less'
import { stringify } from 'qs'

const FormItem = Form.Item

@withI18n()
@connect(({ loading }) => ({ loading }))
@Form.create()
class Login extends PureComponent {
  componentDidUpdate() {
    window.onpopstate = e => {
      router.push({
        pathname: '/login',
        search: stringify({
          from: '',
        }),
      })
    }
  }
  handleOk = () => {
    const { dispatch, form } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }

  render() {
    const {
      loading: { effects },
      form,
      i18n,
    } = this.props
    const { getFieldDecorator } = form

    let footerLinks = [
      {
        key: 'github',
        title: <Icon type="github" />,
        href: 'https://github.com/zuiidea/antd-admin',
        blankTarget: true,
      },
    ]

    if (config.i18n) {
      footerLinks = footerLinks.concat(
        config.i18n.languages.map(item => ({
          key: item.key,
          title: (
            <span onClick={setLocale.bind(null, item.key)}>{item.title}</span>
          ),
        }))
      )
    }

    return (
      <Fragment>
        <div className={styles.form}>
          <div className={styles.logo}>
            <img alt="logo" src={config.logoPath} />
          </div>
          <form>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                  },
                  {
                    validator: (rule, value, callback) => {
                      const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
                      if (emailRegex.test(value.trim())) {
                        callback()
                      } else {
                        return callback(
                          ' *يجب كتابة البريد الإلكتروني بالصيغة الصحيحة!'
                        )
                      }
                    },
                  },
                  {
                    validator: (rule, value, callback) =>
                      helpers.checkEmptyString(rule, value, callback),
                  },
                ],
              })(
                <Input
                  onPressEnter={this.handleOk}
                  placeholder={i18n.t`Email`}
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Input
                  type="password"
                  onPressEnter={this.handleOk}
                  placeholder={i18n.t`Password`}
                />
              )}
            </FormItem>
            <Row>
              <Button
                type="primary"
                onClick={this.handleOk}
                loading={effects['login/login']}
              >
                <Trans>Sign in</Trans>
              </Button>
            </Row>
          </form>
        </div>
        <div className={styles.footer}>
          <GlobalFooter copyright={config.copyright} />
        </div>
      </Fragment>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Login
