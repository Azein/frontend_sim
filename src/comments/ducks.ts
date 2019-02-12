import { createAction, createReducer } from 'redux-act'
import { assoc } from 'ramda'

export const stateKey = 'comments'

export const taskCommentRequest = createAction(`${stateKey}/taskCommentRequest`)
export const addComment = createAction(`${stateKey}/addComment`)

export const commentsReducer = createReducer(
  {
    [addComment.getType()]: (state, { taskKey, comment }) =>
      assoc(taskKey, comment, state),
  },
  {},
)
