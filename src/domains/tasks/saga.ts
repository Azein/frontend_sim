import { delay } from 'redux-saga'
import { takeEvery, put } from 'redux-saga/effects'
import { addExperience } from '@/domains/player/ducks'
import { eliminateTask, generateTask } from './ducks'

function* eliminationWatcher() {
  // @ts-ignore
  yield put(addExperience({ expAmount: 500 }))
  yield delay(2000)
  yield put(generateTask())
}

export function* tasksSaga() {
  yield takeEvery(eliminateTask.getType(), eliminationWatcher)
}
