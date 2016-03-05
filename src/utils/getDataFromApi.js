import axios from 'axios'

import appConfig from '../appConfig'

const { apiUrl } = appConfig

console.log(apiUrl)

export default function getDataFromApi(apiType, subset, size, dateFrom, dateTo) {
  return axios.get(`${apiUrl}/${apiType}/${subset}/${size}?from=${dateFrom}&to=${dateTo}`)
}
