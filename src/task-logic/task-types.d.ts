declare type TaskCategories = {
  [taskId: string]: {
    taskId: number
    taskName: string
  }
}

declare type FormedTask = {
  taskKey: string
  label: string
  taskCount: number
  taskId: number
  timer: number
}

declare type FormedTaskPool = {
  [key: string]: FormedTask
}

declare type TaskPool = {
  [taskId: string]: {
    taskId: number
    taskName: string
  }
}

declare type TaskPools = {
  activePool: TaskPool
  possibleTasks: TaskPool
}

declare type TasksState = {
  possibleTasks: TaskPool
  usedKeys: string[]
  unusedKeys: string[]
  currentTasks: FormedTaskPool
}
