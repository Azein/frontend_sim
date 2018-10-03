import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './RootReducer'
import rootSaga from './RootSaga'

const sagaMiddleware = createSagaMiddleware()

const logger = (store) => (next) => (action) => {
  console.log('dispatching', action)
  const result = next(action)
  console.log('next state', store.getState())
  return result
}

const configureStore = () => {
  // const store = createStore(rootReducer, compose(applyMiddleware(logger)))
  // const store = createStore(rootReducer)
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(applyMiddleware(sagaMiddleware)),
  )
  sagaMiddleware.run(rootSaga)
  return store
}

export default configureStore
