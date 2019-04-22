import { stateKey } from './ducks'
import { getRandomElement } from '@/utils'

type GetComment = (state: any, { taskId }: { taskId: string }) => TaskComment
export const getComment: GetComment = (state, { taskId }) =>
  state[stateKey].comments[taskId]

export const getRandomManager = (state: any) =>
  getRandomElement(state[stateKey].managers)
