import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import { routerMiddleware } from 'react-router-redux'
import { loadDashboardData } from './modules/dashboardData'

export default function configureStore (initialState = {}, history) {
  // Compose final middleware and use devtools in debug environment
  let middleware = applyMiddleware(thunk, routerMiddleware(history))
  if (__DEBUG__) {
    const devTools = window.devToolsExtension
      ? window.devToolsExtension()
      : require('containers/DevTools').default.instrument()
    middleware = compose(middleware, devTools)
  }

  // Create final store and subscribe router in debug env ie. for devtools
  const store = middleware(createStore)(rootReducer, initialState)

  // Random data generation for charts
  // setInterval(() => {
  //   store.dispatch({
  //     type: 'RANDOM_ALL_DATA',
  //   })
  // }, 5000);
  store.dispatch(loadDashboardData())

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default

      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
