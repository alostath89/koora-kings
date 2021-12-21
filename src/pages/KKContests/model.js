/* global FIREBASE_CONFIG */

import modelExtend from 'dva-model-extend'
import { pathMatchRegexp, config } from '../../../src/utils'
import api from '../../services/api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { delay } from 'redux-saga'
import { routerRedux } from 'dva/router'
import _ from 'lodash'
const { contestsList, teamsDetails, createTeam, editTeam, deleteTeam } = api

export default modelExtend(pageModel, {
  namespace: 'KKContests',
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
      const data = yield call(contestsList, payload)
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
  },
  reducers: {
    removeTeamFromList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      const { list } = newState
      const newList =
        list && _.isArray(list) && list.filter(row => row.id !== payload.id)
      return {
        ...state,
        list: newList,
      }
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
})
