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
import { allKeys, taskCategories } from './proto/protoTasks'

type GenerateTaskIdsRange = () => number[]
const generateTaskIdsRange: GenerateTaskIdsRange = () =>
  [...Array(20)].map((_, i) => i)

type GetTaskTimer = (min: number, max: number) => number

const getMinMax: GetTaskTimer = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

type GenerateTaskPools = (
  randomIds: number[],
  categories: TaskCategories,
) => TaskPools

const generateTaskPools: GenerateTaskPools = (randomIds, categories) => {
  const activePool: TaskPool = pickBy(
    (_, key) => randomIds.includes(Number(key)),
    categories,
  )
  const possibleTasks: TaskPool = pickBy(
    (_, key) => !randomIds.includes(Number(key)),
    categories,
  )

  return {
    activePool,
    possibleTasks,
  }
}

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
        [acc.unusedKeys[0]]: {
          taskKey: acc.unusedKeys[0],
          label: `${acc.unusedKeys[0].toUpperCase()} - ${value.taskName}`,
          taskCount: 0,
          timer: getMinMax(30, 60),
          taskId: value.taskId,
        },
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

type GetRandomTaskIds = (ids: number[]) => number[]

const getRandomTaskIds: GetRandomTaskIds = pipe(
  shuffleArray,
  slice(0, 8),
  shuffleArray,
)

type GenerateStartingState = () => TasksState

const generateStartingState: GenerateStartingState = () => {
  const taskIdsRange = generateTaskIdsRange()
  const randomTaskIds = getRandomTaskIds(taskIdsRange)
  const { activePool, possibleTasks } = generateTaskPools(
    randomTaskIds,
    taskCategories,
  )
  const { usedKeys, unusedKeys, currentTasks } = distributeKeys(
    activePool,
    allKeys,
  )

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

type GenerateTask = (id: number, key: string) => FormedTask

const generateTask: GenerateTask = (id, key) => ({
  taskKey: key,
  label: `${key.toUpperCase()} - ${taskCategories[id].taskName}`,
  taskCount: 0,
  timer: getMinMax(30, 60),
  taskId: id,
})

type GenerateTaskPool = (state: TasksState) => TasksState

export const generateTaskPool: GenerateTaskPool = (state) => {
  const {
    possibleTasks, usedKeys, unusedKeys, currentTasks,
  } = state
  const newKey = getRandomKey(unusedKeys)
  const newTaskId = getNewId(possibleTasks)
  const newTask = generateTask(newTaskId, newKey)

  return {
    possibleTasks: dissoc(newTaskId, possibleTasks),
    currentTasks: assoc(newKey, newTask, currentTasks),
    usedKeys: append(newKey, usedKeys),
    unusedKeys: without([newKey], unusedKeys),
  }
}

export default generateStartingState
