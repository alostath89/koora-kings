import React, { PureComponent } from 'react'
import {
  Button,
  Row,
  Tabs,
  Rate,
  Col,
  Tooltip,
  Card,
  Avatar,
  Carousel,
  Input,
  Icon,
  Form,
} from 'antd'
import { config } from '../../../src/utils'
import styles from './index.less'
const { TabPane } = Tabs
import '../../layouts/BaseLayout.less'
import { withRouter } from 'react-router'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'

const { Meta } = Card
@withI18n()
class Home extends PureComponent {
  render() {
    const { i18n } = this.props
    const language = this.props?.history?.location?.pathname.includes('ar')
      ? 'ar'
      : 'en'
    return (
      <div>
        <div className={styles.homeContainer}>
          <Row
            type="flex"
            align="middle"
            justify="center"
            gutter={[0, 32]}
            className={language === 'en' ? styles.enRow : styles.arRow}
          >
            <Col xs={24} lg={12}>
              <div>
                <p className={styles['DONT-JUST-WATCH-THE']}>
                  {i18n.t`welcome_message`}
                </p>
                <p className={styles.description}>
                  <span>{i18n.t`dont_wait_message`}</span>
                </p>
              </div>
              {/* <div className={styles.buttons}>
                <Button type="primary">{i18n.t`Get started now`}</Button>
                <Button>{i18n.t`About US`}</Button>
              </div>
              <div className={styles.buttons}>
                <Rate allowHalf defaultValue={4.5} className={styles.rating} />
                <span>9,639 Reviews</span>
              </div> */}
              <p className={styles.p_Download_Now}>
                {language === 'ar' && 'حمل التطبيق الآن'}
              </p>
              <div className={styles.buttons}>
                <a
                  href="https://play.google.com/store/apps/details?id=com.app.koorakings"
                  style={{ zIndex: '99' }}
                >
                  <img
                    width={200}
                    height={90}
                    src={config.googlestore}
                    alt="google store"
                  />
                </a>
                <a
                  href="https://apps.apple.com/sa/app/koora-kings-fantasy-football/id1485247377"
                  style={{ zIndex: '99' }}
                >
                  <img
                    width={200}
                    height={90}
                    src={config.appstore}
                    alt="app store"
                  />
                </a>
              </div>
            </Col>
            <Col xs={0} lg={12}>
              <div className={styles.mobiles}>
                <img src={config.mobiles} alt="mobiles" />
              </div>
            </Col>
          </Row>
          <Row type="flex" align="middle" justify="center" gutter={[0, 32]}>
            <Col span={24}>
              <span className={styles.sectionTwo}>
                <p
                  className={styles['ABOUT-KOORA-KINGS']}
                >{i18n.t`ABOUT KOORA KINGS`}</p>
                <div className={styles.Rectangle} />
                <p className={styles.description}>
                  {i18n.t`kora_kings_section_2`}
                </p>
              </span>
            </Col>
          </Row>
          <Row type="flex" align="middle" justify="center" gutter={[0, 32]}>
            <Col span={24}>
              <div className={styles.sectionThree}>
                <Tabs defaultActiveKey="1">
                  <TabPane
                    tab={<span>{i18n.t`Predication`}</span>}
                    key="1"
                    style={{ marginLeft: '0%' }}
                  >
                    <Row
                      type="flex"
                      align="middle"
                      justify="center"
                      gutter={[32, 32]}
                      className={
                        language === 'en'
                          ? `${styles.relativeRow}`
                          : `${styles.relativeRow} ${styles.arRow} `
                      }
                    >
                      <img
                        src={config.sliderBackImg}
                        className={
                          language === 'en'
                            ? styles.sliderBackImg
                            : `${styles.sliderBackImg} ${styles.sliderBackImgAr}`
                        }
                        alt="sliderBackImg"
                      />
                      <img
                        src={config.Triangle}
                        className={styles.triangleImg}
                        alt="Triangle"
                      />
                      <Col xs={24} lg={12}>
                        <div className={styles.sliderContent}>
                          <div className={styles.sliderImage}>
                            <img src={config.sliderImage} alt="" />
                          </div>
                        </div>
                      </Col>
                      <Col
                        xs={24}
                        lg={12}
                        className={language === 'ar' && `${styles.FixDir}`}
                      >
                        {language === 'en' && <p>{i18n.t`Predication Game`}</p>}
                        <p className={styles['Play-anything-anyti']}>
                          {i18n.t`Play anything, anytime_1`}
                        </p>
                        <ul className={styles.sliderUL}>
                          <li>{i18n.t`Predication Game list one`}</li>
                          <li>{i18n.t`Predication Game list two`}</li>
                          <p
                            className={styles.sliderP}
                          >{i18n.t`play and win`}</p>
                        </ul>
                        {language === 'en' && (
                          <p className={styles.sliderPCTO}>Name test, CTO</p>
                        )}
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane
                    tab={<span>{i18n.t`Salary Cap`}</span>}
                    key="2"
                    className={styles.secTab}
                  >
                    <Row
                      type="flex"
                      align="middle"
                      justify="center"
                      gutter={[32, 32]}
                      className={
                        language === 'en'
                          ? `${styles.relativeRow}`
                          : `${styles.relativeRow} ${styles.arRow} `
                      }
                    >
                      <img
                        src={config.sliderBackImg}
                        className={styles.sliderBackImg}
                        alt="sliderBackImg"
                      />
                      <img
                        src={config.Triangle}
                        className={styles.triangleImg}
                        alt="Triangle"
                      />
                      <Col xs={24} lg={12}>
                        <div className={styles.sliderContent}>
                          <div className={styles.sliderImage}>
                            <img src={config.sliderImage} alt="" />
                          </div>
                        </div>
                      </Col>
                      <Col
                        xs={24}
                        lg={12}
                        className={language === 'ar' && `${styles.FixDir}`}
                      >
                        {language === 'en' && <p>{i18n.t`Salary Cap Game`}</p>}
                        <p className={styles['Play-anything-anyti']}>
                          {i18n.t`Play anything, anytime_2`}
                        </p>
                        <ul className={styles.sliderUL}>
                          <li>{i18n.t`Salary Cap Game List one`}</li>
                          <li>{i18n.t`Salary Cap Game List two`}</li>
                          <p className={styles.sliderP}>
                            {i18n.t`Salary Cap Game List three`}
                          </p>
                        </ul>
                        {language === 'en' && (
                          <p className={styles.sliderPCTO}>Name test, CTO</p>
                        )}
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane
                    tab={<span>{i18n.t`Live Draft`}</span>}
                    key="3"
                    className={styles.thirdTab}
                  >
                    <Row
                      type="flex"
                      align="middle"
                      justify="center"
                      gutter={[32, 32]}
                      className={
                        language === 'en'
                          ? `${styles.relativeRow}`
                          : `${styles.relativeRow} ${styles.arRow} `
                      }
                    >
                      <img
                        src={config.sliderBackImg}
                        className={styles.sliderBackImg}
                        alt="sliderBackImg"
                      />
                      <img
                        src={config.Triangle}
                        className={styles.triangleImg}
                        alt="Triangle"
                      />
                      <Col xs={24} lg={12}>
                        <div className={styles.sliderContent}>
                          <div className={styles.sliderImage}>
                            <img src={config.sliderImage} alt="" />
                          </div>
                        </div>
                      </Col>
                      <Col
                        xs={24}
                        lg={12}
                        className={language === 'ar' && `${styles.FixDir}`}
                      >
                        {language === 'en' && <p>{i18n.t`Soon Games`}</p>}
                        <p className={styles['Play-anything-anyti']}>
                          {i18n.t`Play anything, anytime_3`}
                        </p>
                        <ul className={styles.sliderUL}>
                          {/* <li>{i18n.t`Soon Games List one`}</li>
                          <li>{i18n.t`Soon Games List two`}</li> */}
                        </ul>
                        <p className={styles.sliderP}>
                          {i18n.t`Soon Games List Three`}
                        </p>
                        {language === 'en' && (
                          <p className={styles.sliderPCTO}>Name test, CTO</p>
                        )}
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
              </div>
            </Col>
          </Row>
        </div>
        <div className={styles.grayBg}>
          <Row type="flex" align="middle" justify="center" gutter={[0, 32]}>
            <Col span={18}>
              <Row
                type="flex"
                align="middle"
                justify="center"
                gutter={[0, 32]}
                className={language === 'en' ? styles.enRow : styles.arRow}
              >
                <Col span={24}>
                  <span className={styles.sectionTwo}>
                    <p className={styles['ABOUT-KOORA-KINGS']}>
                      {i18n.t`How To Start Play?`}
                    </p>
                    <div className={styles.Rectangle} />
                    <p className={styles.description}>{i18n.t`join_us`}</p>
                  </span>
                </Col>
                <Col xs={24} md={8}>
                  <div className={styles.howToPlay}>
                    <div className={styles.howToPlaySec}>
                      <img src={config.downloadApp} alt="downloadApp" />
                      <p>{i18n.t`Download App`}</p>
                      <p>{i18n.t`Download App Description`}</p>
                    </div>
                    {language === 'en' ? (
                      <img
                        className={
                          language === 'en' ? styles.arrow : styles.arrowAr
                        }
                        src={config.arrow}
                        alt="arrow"
                      />
                    ) : null}
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className={styles.howToPlay}>
                    <div className={styles.howToPlaySec}>
                      <img src={config.createAccount} alt="downloadApp" />
                      <p>{i18n.t`Create Account`}</p>
                      <p>{i18n.t`Create Account Description`}</p>
                    </div>
                    <img
                      src={config.arrow}
                      alt="arrow"
                      className={
                        language === 'en' ? styles.arrow : styles.arrowAr
                      }
                    />
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className={styles.howToPlay}>
                    <div className={styles.howToPlaySec}>
                      <img src={config.enjoyGaming} alt="downloadApp" />
                      <p>{i18n.t`Enjoy, Gaming`}</p>
                      <p>{i18n.t`Enjoy, Gaming Description`}</p>
                    </div>
                    {language === 'ar' ? (
                      <img
                        className={
                          language === 'en' ? styles.arrow : styles.arrowAr
                        }
                        src={config.arrow}
                        alt="arrow"
                      />
                    ) : null}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className={styles.blackContainer}>
          <Row type="flex" align="middle" justify="center" gutter={[0, 32]}>
            {/*<Col xs={0} md={24}>
              <span className={styles.sectionTwo}>
                <p
                  className={styles['ABOUT-KOORA-KINGS']}
                >{i18n.t`Our Global Player`}</p>
                <div className={styles.Rectangle} />
                <p
                  className={`${styles.description} ${styles.globalPlayersDesc}`}
                >
                  {i18n.t`Join Us And Be The King`}
                </p>
              </span>
              <div className={styles.mapImage}>
                <Tooltip
                  arrowPointAtCenter
                  title={
                    <div className={styles.toolTip}>
                      <div>
                        <span>45</span>
                      </div>
                      <div>
                        <span>Players from</span>
                        <span>CANADA</span>
                      </div>
                    </div>
                  }
                  placement="right"
                >
                  <img
                    src={config.mapPin}
                    className={`${styles.mapPin} ${styles.mapPin1}`}
                    alt="mapPin"
                  />
                </Tooltip>
                <Tooltip
                  arrowPointAtCenter
                  title={
                    <div className={styles.toolTip}>
                      <div>
                        <span>45</span>
                      </div>
                      <div>
                        <span>Players from</span>
                        <span>CANADA</span>
                      </div>
                    </div>
                  }
                  placement="right"
                >
                  <img
                    src={config.mapPin}
                    className={`${styles.mapPin} ${styles.mapPin2}`}
                    alt="mapPin"
                  />
                </Tooltip>
                <Tooltip
                  arrowPointAtCenter
                  title={
                    <div className={styles.toolTip}>
                      <div>
                        <span>45</span>
                      </div>
                      <div>
                        <span>Players from</span>
                        <span>CANADA</span>
                      </div>
                    </div>
                  }
                  placement="right"
                >
                  <img
                    src={config.mapPin}
                    className={`${styles.mapPin} ${styles.mapPin3}`}
                    alt="mapPin"
                  />
                </Tooltip>
                <Tooltip
                  arrowPointAtCenter
                  title={
                    <div className={styles.toolTip}>
                      <div>
                        <span>45</span>
                      </div>
                      <div>
                        <span>Players from</span>
                        <span>CANADA</span>
                      </div>
                    </div>
                  }
                  placement="right"
                >
                  <img
                    src={config.mapPin}
                    className={`${styles.mapPin} ${styles.mapPin4}`}
                    alt="mapPin"
                  />
                </Tooltip>
                <Tooltip
                  arrowPointAtCenter
                  title={
                    <div className={styles.toolTip}>
                      <div>
                        <span>45</span>
                      </div>
                      <div>
                        <span>Players from</span>
                        <span>CANADA</span>
                      </div>
                    </div>
                  }
                  placement="right"
                >
                  <img
                    src={config.mapPin}
                    className={`${styles.mapPin} ${styles.mapPin5}`}
                    alt="mapPin"
                  />
                </Tooltip>
                <Tooltip
                  arrowPointAtCenter
                  title={
                    <div className={styles.toolTip}>
                      <div>
                        <span>45</span>
                      </div>
                      <div>
                        <span>Players from</span>
                        <span>CANADA</span>
                      </div>
                    </div>
                  }
                  placement="right"
                >
                  <img
                    src={config.mapPin}
                    className={`${styles.mapPin} ${styles.mapPin6}`}
                    alt="mapPin"
                  />
                </Tooltip>
                <Tooltip
                  arrowPointAtCenter
                  title={
                    <div className={styles.toolTip}>
                      <div>
                        <span>45</span>
                      </div>
                      <div>
                        <span>Players from</span>
                        <span>CANADA</span>
                      </div>
                    </div>
                  }
                  placement="right"
                >
                  <img
                    src={config.mapPin}
                    className={`${styles.mapPin} ${styles.mapPin7}`}
                    alt="mapPin"
                  />
                </Tooltip>
                <Tooltip
                  arrowPointAtCenter
                  title={
                    <div className={styles.toolTip}>
                      <div>
                        <span>45</span>
                      </div>
                      <div>
                        <span>Players from</span>
                        <span>CANADA</span>
                      </div>
                    </div>
                  }
                  placement="right"
                >
                  <img
                    src={config.mapPin}
                    className={`${styles.mapPin} ${styles.mapPin8}`}
                    alt="mapPin"
                  />
                </Tooltip>
                <Tooltip
                  arrowPointAtCenter
                  title={
                    <div className={styles.toolTip}>
                      <div>
                        <span>45</span>
                      </div>
                      <div>
                        <span>Players from</span>
                        <span>CANADA</span>
                      </div>
                    </div>
                  }
                  placement="right"
                >
                  <img
                    src={config.mapPin}
                    className={`${styles.mapPin} ${styles.mapPin9}`}
                    alt="mapPin"
                  />
                </Tooltip>
                <Tooltip
                  arrowPointAtCenter
                  title={
                    <div className={styles.toolTip}>
                      <div>
                        <span>45</span>
                      </div>
                      <div>
                        <span>Players from</span>
                        <span>CANADA</span>
                      </div>
                    </div>
                  }
                  placement="right"
                >
                  <img
                    src={config.mapPin}
                    className={`${styles.mapPin} ${styles.mapPin10}`}
                    alt="mapPin"
                  />
                </Tooltip>
                <Tooltip
                  arrowPointAtCenter
                  title={
                    <div className={styles.toolTip}>
                      <div>
                        <span>45</span>
                      </div>
                      <div>
                        <span>Players from</span>
                        <span>CANADA</span>
                      </div>
                    </div>
                  }
                  placement="right"
                >
                  <img
                    src={config.mapPin}
                    className={`${styles.mapPin} ${styles.mapPin11}`}
                    alt="mapPin"
                  />
                </Tooltip>
                <Tooltip
                  arrowPointAtCenter
                  title={
                    <div className={styles.toolTip}>
                      <div>
                        <span>45</span>
                      </div>
                      <div>
                        <span>Players from</span>
                        <span>CANADA</span>
                      </div>
                    </div>
                  }
                  placement="right"
                >
                  <img
                    src={config.mapPin}
                    className={`${styles.mapPin} ${styles.mapPin12}`}
                    alt="mapPin"
                  />
                </Tooltip>
                <Tooltip
                  arrowPointAtCenter
                  title={
                    <div className={styles.toolTip}>
                      <div>
                        <span>45</span>
                      </div>
                      <div>
                        <span>Players from</span>
                        <span>CANADA</span>
                      </div>
                    </div>
                  }
                  placement="right"
                >
                  <img
                    src={config.mapPin}
                    className={`${styles.mapPin} ${styles.mapPin13}`}
                    alt="mapPin"
                  />
                </Tooltip>
                <Tooltip
                  arrowPointAtCenter
                  title={
                    <div className={styles.toolTip}>
                      <div>
                        <span>45</span>
                      </div>
                      <div>
                        <span>Players from</span>
                        <span>CANADA</span>
                      </div>
                    </div>
                  }
                  placement="right"
                >
                  <img
                    src={config.mapPin}
                    className={`${styles.mapPin} ${styles.mapPin14}`}
                    alt="mapPin"
                  />
                </Tooltip>
                <Tooltip
                  arrowPointAtCenter
                  title={
                    <div className={styles.toolTip}>
                      <div>
                        <span>45</span>
                      </div>
                      <div>
                        <span>Players from</span>
                        <span>CANADA</span>
                      </div>
                    </div>
                  }
                  placement="right"
                >
                  <img
                    src={config.mapPin}
                    className={`${styles.mapPin} ${styles.mapPin15}`}
                    alt="mapPin"
                  />
                </Tooltip>
                <div className={styles.map}>
                  <img src={config.mapImage} alt="" />
                </div>
              </div>
            </Col> */}
          </Row>
        </div>
        <div className={styles.ourPlayerReviewsSection}>
          <img
            src={config.sliderBackImg}
            className={styles.ourPlayerReviewsSectionBackImg}
            alt="sliderBackImg"
          />
          <img
            src={config.lineFlow}
            className={styles.ourPlayerReviewsSectionBackLineFlowImg}
            alt="lineFlow"
          />
          <Row type="flex" align="middle" justify="center" gutter={[0, 32]}>
            {/* <Col span={24}>
              <span className={styles.sectionTwo}>
                <p className={styles['ABOUT-KOORA-KINGS']}>
                  {i18n.t`Our Player Reviews`}
                </p>
                <div className={styles.Rectangle} />
                <p
                  className={`${styles.description} ${styles.ourPlayerReviewsDescription}`}
                >
                  {i18n.t`Our Player Reviews Description`}
                </p>
              </span>
            </Col>
            <Col span={16}>
              <Row
                type="flex"
                align="middle"
                justify="center"
                gutter={[32, 32]}
                className={styles.ourPlayers}
              >
                <img
                  src={config.sliderBackImg}
                  className={styles.ourPlayersBackImg}
                  alt="sliderBackImg"
                />
                <Col xs={24} lg={8}>
                  <Card
                    cover={
                      <div className={styles.cardContent}>
                        Lorem Ipsum is unadulterated drivel.means nothing
                        whatsoever, surprisingly useful. he Lorem Ipsum is
                        unadulterated drivel.means nothing whatsoever,
                        surprisingly useful. he main idea behind lorem
                      </div>
                    }
                    hoverable
                  >
                    <Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Naseema Al Morad"
                      description="Canada"
                    />
                  </Card>
                </Col>
                <Col xs={24} lg={8}>
                  <Card
                    cover={
                      <div className={styles.cardContent}>
                        Lorem Ipsum is unadulterated drivel.means nothing
                        whatsoever, surprisingly useful. he Lorem Ipsum is
                        unadulterated drivel.means nothing whatsoever,
                        surprisingly useful. he main idea behind lorem
                      </div>
                    }
                    hoverable
                  >
                    <Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Naseema Al Morad"
                      description="Canada"
                    />
                  </Card>
                </Col>
                <Col xs={24} lg={8}>
                  <Card
                    cover={
                      <div className={styles.cardContent}>
                        Lorem Ipsum is unadulterated drivel.means nothing
                        whatsoever, surprisingly useful. he Lorem Ipsum is
                        unadulterated drivel.means nothing whatsoever,
                        surprisingly useful. he main idea behind lorem
                      </div>
                    }
                    hoverable
                  >
                    <Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Naseema Al Morad"
                      description="Canada"
                    />
                  </Card>
                </Col>
              </Row>
            </Col> */}
          </Row>
        </div>
        <div className={styles.gameLeagueSec}>
          <Row type="flex" align="middle" justify="center" gutter={[0, 32]}>
            <Col span={24}>
              <span className={styles.sectionTwo}>
                <p
                  className={styles['ABOUT-KOORA-KINGS']}
                >{i18n.t`Our Game Leages`}</p>
                <div className={styles.Rectangle} />
                <p
                  className={`${styles.description} ${styles.ourPlayerReviewsDescription}`}
                >
                  {i18n.t`Our Game Leages Description`}
                </p>
              </span>
            </Col>
            <Col span={18}>
              <Carousel arrows dots={false}>
                <div className={styles.logo}>
                  <div className={styles.logoContainer}>
                    <img
                      src={config.laliga}
                      alt="laliga"
                      className={`${styles.mainLogo}`}
                    />
                  </div>
                  <div className={styles.logoContainer}>
                    <img
                      src={config.leagueOne}
                      alt="leagueOne"
                      className={`${styles.mainLogo}`}
                    />
                  </div>
                  <div className={styles.logoContainer}>
                    <img
                      src={config.primeLeague}
                      alt="primeLeague"
                      className={`${styles.mainLogo}`}
                    />
                  </div>
                  <div className={styles.logoContainer}>
                    <img
                      src={config.saudiProLeague}
                      alt="saudiProLeague"
                      className={`${styles.mainLogo}`}
                    />
                  </div>
                  <div className={styles.logoContainer}>
                    <img
                      src={config.uefaChampionsLeague}
                      alt="uefaChampionsLeague"
                      className={`${styles.mainLogo}`}
                    />
                  </div>
                </div>
              </Carousel>
            </Col>
          </Row>
        </div>
        <div className={styles.gameApp}>
          <Row type="flex" align="middle" justify="center" gutter={[0, 32]}>
            <Col span={24}>
              <span className={styles.sectionTwo}>
                <p className={styles.ourGameTitle}>{i18n.t`Our Game App`}</p>
                <p
                  className={`${styles.description} ${styles.ourGameAppDescription}`}
                >
                  {i18n.t`Our Game App Description`}
                </p>
              </span>
            </Col>
            <Col span={24}>
              <div className={styles.iphoneX}>
                <img src={config.iiphonexr} alt="" />
              </div>
            </Col>
            <Col span={24}>
              <div className={styles.storeIcons}>
                <a
                  href="https://play.google.com/store/apps/details?id=com.app.koorakings"
                  style={{ zIndex: '99' }}
                >
                  <img src={config.googleplayBlack} alt="" />
                </a>
                <a
                  href="https://apps.apple.com/sa/app/koora-kings-fantasy-football/id1485247377"
                  style={{ zIndex: '99' }}
                >
                  <img src={config.iosBlack} alt="" />
                </a>
              </div>
            </Col>
          </Row>
        </div>
        <div className={styles.footer}>
          <img src={config.footerBG} alt="" className={styles.leftImg} />
          <img src={config.footerBG} alt="" className={styles.rightImg} />
          <Row type="flex" justify="center" gutter={[32, 32]}>
            <Col xs={24} lg={8}>
              <div className={styles.footerRightContent}>
                <img src={config.logoPath} alt="" />
                <p>
                  كورة كنجز أول منصة عربية للعبة فانتسي كرة القدم تضم أشهر
                  الدوريات والبطولات العالمية والعربية في نفس التطبيق
                </p>
              </div>
            </Col>
            <Col xs={0} lg={8}>
              <div className={styles.footerUl}>
                {/* <ul>
                  <li>Company</li>
                  <li>About Us</li>
                  <li>Careers</li>
                  <li>Blog</li>
                  <li>Press</li>
                  <li> Brand Guidelines</li>
                </ul>
                <ul>
                  <li>Company</li>
                  <li>About Us</li>
                  <li>Careers</li>
                  <li>Blog</li>
                  <li>Press</li>
                  <li> Brand Guidelines</li>
                </ul> */}
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="center" align="middle" gutter={[32, 32]}>
            <Col xs={24} lg={8}>
              <div className={styles.upToDate}>
                <p
                  style={{
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    marginLeft: '100px',
                  }}
                >
                  Contact Us : example@gmial.com
                </p>
                {/* <div className={styles.inputBtn}>
                  <Input placeholder="Enter your E-mail" />
                  <Button>Subscribe</Button>
                </div> */}
              </div>
              <div className={styles.socialMediaIcons}>
                <Icon type="facebook" theme="filled" />
                <Icon type="linkedin" theme="filled" />
                <Icon type="twitter" />
                <Icon type="medium-square" theme="filled" />
                <Icon type="reddit-circle" theme="filled" />
                <Icon type="facebook" theme="filled" />
              </div>
            </Col>
            <Col xs={0} lg={8}>
              <div className={styles.upToDate}>
                <div className={styles.storeIcons}>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.app.koorakings"
                    style={{ zIndex: '99' }}
                  >
                    <img src={config.googlePlayWhite} alt="" />{' '}
                  </a>
                  <a
                    href="https://apps.apple.com/sa/app/koora-kings-fantasy-football/id1485247377"
                    style={{ zIndex: '99' }}
                  >
                    <img src={config.iosWhite} alt="" />
                  </a>
                </div>
                <div className={styles.socialMediaIcons}>
                  <div className={styles.allRights}>
                    <span>KooraKings &copy; 2021 All rights reserved</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default withRouter(
  connect(state => {
    return {
      loading: state.loading,
    }
  })(Form.create()(Home))
)
