import {
  reduce, drop, head, values,
} from 'ramda'

import { generateTask } from './generate-task'

type KeysAndTasks = {
  usedKeys: string[]
  unusedKeys: string[]
  currentTasks: FormedTaskPool
}

type DistributeKeys = (
  selectedTasks: TaskPool,
  keysPool: string[],
) => KeysAndTasks

export const distributeKeys: DistributeKeys = (selectedTasks, keysPool) =>
  reduce(
    // @ts-ignore
    (acc, value) => ({
      currentTasks: {
        ...acc.currentTasks,
        [acc.unusedKeys[0]]: generateTask({
          key: acc.unusedKeys[0],
          taskName: value.taskName,
          id: value.taskId,
        }),
      },
      usedKeys: [...acc.usedKeys, head(acc.unusedKeys)],
      unusedKeys: drop(1, acc.unusedKeys),
    }),
    {
      currentTasks: {},
      usedKeys: [],
      unusedKeys: [...keysPool],
    },
    values(selectedTasks),
  )
