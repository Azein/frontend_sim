import { all } from 'redux-saga/effects'
import { tasksSaga } from '@/tasks/saga'

export default function* rootSaga() {
  yield all([tasksSaga()])
}
