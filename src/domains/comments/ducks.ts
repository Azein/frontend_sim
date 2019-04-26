import { createAction, createReducer } from 'redux-act'
import { assocPath, dissocPath } from 'ramda'
import { eliminateTask } from '@/domains/tasks/ducks'
import { generateManagers } from './logic/generate-managers'
import { MANAGERS_QTY } from './constants'

export const stateKey = 'comments'

export type RequestCommentAction = {
  taskId: string
  stage: string
  progressPercent: number
}
export const taskCommentRequest = createAction(`${stateKey}/taskCommentRequest`)

export const addComment = createAction(`${stateKey}/addComment`)

interface State {
  managers: string[]
  comments: {
    [key: string]: TaskComment
  }
}

const initialState: State = {
  managers: generateManagers(MANAGERS_QTY),
  comments: {},
}

export const commentsReducer = createReducer(
  // @ts-ignore
  {
    [addComment.getType()]: (state, { taskId, comment }) =>
      assocPath(['comments', taskId], comment, state),
    [eliminateTask.getType()]: (state, { taskId }) =>
      dissocPath(['comments', taskId], state),
  },
  initialState,
)
