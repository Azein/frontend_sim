import { createAction, createReducer } from 'redux-act'
import { over, lensPath, map, without } from 'ramda'

import generateStartingState from 'world/TaskGeneration'
import { worldTick } from 'world/WorldState'

export const addTasks = createAction('tasksLoop/addTasks')
export const resolveTasks = createAction('tasksLoop/resolveTasks')
export const initStartingState = createAction('tasksLoop/initStartingState')
export const startMainLoop = createAction('tasksLoop/startMainLoop')
export const eliminateTask = createAction('tasksLoop/eliminateTask')
export const generateTask = createAction('tasksLoop/generateTask')

const tasksReducer = createReducer(
  {
    [initStartingState]: () => generateStartingState(),
    [addTasks]: (state, { taskKey, taskCount }) =>
      over(
        lensPath(['currentTasks', taskKey, 'taskCount']),
        (count) => (count >= 100 ? 100 : count + taskCount),
        state,
      ),
    [resolveTasks]: (state, { taskKey, taskCount }) =>
      over(
        lensPath(['currentTasks', taskKey, 'taskCount']),
        (count) => (count <= 0 ? 0 : count - taskCount),
        state,
      ),
    [eliminateTask]: (state, { taskId }) => state,
    [worldTick]: (state, { time }) =>
      over(
        lensPath(['currentTasks']),
        (tasks) =>
          map(
            (task) => ({
              ...task,
              timer: task.timer <= 0 ? 0 : task.timer - time,
            }),
            tasks,
          ),
        state,
      ),
  },
  generateStartingState(),
)

export default tasksReducer
