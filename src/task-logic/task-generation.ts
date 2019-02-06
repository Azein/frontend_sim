import shuffleArray from 'shuffle-array'
import {
  pipe,
  slice,
  values,
  reduce,
  pickBy,
  drop,
  without,
  append,
  prop,
  head,
  dissoc,
  assoc,
} from 'ramda'
import { allTasksMap as taskCategories } from './proto-tasks'
import { allKeys } from '@/controls-logic'
import { generateTask } from './generate-task'
import { generateTaskPools } from './generate-task-pools'

type KeysAndTasks = {
  usedKeys: string[]
  unusedKeys: string[]
  currentTasks: FormedTaskPool
}

type DistributeKeys = (
  selectedTasks: TaskPool,
  keysPool: string[],
) => KeysAndTasks

const distributeKeys: DistributeKeys = (selectedTasks, keysPool) =>
  reduce(
    // @ts-ignore
    (acc, value) => ({
      currentTasks: {
        ...acc.currentTasks,
        [acc.unusedKeys[0]]: generateTask({
          key: acc.unusedKeys[0],
          taskName: value.taskName,
          id: value.taskId,
        }),
      },
      usedKeys: [...acc.usedKeys, head(acc.unusedKeys)],
      unusedKeys: drop(1, acc.unusedKeys),
    }),
    {
      currentTasks: {},
      usedKeys: [],
      unusedKeys: [...keysPool],
    },
    values(selectedTasks),
  )

type GenerateStartingState = () => TasksState

const generateStartingState: GenerateStartingState = () => {
  const { activePool, possibleTasks } = generateTaskPools(taskCategories)
  console.info(activePool, allKeys)
  const { usedKeys, unusedKeys, currentTasks } = distributeKeys(
    activePool,
    allKeys,
  )

  console.info(currentTasks)

  return {
    possibleTasks,
    usedKeys,
    unusedKeys,
    currentTasks,
  }
}

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

type GenerateTaskPool = (state: TasksState) => TasksState

export const generateTaskPool: GenerateTaskPool = (state) => {
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

export default generateStartingState
