/* global FIREBASE_CONFIG */

import _ from 'lodash'
import queryString from 'query-string'

const helpers = {
  /**
   * Generate a new guid
   * @return {string}
   */
  firebaseConnection() {
    console.log(FIREBASE_CONFIG)
  },
  newGuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }

    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
  },

  /**
   * Split array into chunks
   * @param arr
   * @param n
   * @return {Array}
   */
  chunk: (arr, n) => {
    return Array.from(Array(Math.ceil(arr.length / n)), (_, i) =>
      arr.slice(i * n, i * n + n)
    )
  },
  /**
   * Check if string is empty
   * @param str
   * @return {boolean}
   */
  stringIsEmpty(str) {
    return !str || /^\s*$/.test(str)
  },
  /**
   * Check object if null or empty
   * @param obj
   * @return {boolean}
   */
  isNullOrEmpty(obj) {
    return !!(_.isNull(obj) || _.isEmpty(obj) || _.isUndefined(obj))
  },
  /**
   * Check object if null or undefined
   * @param obj
   * @return {boolean}
   */
  isNullOrUndefined(obj) {
    return !!(_.isNull(obj) || _.isUndefined(obj))
  },
  convertToInt(input, output) {
    try {
      return parseInt(input)
    } catch (e) {
      return output
    }
  },
  floatToString(numeric, decimals) {
    if (numeric) {
      return numeric.toFixed(decimals).toString()
    }
    return ''
  },
  calculateAge(dob) {
    if (!dob) return ''

    let birthday = +new Date(dob)
    return ~~((Date.now() - birthday) / 31557600000)
  },
  isFloat: val => {
    const floatRegex = /^-?\d+(?:[.,]\d*?)?$/
    if (!floatRegex.test(val)) {
      return false
    }

    val = parseFloat(val)
    return !isNaN(val)
  },
  isInt: val => {
    const intRegex = /^-?\d+$/
    if (!intRegex.test(val)) {
      return false
    }

    const intVal = parseInt(val, 10)
    return parseFloat(val) == intVal && !isNaN(intVal)
  },
  formatNumberLength: num => {
    let r = `${num}`
    while (r.length < 5) {
      r = `0${r}`
    }
    return r
  },
  isEmail: val => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return emailRegex.test(val)
  },
  isValidLocation: location => {
    return location && location.latitude && location.longitude
  },
  getLocationDistance: (location1, location2) => {
    const deg2rad = deg => {
      return deg * (Math.PI / 180)
    }

    const R = 6371 // Radius of the earth in km
    const dLat = deg2rad(location2.latitude - location1.latitude) // deg2rad below
    const dLon = deg2rad(location2.longitude - location1.longitude)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(location1.latitude)) *
        Math.cos(deg2rad(location2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // Distance in km

    return d * 1000 // Distance in m
  },
  /**
   * get addrress parts from latitude and langtude
   * @param {address} address parts that omes from google api
   */

  getAddressParts: (e, callback) => {
    if (
      typeof window.google === 'object' &&
      typeof window.google.maps === 'object'
    ) {
      let geocoder = new window.google.maps.Geocoder()

      geocoder.geocode({ location: e.latLng }, (address, status) => {
        if (status === 'OK' && address[0]) {
          let storableLocation = {}

          storableLocation.address = address[0].formatted_address

          for (let ac = 0; ac < address[0].address_components.length; ac++) {
            let component = address[0].address_components[ac]

            if (
              component.types.includes('sublocality') ||
              component.types.includes('locality')
            ) {
              storableLocation.city = component.long_name
            } else if (
              component.types.includes('administrative_area_level_1')
            ) {
              storableLocation.state = component.short_name
            } else if (component.types.includes('country')) {
              storableLocation.country = component.long_name
            } else if (component.types.includes('postal_code')) {
              storableLocation.zipcode = component.long_name
            }
          }

          storableLocation.coordinates = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          }

          callback(storableLocation)
          return
        }

        callback({ err: true })
      })
    }

    callback({ err: true })
  },
  sleep: ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  },
  checkEmptyString: async (rule, value, callback) => {
    if (value && value.trim() === '') {
      return await callback('Email should be in the right format!')
    } else {
      return await callback()
    }
  },
  checkEmptyFilters: (values, url, history) => {
    let queryUrl = ''
    Object.keys(values).forEach(row => {
      if (!values[row]) {
        delete values[row]
      }
    })
    if (Object.keys(values).length > 0) {
      queryUrl = `?${queryString.stringify(values)}`
    }
    history.replace(`${url}${queryUrl || ''}`)
  },
}

export default helpers
