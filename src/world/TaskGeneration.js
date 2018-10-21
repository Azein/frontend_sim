// @flow

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
import { allKeys, taskCategories } from 'scenes/GameScene/proto/protoTasks'

type GenerateTaskIdsRange = () => number[]
const generateTaskIdsRange: GenerateTaskIdsRange = () =>
  [...Array(20)].map((_, i) => i)

type GetTaskTimer = (number, number) => number

const getMinMax: GetTaskTimer = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

type GenerateTaskPools = (number[], TaskCategories) => TaskPools
const generateTaskPools: GenerateTaskPools = (randomIds, categories) => {
  const activePool = pickBy(
    (_, key) => randomIds.includes(Number(key)),
    categories,
  )
  const possibleTasks = pickBy(
    (_, key) => !randomIds.includes(Number(key)),
    categories,
  )

  return {
    activePool,
    possibleTasks,
  }
}

type KeysAndTasks = {
  usedKeys: string[],
  unusedKeys: string[],
  currentTasks: FormedTask[],
}

const distributeKeys = (selectedTasks, keysPool): KeysAndTasks => {
  const result = reduce(
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
      usedKeys: [...acc.usedKeys, acc.unusedKeys[0]],
      unusedKeys: drop(1, acc.unusedKeys),
    }),
    {
      currentTasks: {},
      usedKeys: [],
      unusedKeys: [...keysPool],
    },
    values(selectedTasks),
  )
  return result
}

const generateStartingState = (): TasksState => {
  const randomTaskIds = pipe(
    shuffleArray,
    slice(0, 8),
    shuffleArray,
  )(generateTaskIdsRange())
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

type GetRandomKey = (string[]) => string
const getRandomKey: GetRandomKey = pipe(
  shuffleArray,
  head,
)

const getNewId = pipe(
  values,
  shuffleArray,
  head,
  prop('taskId'),
)

const generateTask = (id, key) => ({
  taskKey: key,
  label: `${key.toUpperCase()} - ${taskCategories[id].taskName}`,
  taskCount: 0,
  timer: getMinMax(30, 60),
  taskId: id,
})

type GenerateTaskPool = (TasksState) => TasksState

export const generateTaskPool: GenerateTaskPool = (state) => {
  const { possibleTasks, usedKeys, unusedKeys, currentTasks } = state
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
