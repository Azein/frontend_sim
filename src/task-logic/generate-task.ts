import { getMinMax } from '@/utils'
import { allTasksMap as taskCategories } from './proto-tasks'

const DEFAULT_TIME_RANGE = [2, 20]
const DEFAULT_TASK_PROGRESS = 0

type GenerateTask = (
  {
    id,
    key,
    timeRange,
    taskProgress,
    taskName,
  }: {
  id: string
  key: string
  timeRange?: [number, number]
  taskProgress?: number
  taskName?: string
  },
) => FormedTask

export const generateTask: GenerateTask = ({
  id,
  key,
  timeRange,
  taskProgress,
  taskName,
}) => {
  const [timeMin, timeMax] = timeRange || DEFAULT_TIME_RANGE
  return {
    taskKey: key,
    label: taskName || taskCategories[id].taskName,
    taskProgress: taskProgress || DEFAULT_TASK_PROGRESS,
    timer: getMinMax(timeMin, timeMax),
    taskId: id,
  }
}
