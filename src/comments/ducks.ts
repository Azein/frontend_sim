import { createAction, createReducer } from 'redux-act'
import { assocPath, dissocPath } from 'ramda'
import { eliminateTask } from '@/tasks/ducks'
import { generateManagers } from './logic/generate-managers'

export const stateKey = 'comments'

export const taskCommentRequest = createAction(`${stateKey}/taskCommentRequest`)
export const addComment = createAction(`${stateKey}/addComment`)

interface State {
  managers: string[]
  comments: {
    [key: string]: any
  }
}
const initialState: State = {
  managers: generateManagers(),
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
