interface CommentingStages {
  [progressPercent: string]: string
}

interface ProgressTresholds {
  [stageName: string]: number
}

export const STAGE_NAMES = {
  start: 'start',
  progress: 'progress',
  nearDeadLine: 'nearDeadLine',
}

export const COMMENTING_STAGES: CommentingStages = {
  5: STAGE_NAMES.start,
  30: STAGE_NAMES.progress,
  85: STAGE_NAMES.nearDeadLine,
}

export const PROGRESS_TRESHOLDS: ProgressTresholds = {
  [STAGE_NAMES.start]: 0,
  [STAGE_NAMES.progress]: 50,
  [STAGE_NAMES.nearDeadLine]: 90,
}

export const MANAGERS_QTY = 4
