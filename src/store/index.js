import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './RootReducer';
import rootSaga from './RootSaga';

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  /* eslint-disable */
  const reduxDevTools =
    global.__REDUX_DEVTOOLS_EXTENSION__ &&
    global.__REDUX_DEVTOOLS_EXTENSION__();
  /* eslint-enable */
  const store = createStore(
    rootReducer,

    compose(
      reduxDevTools,
      applyMiddleware(sagaMiddleware),
    ),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
