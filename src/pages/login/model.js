import { router, pathMatchRegexp } from '../../../src/utils'
import api from '../../services/api'
import axios from 'axios'

const { loginUser } = api

export default {
  namespace: 'login',

  state: {},

  effects: {
    *login({ payload }, { put, call, select }) {
      const data = yield call(loginUser, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data.success) {
        const { from } = locationQuery
        axios.defaults.headers.common.Authorization = data.data.result.token
        localStorage.setItem('user', JSON.stringify(data.data.result))
        yield put({ type: 'app/query' })
        if (from && !pathMatchRegexp('/login', from)) {
          if (['', '/'].includes(from)) router.push('/users')
          else router.push(from)
        } else {
          router.push('/users')
        }
      } else {
        throw data
      }
    },
  },
}
