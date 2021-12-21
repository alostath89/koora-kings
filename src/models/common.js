/* global window */

import api from 'api'
import { message } from 'antd'
import _ from 'lodash'
import { routerRedux } from 'dva/router'
import { delay } from 'redux-saga'

const {
  leaguesList,
  countriesList,
  seasonsList,
  uploadFile,
  competitionsList,
  sponsoredKKContestsList,
  sponsoredKKContestsDetails,
  deleteSponsoredKKContests,
  createSponsoredKKContests,
  editSponsoredKKContests,
  getAllContest,
} = api
export default {
  namespace: 'common',
  state: {
    leagues: [],
    countries: [],
    seasons: [],
    logo: [],
    competitions: [],
    sponsoredKKContests: [],
    pageSize: 25,
    total: 0,
    npPages: 0,
    sponsoredKKContestsDetails: {},
    allContests: [],
  },
  subscriptions: {},
  effects: {
    *allLeagues({ payload }, { put, call }) {
      const data = yield call(leaguesList, payload)
      if (data.success) {
        const { result } = data.data
        yield put({
          type: 'updateState',
          payload: {
            leagues: result,
          },
        })
      } else {
        throw data
      }
    },
    *allCompetitions({ payload }, { put, call }) {
      const data = yield call(competitionsList, payload)
      if (data.success) {
        const { result } = data.data
        yield put({
          type: 'updateState',
          payload: {
            competitions: result,
          },
        })
      } else {
        throw data
      }
    },
    *getAllCountries({ payload }, { put, call }) {
      const data = yield call(countriesList, payload)
      if (data.success) {
        const { result } = data.data
        yield put({
          type: 'updateState',
          payload: {
            countries: result,
          },
        })
      } else {
        throw data
      }
    },
    *getAllSeasons({ payload }, { put, call }) {
      const data = yield call(seasonsList, payload)
      if (data.success) {
        const { result } = data.data
        yield put({
          type: 'updateState',
          payload: {
            seasons: result,
          },
        })
      } else {
        throw data
      }
    },
    *uploadImage({ payload }, { put, call }) {
      try {
        const data = yield call(uploadFile, payload)
        if (data.success) {
          yield put({
            type: 'updateState',
            payload: {
              logo: data?.data?.result[0],
              imgUploadedSuccessful: true,
            },
          })
        } else {
          throw data
        }
      } catch (error) {
        yield put({
          type: 'updateState',
          payload: {
            imgUploadedSuccessful: false,
          },
        })
      }
    },
    *listKKSponsored({ payload }, { put, call }) {
      const data = yield call(sponsoredKKContestsList, payload)
      if (data.success) {
        const { result, npPages, hitsPerPage, nbHits } = data.data
        yield put({
          type: 'updateState',
          payload: {
            sponsoredKKContests: result,
            npPages,
            pageSize: hitsPerPage,
            total: nbHits,
          },
        })
      } else {
        throw data
      }
    },
    *detailsSponsoredKKContests({ payload }, { put, call }) {
      const data = yield call(sponsoredKKContestsDetails, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            sponsoredKKContestsDetails: data.data.result,
          },
        })
      } else {
        throw data
      }
    },
    *removeSponsoredKKContests({ payload }, { put, call }) {
      const data = yield call(deleteSponsoredKKContests, payload)
      if (data.success) {
        yield put({
          type: 'removeSponsoredKKContestsFromList',
          payload: data.data.result,
        })
      } else {
        throw data
      }
    },
    *addSponsoredKKContests({ payload }, { put, call }) {
      try {
        const data = yield call(createSponsoredKKContests, payload)
        if (data.success) {
          yield delay(5000)
          message.success('Contest added successfully!')
          yield put(routerRedux.push(`/${payload.category}Contests`))
        } else {
          throw data
        }
      } catch (error) {
        let { fields } = error
        Object.keys(fields).map(field => message.error(fields[field]))
      }
    },
    *updateSponsoredKKContests({ payload }, { put, call }) {
      try {
        const data = yield call(editSponsoredKKContests, payload)
        if (data.success) {
          yield delay(5000)
          message.success('Contest added successfully!')
          yield put(routerRedux.push(`/${payload.category}Contests`))
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
    *allContests({ payload }, { put, call }) {
      const data = yield call(getAllContest, payload)
      if (data.success) {
        const { result } = data.data
        yield put({
          type: 'updateState',
          payload: {
            allContests: result,
          },
        })
      } else {
        throw data
      }
    },
  },
  reducers: {
    removeSponsoredKKContestsFromList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      const { sponsoredKKContests } = newState
      const newList =
        sponsoredKKContests &&
        _.isArray(sponsoredKKContests) &&
        sponsoredKKContests.filter(row => row.id !== payload.id)
      return {
        ...state,
        sponsoredKKContests: newList,
      }
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
