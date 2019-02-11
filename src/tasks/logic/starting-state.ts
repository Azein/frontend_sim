import { allTasksMap as taskCategories } from '../proto-tasks'
import { allKeys } from '@/controls'
import { generateTaskPools } from './generate-task-pools'
import { distributeKeys } from './distribute-keys'

type GenerateStartingState = () => TasksState

export const generateStartingState: GenerateStartingState = () => {
  const { activePool, possibleTasks } = generateTaskPools(taskCategories)
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
