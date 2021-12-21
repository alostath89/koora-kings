/* global FIREBASE_CONFIG */

import modelExtend from 'dva-model-extend'
import { pathMatchRegexp, config } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { delay } from 'redux-saga'
import { routerRedux } from 'dva/router'
import _ from 'lodash'
const {
  bannerDetails,
  createBanner,
  editBanner,
  deleteBanner,
  bannersList,
} = api

export default modelExtend(pageModel, {
  namespace: 'banners',
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
      const data = yield call(bannersList, payload)
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
      const data = yield call(bannerDetails, payload)
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
        const data = yield call(createBanner, payload)
        if (data.success) {
          message.success('Banner image added successfully!')
          yield put({
            type: 'list',
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
        const data = yield call(editBanner, payload)
        if (data.success) {
          message.success('Banner image updated successfully!')
          yield put({
            type: 'list',
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
    *removeBannerImage({ payload }, { put, call }) {
      const data = yield call(deleteBanner, payload)
      if (data.success) {
        message.success('Banner image deleted successfully!')
        yield put({
          type: 'list',
        })
      } else {
        throw data
      }
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
