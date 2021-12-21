import axios from 'axios'
import { cloneDeep } from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import { apiUrl } from 'utils/config'

const { CancelToken } = axios
window.cancelRequest = new Map()

export default function request(options) {
  let { data, url, method } = options
  const cloneData = cloneDeep(data)

  try {
    let domain = apiUrl
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/)
    if (urlMatch) {
      ;[domain] = urlMatch
      url = url.slice(domain.length)
    }

    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)
    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domain + url
  } catch (e) {
    message.error(e.message)
  }

  options.url = url
  if (options.method == 'GET') {
    options.params = cloneData
  } else {
    options.params = {}
  }
  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location?.Fame,
      cancel,
    })
  })
  return axios(options)
    .then(response => {
      const { statusText, status, data } = response

      let result = {}
      if (typeof data === 'object') {
        result = data
        if (Array.isArray(data)) {
          result.list = data
        }
      } else {
        result.data = data
      }

      return Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
        ...result,
      })
    })
    .catch(error => {
      const { response, message } = error

      if (String(message) === CANCEL_REQUEST_MESSAGE) {
        return {
          success: false,
        }
      }

      let msg
      let statusCode
      let fields
      if (response && response instanceof Object) {
        const { data, statusText } = response
        statusCode = response.status
        msg = data.message
        fields = data?.data?.errors
      } else {
        statusCode = 600
        msg = error.message || 'Network Error'
      }

      /* eslint-disable */
      return Promise.reject({
        success: false,
        statusCode,
        message: msg,
        fields,
      })
    })
}
