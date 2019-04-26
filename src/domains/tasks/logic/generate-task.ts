import { getMinMax } from '@/utils'
import { allTasksMap as taskCategories } from '@/domains/tasks/proto-tasks'

import {
  DEFAULT_TIME_RANGE,
  DEFAULT_TASK_PROGRESS,
  DEFAULT_TASK_SIZE,
} from '@/domains/tasks/constants'

type GenerateTask = (
  {
    id,
    key,
    timeRange,
    taskProgress,
    taskName,
    taskSize,
  }: {
  id: string
  key: string
  timeRange?: [number, number]
  taskProgress?: number
  taskName?: string
  taskSize?: number
  },
) => FormedTask

export const generateTask: GenerateTask = ({
  id,
  key,
  timeRange,
  taskProgress,
  taskName,
  taskSize,
}) => {
  const [timeMin, timeMax] = timeRange || DEFAULT_TIME_RANGE
  return {
    taskKey: key,
    label: taskName || taskCategories[id].taskName,
    taskProgress: taskProgress || DEFAULT_TASK_PROGRESS,
    taskSize: taskSize || DEFAULT_TASK_SIZE,
    timer: getMinMax(timeMin, timeMax),
    taskId: id,
  }
}
