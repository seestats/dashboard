import axios from 'axios'

import appConfig from '../appConfig'

const { apiUrl } = appConfig

console.log(apiUrl)

import getFakeData from './getFakeData'

export default function getDataFromApi(apiType, subset, size, dateFrom, dateTo) {
  // Data from api
  // return axios.get(`${apiUrl}/${apiType}/${subset}/${size}?from=${dateFrom}&to=${dateTo}`)

  // Fake data
  return new Promise((resolve, reject) => {
    resolve(getFakeData(size))
  })
}
