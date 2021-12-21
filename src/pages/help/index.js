import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import styles from './index.less'
import { config, helpers } from '../../../src/utils'
import { Button, Col, Form, Input, Row, Select } from 'antd'
const { TextArea } = Input
@withI18n()
@connect(({ loading }) => ({ loading }))
class Terms extends PureComponent {
  render() {
    const {
      loading: { effects },
      history: {
        location: { pathname },
      },
      form: { getFieldDecorator, getFieldValue },
    } = this.props
    return (
      <div>
        <Row
          type={'flex'}
          justify={'center'}
          gutter={[0, 16]}
          className={styles.section1}
        >
          {/*<Col span={24}>*/}
          {/*  <div className={styles.logo}>*/}
          {/*    <img*/}
          {/*      alt="logo"*/}
          {/*      src={config.logoPath}*/}
          {/*      className={styles.logoPath}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</Col>*/}
          {/*<Col span={24}>*/}
          {/*  <p className={styles.aboutHeaderP} style={{ color: '#343434' }}>*/}
          {/*    فيديو يوضح كيف تدخل توقعاتك بنجاح*/}
          {/*  </p>*/}
          {/*</Col>*/}
          {/*<Col span={24}>*/}
          {/*  <div className={styles.youTubeVedio}>*/}
          {/*    <iframe*/}
          {/*      width="560"*/}
          {/*      height="315"*/}
          {/*      src="https://www.youtube.com/embed/iqP1eum596M"*/}
          {/*      title="YouTube video player"*/}
          {/*      frameBorder="0"*/}
          {/*      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
          {/*      allowFullScreen*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</Col>*/}
          {/*<Col span={24}>*/}
          {/*  <p className={styles.aboutHeaderP} style={{ color: '#343434' }}>*/}
          {/*    شرح طريقة اللعب*/}
          {/*  </p>*/}
          {/*</Col>*/}
          {/*<Col span={24}>*/}
          {/*  <div className={styles.youTubeVedio}>*/}
          {/*    <iframe*/}
          {/*      width="560"*/}
          {/*      height="315"*/}
          {/*      src="https://www.youtube.com/embed/B6QNpWLTsN0"*/}
          {/*      title="YouTube video player"*/}
          {/*      frameBorder="0"*/}
          {/*      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
          {/*      allowFullScreen*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</Col>*/}
          <Col lg={12} md={12} sm={12} xs={12} style={{ textAlign: 'center' }}>
            <Button className={styles.start}>ابدأ التحدي</Button>
          </Col>
        </Row>
        <Row
          type={'flex'}
          justify={'center'}
          gutter={[0, 8]}
          className={styles.section2}
        >
          <Col xs={24} md={12}>
            <h2 className={styles.section2Heading} style={{ color: '#343434' }}>
              طريقة اللعب
            </h2>
            <ol>
              <li>
                سجل مجانا في منصة كورة كينجز عن طريق البريد الإلكتروني أو حساب
                الفيسبوك.
              </li>
              <li>
                <span>
                  انضم إلى دوري عام أو انشئ دوري خاص لتبدأ في المنافسة.
                </span>
                <ul>
                  <li>
                    لك الخيار أن تجعل الدوري الخاص مفتوح لانضمام أي شخص من
                    العامة أو تتركه خاص (مغلق) وتدعوا اصدقائك للعب معك عبر النقر
                    على زر دعوة اللاعبين في صفحة الدوري الخاص بي.
                  </li>
                  <li>تستطيع أن تنشئ عدة دوريات.</li>
                </ul>
              </li>
              <li>
                <span>
                  يمكنك أيضاً المشاركة في دوريات الرعاية والجوائز والمنافسة على
                  الجوائز حسب الشروط المذكورة لكل دوري*
                </span>
                <ul>
                  <li>
                    <strong>*ملاحظة: </strong>
                    دوريات الرعاية والجوائز مفتوحة مجاناً لجميع اللاعبين ولا
                    يشترط دفع أي مبلغ مالي للمشاركة فيها وستقدم الجوائز من كورة
                    كنجز أو أي راعي آخر.
                  </li>
                </ul>
              </li>
            </ol>
            <p
              className={styles.aboutHeaderP}
              style={{ color: '#666', textAlign: 'right' }}
            >
              ابدأ اللعب
            </p>
            <ol>
              <li>
                <span>ابدأ بوضع توقعاتك لكل مباراة في صفحة توقعاتي</span>
                <ul>
                  <li>اربح نقاط بتوقعك الصحيح للفريق الفائز أو التعادل</li>
                  <li>اربح نقاط بتوقعك الصحيح لعدد الأهداف للفريقين</li>
                  <li>
                    <span>اختر نقاط الثقة لكل مباراة واربح نقاط إضافية</span>
                    <ul>
                      <li>
                        <strong> نقاط الثقة: </strong>
                        نقاط تختارها لكل مباراة على حسب مدى ثقتك بتوقعك. النقاط
                        التي تستطيع إستخدامها تكون على حسب عدد المباريات الجولة.
                        مثال: إذا كانت هناك ١٤ مباراة في الجولة فلديك من ١ إلى
                        ١٤ نقطة تستطيع أن توزعها على جميع المباريات في الجولة.
                        إذا كانت ثقتك عالية بأن توقعك لفريق معين أنه سيفوز
                        فاختار نقاط ثقة عالية (١٤ نقطة مثلا) وإذا أصبت في توقعك
                        سوف تربح ١٤ نقطة إضافية. أما إذا كانت ثقتك بتوقعك غير
                        عالية بسبب توافق الفريقين في القوة فاختار نقاط ثقة غير
                        عالية (١ نقطة مثلا). إذا كان توقعك للفائزأوالتعادل صحيح
                        سوف تربح نقاط الثقة. إذا أخطأت في توقعك لن تربح النقاط
                        ولن تخصم منك أية نقاط.
                      </li>
                      <li>
                        <strong> نقاط الخطر: </strong>
                        نقاط تختارها لمبارة واحدة فقط على حسب مدى ثقتك بتلك
                        المبارة ولكن احذر من الوارد ان تخسر نقاطك في هذة الحالة.
                        طريقة الاستخدام: عند الانتهاء من التوقع للمباريات في
                        خانة نقاط الخطر اختر المبارة المراد وضع نقاط الخطر لها
                        واختر قيمة نقاط الخطر وانطلق، مثال (اخترت نقاط ثقة
                        لمبارة فرنسا والمانيا لصالح فرنسا وانتهت المبارة بفوز
                        فرنسا في هذة الحالة انت ربحت نقاط الخطر وفي حال الخسارة
                        فللاسف تم خصم نقاط الثقة من نقاطك)
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <span>
                  في صفحة الدوري الخاص بي تستطيع متابعة أحداث الدوري و مجموع
                  نقاطك وترتيبك في الدوري ضد المنافسين
                </span>
                <ul>
                  <li>
                    <strong>كسر التعادل: </strong>
                    إذا كان مجموع نقاطك يتساوى مع لاعب آخر، ستكون النقاط
                    الأساسية هي الفاصل.
                  </li>
                  <li>
                    <strong>النقاط الأساسية: </strong>
                    هي النقاط التي اكتسبتها من توقعاتك الصحيحة للفريق الفائز
                    وتوقعاتك للأهداف باستثناء نقاط الثقة.
                  </li>
                </ul>
              </li>
            </ol>
            <p
              className={styles.aboutHeaderP}
              style={{ color: '#666', textAlign: 'right' }}
            >
              طريقة احتساب النقاط
            </p>
            <ul>
              <li>(٣) نقاط لتوقعك الصحيح للفريق الفائز أو التعادل</li>
              <li>نقاط الثقة تكون حسب النقاط التي تم اختيارها</li>
              <li>(٦) نقاط لتوقعك الصحيح لعدد الأهداف للفريقين</li>
              <li>(١) نقطة لتوقعك الصحيح لعدد الأهداف لفريق واحد فقط</li>
            </ul>
            <p
              className={styles.aboutHeaderP}
              style={{ color: '#666', textAlign: 'right' }}
            >
              مثال لطريقة احتساب النقاط
            </p>
            <h5>
              <strong>توقعك: </strong>
              فريق البرازيل سوف يفوز على فريق سويسرا بنتيجة ٢-١ واخترت ١٠ نقاط
              ثقة للمباراة
            </h5>
            <h5>
              <strong>الواقع: </strong>
              فاز فريق البرازيل على فريق سويسرا بنتيجة ٣-١
            </h5>
            <ul>
              <li>
                في هذا الحال سوف تربح ٣ نقاط لتوقعك الصحيح بفوز البرازيل + ١نقطة
                لتوقعك الصحيح لعدد أهداف سويسرا + ١٠ نقاط ثقة لفوز البرازيل
              </li>
              <li>مجموع نقاطك لهذه المباراة = ١٤ نقطة</li>
            </ul>
          </Col>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button className={styles.start}>ابدأ التحدي</Button>
          </Col>
        </Row>
      </div>
    )
  }
}
export default connect(state => {
  return {
    loading: state.loading,
  }
})(Form.create()(Terms))
