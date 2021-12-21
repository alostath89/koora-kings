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
  leaguesList,
  leaguesDetails,
  createLeague,
  editLeague,
  deleteLeague,
  toggleLeaguesStatus,
} = api

export default modelExtend(pageModel, {
  namespace: 'leagues',

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
      const data = yield call(leaguesList, payload)
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
      const data = yield call(leaguesDetails, payload)
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
    *create({ payload }, { put, call }) {
      try {
        const data = yield call(createLeague, payload)
        if (data.success) {
          yield delay(5000)
          message.success('User added successfully!')
          yield put(routerRedux.push('/leagues'))
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
        const data = yield call(editLeague, payload)
        if (data.success) {
          yield delay(5000)
          message.success('League updated successfully!')
          yield put(routerRedux.push('/leagues'))
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
    *removeLeague({ payload }, { put, call }) {
      const data = yield call(deleteLeague, payload)
      if (data.success) {
        yield put({
          type: 'removeLeagueFromList',
          payload: data.data.result,
        })
      } else {
        throw data
      }
    },
    *toggleLeagues({ payload }, { put, call }) {
      const data = yield call(toggleLeaguesStatus, payload)
      if (data.success) {
        yield put({
          type: 'toggleEnableDisableLeague',
          payload: data.data.result,
        })
      } else {
        throw data
      }
    },
  },
  reducers: {
    toggleEnableDisableLeague(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      const { list } = newState
      const newList =
        list &&
        _.isArray(list) &&
        list.map(row => {
          if (row.id === payload.id) {
            row.is_enabled = payload.is_enabled
          }
          return row
        })
      return {
        ...state,
        list: newList,
      }
    },
    removeLeagueFromList(state, { payload }) {
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
