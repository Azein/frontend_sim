import { getPrefixedTasksMap } from './utils'
import { techTasks } from './tech-tasks'
import { urgentTasks } from './urgent-tasks'
import { businessTasks } from './business-tasks'

const PREFIXES = {
  tech: 'tech',
  urgent: 'urgent',
  business: 'business',
}

export const techTasksMap = getPrefixedTasksMap(PREFIXES.tech, techTasks)
export const urgentTasksMap = getPrefixedTasksMap(PREFIXES.urgent, urgentTasks)
export const businessTasksMap = getPrefixedTasksMap(
  PREFIXES.business,
  businessTasks,
)

export const allTasksMap = {
  ...techTasksMap,
  ...urgentTasksMap,
  ...businessTasksMap,
}
