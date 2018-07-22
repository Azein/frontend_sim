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
  key: string,
  label: string,
  taskCount: number,
  timer: number,
}

export type FormedTaskPool = {
  [string]: FormedTask,
}

export type TaskPool = {
  [number]: {
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

export type InitialState = {
  possibleTasks: TaskPool,
  usedKeys: string[],
  unusedKeys: string[],
  currentTaskIds: number[],
  currentTasks: FormedTaskPool,
}
