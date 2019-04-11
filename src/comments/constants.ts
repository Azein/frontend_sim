interface CommentingStages {
  [progressPercent: string]: string
}

export const COMMENTING_STAGES: CommentingStages = {
  5: 'start',
  30: 'progress',
  85: 'nearDeadline',
}

export const MANAGERS_QTY = 4
