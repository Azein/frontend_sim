declare type TaskCategories = {
  [taskId: string]: {
    taskId: string
    taskName: string
  }
}

declare type FormedTask = {
  taskKey: string
  label: string
  taskProgress: number
  taskSize: number
  taskId: string
  timer: number
}

declare type FormedTaskPool = {
  [key: string]: FormedTask
}

declare type TaskPool = {
  [taskId: string]: {
    taskId: string
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
