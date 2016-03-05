import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import dashboardData from './modules/dashboardData'

export default combineReducers({
  router,
  dashboardData,
})
