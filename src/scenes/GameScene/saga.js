import { delay } from 'redux-saga'
import { takeEvery, put } from 'redux-saga/effects'
import { eliminateTask, generateTask } from './ducks'

function* eliminationWatcher() {
  yield delay(2500)
  yield put(generateTask())
}

function* gameSaga() {
  yield takeEvery(eliminateTask.getType(), eliminationWatcher)
}

export default gameSaga
