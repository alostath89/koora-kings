/* global FIREBASE_CONFIG */

import modelExtend from 'dva-model-extend'
import { pathMatchRegexp, config } from '../../../src/utils'
import api from '../../services/api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { delay } from 'redux-saga'
import { routerRedux } from 'dva/router'
import _ from 'lodash'
const { userContestsList, userContestsDetails } = api

export default modelExtend(pageModel, {
  namespace: 'userContests',
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
      const data = yield call(userContestsList, payload)
      if (data.success) {
        const { result, npPages, hitsPerPage, nbHits } = data.data
        yield put({
          type: 'updateState',
          payload: {
            list: result,
            npPages,
            pageSize: hitsPerPage,
            total: nbHits,
          },
        })
      } else {
        throw data
      }
    },
    *details({ payload }, { put, call }) {
      const data = yield call(userContestsDetails, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            details: data.data.result[0],
          },
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
