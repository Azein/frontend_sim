import {
  values, indexBy, prop, omit, keys,
} from 'ramda'
import { getRandomRange } from '@/utils'
import { DEFAULT_TASKS_QTY } from '@/tasks/constants'

type GenerateTaskPools = (categories: TaskCategories) => TaskPools

export const generateTaskPools: GenerateTaskPools = (categories) => {
  const randomTasksRange = getRandomRange(values(categories), DEFAULT_TASKS_QTY)
  const activePool: TaskPool = indexBy(prop('taskId'), randomTasksRange)
  const activeIds = keys(activePool)
  // @ts-ignore
  const possibleTasks: TaskPool = omit(activeIds, categories)
  return {
    activePool,
    possibleTasks,
  }
}
