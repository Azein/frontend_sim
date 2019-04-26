import { COMMENTING_STAGES } from '@/domains/comments/constants'

const orderedStages = Object.entries(COMMENTING_STAGES).sort((a, b) => {
  const [key1, value1] = a
  const [key2, value2] = b
  return value1 - value2
})

type GetCommentStage = (
  timePassedPercent: number,
  prevStage: string,
) => string | null

// TODO - use memo, reduce stages per 1 with each new, or other smarter approach

export const getCommentStage: GetCommentStage = (
  timePassedPercent,
  prevStage,
) => {
  // @ts-ignore
  const [newStage, _] = orderedStages.reduce((acc, current) => {
    const [stage, percent] = current
    return timePassedPercent >= percent ? current : acc
  }, [])
  return newStage && newStage !== prevStage ? newStage : null
}
