import { getPrefixedTasksMap } from './utils'
import { techTasks } from './tech-tasks'
import { urgentTasks } from './urgent-tasks'
import { businessTasks } from './business-tasks'
import { TASK_TYPES } from '@/task-logic/constants'

export const techTasksMap = getPrefixedTasksMap(TASK_TYPES.tech, techTasks)
export const urgentTasksMap = getPrefixedTasksMap(
  TASK_TYPES.urgent,
  urgentTasks,
)
export const businessTasksMap = getPrefixedTasksMap(
  TASK_TYPES.business,
  businessTasks,
)

export const allTasksMap = {
  ...techTasksMap,
  ...urgentTasksMap,
  ...businessTasksMap,
}
