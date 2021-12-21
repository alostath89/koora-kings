/* global window */

import { router } from 'utils'
import { stringify } from 'qs'
import store from 'store'
import { ROLE_TYPE } from 'utils/constant'
import { queryLayout, pathMatchRegexp } from 'utils'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import api from '../services/api'
import config from 'config'
import listOfRoute from '../router'
import axios from 'axios'

export default {
  namespace: 'app',
  state: {
    routeList: [
      {
        id: '1',
        icon: 'laptop',
        name: 'Dashboard',
        zhName: '仪表盘',
        router: '/dashboard',
      },
    ],
    locationPathname: '',
    locationQuery: {},
    theme: store.get('theme') || 'light',
    collapsed: store.get('collapsed') || false,
    notifications: [
      {
        title: 'New User is registered.',
        date: new Date(Date.now() - 10000000),
      },
      {
        title: 'Application has been approved.',
        date: new Date(Date.now() - 50000000),
      },
    ],
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'query' })
    },
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location?.pathname,
            locationQuery: location.query,
          },
        })
      })
    },

    setupRequestCancel({ history }) {
      history.listen(() => {
        const { cancelRequest = new Map() } = window

        cancelRequest.forEach((value, key) => {
          if (value?.pathname !== window.location.pathname) {
            value.cancel(CANCEL_REQUEST_MESSAGE)
            cancelRequest.delete(key)
          }
        })
      })
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      const { locationPathname } = yield select(_ => _.app)
      const user = JSON.parse(localStorage.getItem('user'))
      let permissions = {
        visit: [],
      }
      for (let item of listOfRoute) {
        if (!item?.roles) {
          permissions.visit.push(item.id)
        }
      }
      if (user) {
        for (let item of listOfRoute) {
          if (item?.roles) {
            for (let roles of item?.roles) {
              permissions.visit.push(item.id)
            }
          }
        }
        axios.defaults.headers.common.Authorization = user.token
        store.set('isInit', true)
        if (pathMatchRegexp(['/', '/login'], window.location?.pathname)) {
          router.push({
            pathname: '/users',
          })
        }
      }
      store.set('routeList', listOfRoute)
      store.set('permissions', permissions)
    },
    *signOut({ payload }, { call, put }) {
      store.set('routeList', [])
      store.set('permissions', { visit: [] })
      store.set('user', {})
      localStorage.removeItem('user')
      store.set('isInit', false)
      yield put({ type: 'query' })
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    handleThemeChange(state, { payload }) {
      store.set('theme', payload)
      state.theme = payload
    },

    handleCollapseChange(state, { payload }) {
      store.set('collapsed', payload)
      state.collapsed = payload
    },

    allNotificationsRead(state) {
      state.notifications = []
    },
  },
}
