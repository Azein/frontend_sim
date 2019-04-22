import { all } from 'redux-saga/effects'
import { tasksSaga } from '@/tasks/saga'
import { commentsSaga } from '@/comments/saga'

export default function* rootSaga() {
  yield all([tasksSaga(), commentsSaga()])
}
