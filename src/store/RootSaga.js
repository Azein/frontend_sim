import { fork } from 'redux-saga/effects'
import gameSaga from '../scenes/GameScene/saga'

export default function* rootSaga() {
  yield fork(gameSaga)
}
