/* global FIREBASE_CONFIG */

import modelExtend from 'dva-model-extend'
import { pathMatchRegexp, config } from '../../../src/utils'
import api from '../../services/api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { delay } from 'redux-saga'
import { routerRedux } from 'dva/router'
import _ from 'lodash'
const {
  sliderDetails,
  createSlider,
  editSlider,
  deleteSliderImage,
  sliderList,
} = api

export default modelExtend(pageModel, {
  namespace: 'slider',
  state: {
    list: [],
    pageSize: 25, // item per page,
    total: 0,
    npPages: 0,
    details: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {},
  },
  effects: {
    *list({ payload }, { put, call }) {
      const data = yield call(sliderList, payload)
      if (data.success) {
        const { result } = data.data
        yield put({
          type: 'updateState',
          payload: {
            list: result,
          },
        })
      } else {
        throw data
      }
    },
    *details({ payload }, { put, call }) {
      const data = yield call(sliderDetails, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            details: data.data.result,
          },
        })
      } else {
        throw data
      }
    },
    *create({ payload }, { put, call }) {
      try {
        const data = yield call(createSlider, payload)
        if (data.success) {
          message.success('Slider image added successfully!')
          yield put({
            type: 'details',
            payload: {
              slider_place: payload.slider_place,
            },
          })
        } else {
          throw data
        }
      } catch (error) {
        let { fields } = error
        Object.keys(fields).map(field => message.error(fields[field]))
      }
    },
    *update({ payload }, { put, call }) {
      try {
        const data = yield call(editSlider, payload)
        if (data.success) {
          message.success('Slider image updated successfully!')
          yield put({
            type: 'details',
            payload: {
              slider_place: payload.slider_place,
            },
          })
        } else {
          throw data
        }
      } catch (error) {
        let { fields } = error
        Object.keys(fields).map(field => {
          fields[field].status === 'error' &&
            message.error({
              content: <span id={field}>{fields[field].feedback.en}</span>,
              style: {
                marginTop: '20vh',
              },
            })
        })
      }
    },
    *removeSliderImage({ payload }, { put, call }) {
      const data = yield call(deleteSliderImage, payload)
      if (data.success) {
        message.success('Slider image deleted successfully!')
        yield put({
          type: 'details',
          payload: {
            slider_place: payload.slider_place,
          },
        })
      } else {
        throw data
      }
    },
    *clearDetails({ payload }, { put, call }) {
      yield put({
        type: 'updateState',
        payload: {
          details: {},
        },
      })
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
})
