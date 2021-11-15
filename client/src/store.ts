import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'

import { allReducers } from './reducers'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers =
  process.env.name === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose
const middleware = [thunk, promiseMiddleware]

export const store = createStore(
  allReducers,
  // @ts-ignore
  compose(applyMiddleware(...middleware), composeEnhancers())
)
