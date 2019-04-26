import { takeEvery, put, select } from 'redux-saga/effects'
import { taskCommentRequest, addComment, RequestCommentAction } from './ducks'
import { getComment, getRandomManager } from './selectors'
import { generateComment } from './logic/generate-comment'

// TODO solve typing for sagas
type AddCommentAction = (
  { taskId, comment }: { taskId: string; comment: TaskComment },
) => any
const addCommentAction: AddCommentAction = addComment

function* watchCommentRequests({
  payload: { taskId, stage, progressPercent },
}: {
type: string
payload: RequestCommentAction
}) {
  const state = yield select()
  const commentForTask = getComment(state, { taskId })

  const comment = generateComment({
    taskId,
    stage,
    progressPercent,
    author: commentForTask ? commentForTask.author : getRandomManager(state),
  })

  yield put(addCommentAction({ taskId, comment }))
}

export function* commentsSaga() {
  yield takeEvery(taskCommentRequest.getType(), watchCommentRequests)
}
