import { reduce } from 'ramda'

type UnprefixedTasks = Array<{
  taskId: number
  taskName: string
}>

type GetPrefixedTasksMap = (
  prefix: string,
  tasks: UnprefixedTasks,
) => TaskCategories

export const getPrefixedTasksMap: GetPrefixedTasksMap = (prefix, tasks) =>
  reduce(
    (acc, current) => {
      const prefixedId = `${prefix}_${current.taskId}`
      return {
        ...acc,
        [prefixedId]: {
          ...current,
          taskId: prefixedId,
        },
      }
    },
    {},
    tasks,
  )
