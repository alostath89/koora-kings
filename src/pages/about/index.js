import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import styles from './index.less'
import { config, helpers } from 'utils'
import { Button, Col, Form, Input, Row, Select } from 'antd'
const { TextArea } = Input

class Terms extends PureComponent {
  render() {
    return (
      <Page inner className={styles.staticPage}>
        <Row
          type={'flex'}
          justify={'center'}
          gutter={[0, 8]}
          className={styles.section1}
        >
          <Col span={24}>
            <div className={styles.logo}>
              <img
                alt="logo"
                src={config.logoPath}
                className={styles.logoPath}
              />
            </div>
          </Col>
          <Col span={24}>
            <p className={styles.aboutHeaderP}>
              We are an online gaming platform that offers a different
              experience of playing sport gaming through our first two games:{' '}
              <br />
              Live Draft Fantasy Football and Score Prediction Fantasy in the
              most popular football (soccer) leagues and championships in the
              world.
            </p>
          </Col>
          <Col span={8}>
            <Button type="primary" className={styles.existingUser}>
              Existing User
            </Button>
          </Col>
          <Col span={8}>
            <Button className={styles.newUser}>New User</Button>
          </Col>
        </Row>
        <Row
          type={'flex'}
          justify={'center'}
          gutter={[0, 8]}
          className={styles.section2}
        >
          <Col span={18}>
            <h2 className={styles.section2Heading} style={{ fontSize: '40px' }}>
              Live Snake Draft Fantasy
            </h2>
            <h5>
              Experience a new way of playing fantasy football, Create the
              ultimate fantasy team in the new snake draft format, compete with
              your friends and become the ultimate fantasy king.
            </h5>
            <h5>
              Play the new season-long live draft fantasy on any of these
              leagues:
            </h5>
          </Col>
        </Row>
        <Row
          type={'flex'}
          justify={'center'}
          gutter={[0, 8]}
          className={styles.section3}
        >
          <Col span={18}>
            <img
              width="1099"
              height="200"
              src="https://main.koorakings.com/wp-content/uploads/2019/05/row3.png"
              alt=""
            />
          </Col>
          <Col span={18} style={{ marginTop: '50px' }}>
            <img
              width="1099"
              height="200"
              src="https://main.koorakings.com/wp-content/uploads/2019/09/row4.png"
              alt=""
            />
          </Col>
        </Row>
        <Row
          type={'flex'}
          justify={'center'}
          gutter={[0, 8]}
          className={styles.section4}
        >
          <Col span={24}>
            <p className={styles.aboutHeaderP} style={{ color: '#343434' }}>
              Don’t Just Watch the Game
            </p>
            <p
              className={styles.aboutHeaderP}
              style={{ color: '#343434', margin: '0 0 40px 0' }}
            >
              PLAY NOW!
            </p>
          </Col>
          <Col span={8}>
            <Button type="primary" className={styles.existingUser}>
              Existing User
            </Button>
          </Col>
          <Col span={8}>
            <Button className={styles.newUser}>New User</Button>
          </Col>
        </Row>
        <Row
          type={'flex'}
          justify={'start'}
          align={'middle'}
          className={styles.section5}
        >
          <Col xs={24} md={12}>
            <div className={styles.logo}>
              <img
                alt="logo"
                src={config.logoPath}
                className={styles.logoPath}
              />
            </div>
          </Col>
          <Col span={8}>
            <Form>
              <Row type={'flex'} justify={'start'}>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter the Name!',
                      },
                      {
                        validator: (rule, value, callback) =>
                          helpers.checkEmptyString(rule, value, callback),
                      },
                    ]}
                  >
                    <Input placeholder="Enter the Name" />
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter the email!',
                      },
                      {
                        validator: (rule, value, callback) => {
                          let validation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                          if (value && validation.test(value.trim())) {
                            callback()
                            return
                          }
                          callback('Email format is not correct ')
                        },
                      },
                    ]}
                  >
                    <Input placeholder="email@domain.com" autoComplete="off" />
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item
                    name="subject"
                    rules={[
                      {
                        validator: (rule, value, callback) =>
                          helpers.checkEmptyString(rule, value, callback),
                      },
                    ]}
                  >
                    <Input placeholder="Enter the Subject" />
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form.Item
                    name="message"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter the Message!',
                      },
                      {
                        validator: (rule, value, callback) =>
                          helpers.checkEmptyString(rule, value, callback),
                      },
                    ]}
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                </Col>
              </Row>
              <Row type={'flex'} justify={'end'}>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <Button type="primary">Send</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Page>
    )
  }
}

export default connect(({ loading, dispatch }) => ({
  loading,
  dispatch,
}))(Terms)
