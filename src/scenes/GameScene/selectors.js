import { createSelector } from 'reselect'
import { values } from 'ramda'

const getTasks = (state) => state.tasks.currentTasks
const getUsedKeys = (state) => state.tasks.usedKeys

export const taskPoolsSelector = createSelector([getTasks], (tasks) => [
  ...values(tasks),
])

export const existingKeysSelector = createSelector(
  [getUsedKeys],
  (usedKeys) => usedKeys,
)
