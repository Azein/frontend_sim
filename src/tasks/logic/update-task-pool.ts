import {
  dissoc, assoc, append, without, pipe, prop, values, head,
} from 'ramda'
import shuffleArray from 'shuffle-array'
import { generateTask } from './generate-task'

type GetRandomKey = (keysArray: string[]) => string
const getRandomKey: GetRandomKey = pipe(
  shuffleArray,
  head,
)

const getNewId = pipe(
  values,
  shuffleArray,
  head,
  // @ts-ignore
  prop('taskId'),
)

type UpdateTaskPool = (state: TasksState) => TasksState

export const updateTaskPool: UpdateTaskPool = (state) => {
  const {
    possibleTasks, usedKeys, unusedKeys, currentTasks,
  } = state
  const newKey = getRandomKey(unusedKeys)
  const newTaskId = getNewId(possibleTasks)
  const newTask = generateTask({ id: newTaskId, key: newKey })

  return {
    possibleTasks: dissoc(newTaskId, possibleTasks),
    currentTasks: assoc(newKey, newTask, currentTasks),
    usedKeys: append(newKey, usedKeys),
    unusedKeys: without([newKey], unusedKeys),
  }
}
