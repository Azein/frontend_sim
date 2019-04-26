import { all } from 'redux-saga/effects'
import { tasksSaga } from '@/domains/tasks/saga'
import { commentsSaga } from '@/domains/comments/saga'

export default function* rootSaga() {
  yield all([tasksSaga(), commentsSaga()])
}
