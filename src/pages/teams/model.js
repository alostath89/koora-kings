/* global FIREBASE_CONFIG */

import modelExtend from 'dva-model-extend'
import { pathMatchRegexp, config } from '../../../src/utils'
import api from '../../services/api'
import { pageModel } from '../../utils/model'
import { message } from 'antd'
import { delay } from 'redux-saga'
import { routerRedux } from 'dva/router'
import _ from 'lodash'
const { teamsList, teamsDetails, createTeam, editTeam, deleteTeam } = api

export default modelExtend(pageModel, {
  namespace: 'teams',
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
      const data = yield call(teamsList, payload)
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
      const data = yield call(teamsDetails, payload)
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
        const data = yield call(createTeam, payload)
        if (data.success) {
          yield delay(5000)
          message.success('User added successfully!')
          yield put(routerRedux.push('/teams'))
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
        const data = yield call(editTeam, payload)
        if (data.success) {
          yield delay(5000)
          message.success('User updated successfully!')
          yield put(routerRedux.push('/teams'))
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
    *removeTeam({ payload }, { put, call }) {
      const data = yield call(deleteTeam, payload)
      if (data.success) {
        yield put({
          type: 'removeTeamFromList',
          payload: data.data.result,
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
