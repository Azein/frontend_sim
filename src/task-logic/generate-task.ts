import { getMinMax } from '@/utils'
import { taskCategories } from './protoTasks'

const DEFAULT_TIME_RANGE = [2, 20]
const DEFAULT_TASK_COUNT = 0

type GenerateTask = (
  {
    id,
    key,
    timeRange,
    taskCount,
    taskName,
  }: {
  id: number
  key: string
  timeRange?: [number, number]
  taskCount?: number
  taskName?: string
  },
) => FormedTask

export const generateTask: GenerateTask = ({
  id,
  key,
  timeRange,
  taskCount,
  taskName,
}) => {
  const [timeMin, timeMax] = timeRange || DEFAULT_TIME_RANGE
  return {
    taskKey: key,
    label: taskName || taskCategories[id].taskName,
    taskCount: taskCount || DEFAULT_TASK_COUNT,
    timer: getMinMax(timeMin, timeMax),
    taskId: id,
  }
}
