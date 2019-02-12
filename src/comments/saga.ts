import { takeEvery, put } from 'redux-saga/effects'
import { taskCommentRequest, addComment } from './ducks'

function* watchCommentRequests() {
  yield null
}

export function* commentsSaga() {
  yield takeEvery(taskCommentRequest.getType(), watchCommentRequests)
}
