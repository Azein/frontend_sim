import { createSelector } from 'reselect'
import { values } from 'ramda'

const getUsedKeys = state => state.tasks.usedKeys

export const getTasks = state => state.tasks.currentTasks

export const taskPoolsSelector = createSelector([getTasks], tasks => [
  ...values(tasks),
])

export const existingKeysSelector = createSelector(
  [getUsedKeys],
  usedKeys => usedKeys,
)
