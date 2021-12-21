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
  competitionsList,
  competitionsDetails,
  createCompetitions,
  editCompetitions,
  getMatchesList,
  deleteCompetitions,
} = api

export default modelExtend(pageModel, {
  namespace: 'competitions',
  state: {
    list: [],
    pageSize: 25, // item per page,
    total: 0,
    npPages: 0,
    details: {},
    matches: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {},
  },
  effects: {
    *list({ payload }, { put, call }) {
      const data = yield call(competitionsList, payload)
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
      const data = yield call(competitionsDetails, payload)
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
        const data = yield call(createCompetitions, payload)
        if (data.success) {
          yield delay(5000)
          message.success('Competition added successfully!')
          yield put(routerRedux.push('/competitions'))
        } else {
          throw data
        }
      } catch (error) {
        let { fields } = error
        if (fields) {
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
      }
    },
    *update({ payload }, { put, call }) {
      try {
        const data = yield call(editCompetitions, payload)
        if (data.success) {
          yield delay(5000)
          message.success('User updated successfully!')
          yield put(routerRedux.push('/competitions'))
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
    *removeCompetitions({ payload }, { put, call }) {
      const data = yield call(deleteCompetitions, payload)
      if (data.success) {
        yield put({
          type: 'removeCompetitionsFromList',
          payload: data.data.result,
        })
      } else {
        throw data
      }
    },
    *matchesList({ payload }, { put, call }) {
      const data = yield call(getMatchesList, payload)
      if (data.success) {
        const { result } = data.data
        yield put({
          type: 'updateState',
          payload: {
            matches: result,
          },
        })
      } else {
        throw data
      }
    },
  },
  reducers: {
    removeCompetitionsFromList(state, { payload }) {
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
