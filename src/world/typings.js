// @flow

export type TaskCategories = {
  [number]: {
    taskId: number,
    taskName: string,
  },
}

export type GenerateTaskIdsRange = () => number[]

export type GetTaskTimer = (number, number) => number

export type FormedTask = {
  taskKey: string,
  label: string,
  taskCount: number,
  taskId: number,
  timer: number,
}

export type FormedTaskPool = {
  [key: string]: FormedTask,
}

export type TaskPool = {
  [taskId: string]: {
    taskId: number,
    taskName: string,
  },
}

export type TaskPools = {
  activePool: TaskPool,
  possibleTasks: TaskPool,
}

export type GenerateTaskPools = (number[], TaskCategories) => TaskPools

export type KeysAndTasks = {
  usedKeys: string[],
  unusedKeys: string[],
  currentTasks: FormedTask[],
}

export type TasksState = {
  possibleTasks: TaskPool,
  usedKeys: string[],
  unusedKeys: string[],
  currentTasks: FormedTaskPool,
}
