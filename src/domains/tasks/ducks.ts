import { createAction, createReducer } from 'redux-act'
import {
  over,
  lensPath,
  map,
  without,
  dissoc,
  assoc,
  pipe,
  append,
} from 'ramda'

import { generateStartingState } from '@/domains/tasks/logic/starting-state'
import { updateTaskPool } from '@/domains/tasks/logic/update-task-pool'
import { allTasksMap as taskCategories } from '@/domains/tasks/proto-tasks'
import { worldTick } from '@/domains/world/WorldState'

// export const addTasks = createAction('tasksLoop/addTasks')
export const addTaskProgress = createAction('tasksLoop/addTaskProgress')
export const initStartingState = createAction('tasksLoop/initStartingState')
export const startMainLoop = createAction('tasksLoop/startMainLoop')
export const eliminateTask = createAction('tasksLoop/eliminateTask')
export const generateTask = createAction('tasksLoop/generateTask')

const tasksReducer = createReducer(
  // @ts-ignore
  {
    [initStartingState.getType()]: () => generateStartingState(),
    [addTaskProgress.getType()]: (state, { taskKey, progress }) =>
      over(
        lensPath(['currentTasks', taskKey, 'taskProgress']),
        current => current + progress,
        state,
      ),
    [eliminateTask.getType()]: (state, { taskId, taskKey }) =>
      pipe(
        over(lensPath(['currentTasks']), dissoc(taskKey)),
        over(
          lensPath(['possibleTasks']),
          assoc(taskId, taskCategories[taskId]),
        ),
        over(lensPath(['usedKeys']), without([taskKey])),
        over(lensPath(['unusedKeys']), append(taskKey)),
      )(state),
    [generateTask.getType()]: state => updateTaskPool(state),
    [worldTick.getType()]: (state, { time }) =>
      over(
        lensPath(['currentTasks']),
        tasks =>
          map(
            task => ({
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

/*
    [addTasks.getType()]: (state, { taskKey, taskCount }) =>
      over(
        lensPath(['currentTasks', taskKey, 'taskCount']),
        count => (count >= 100 ? 100 : count + taskCount),
        state,
      ),
*/
