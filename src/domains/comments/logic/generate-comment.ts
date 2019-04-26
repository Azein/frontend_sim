import { path } from 'ramda'
import { protoComments } from '@/domains/comments/proto-comments'
import { PROGRESS_TRESHOLDS } from '@/domains/comments/constants'
import { getRandomElement } from '@/utils'

type GetCommentText = (stage: string, progressPercent: number) => string
const getCommentText: GetCommentText = (stage, progressPercent) => {
  const attitude = progressPercent >= PROGRESS_TRESHOLDS[stage] ? 'positive' : 'negative'
  const commentVariants: [] = path([stage, attitude], protoComments) || []
  return getRandomElement(commentVariants)
}

type GenerateComment = (
  {
    taskId,
    stage,
    progressPercent,
    author,
  }: { taskId: string; stage: string; progressPercent: number; author: string },
) => TaskComment
export const generateComment: GenerateComment = ({
  taskId,
  stage,
  progressPercent,
  author,
}) => ({
  taskId,
  author,
  text: getCommentText(stage, progressPercent),
})
