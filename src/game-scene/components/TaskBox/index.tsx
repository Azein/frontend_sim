import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { togglePause } from '@/world/WorldState'
import { eliminateTask, initStartingState } from '@/tasks/ducks'
import { taskCommentRequest } from '@/comments/ducks'
import { COMMENTING_STAGES } from '@/comments/constants'
import { getPercentage } from '@/utils'
import {
  Container,
  TaskCard,
  ContentContainer,
  ProgressIndicator,
  TaskText,
  TaskTimer,
  HeaderBlock,
  TimerContainer,
  PercentageIndicator,
} from './styled'

type ActionProps = {
  removeTask: (payload: { taskId: string; taskKey: string }) => void
  restartGame: () => void
  pause: () => void
  requestComment: (
    payload: {
    taskId: string
    commentingStage: string
    progressPercent: number
    },
  ) => void
}

type Props = ActionProps & FormedTask

const TaskBox = ({
  removeTask,
  taskId,
  taskKey,
  timer,
  taskProgress,
  taskSize,
  label,
  requestComment,
}: Props) => {
  const initialTime = useRef(timer)
  const progressPercent = getPercentage(taskProgress, taskSize)
  useEffect(() => {
    const timeIsOut = timer === 0
    const taskDone = taskProgress >= taskSize
    if (timeIsOut || taskDone) {
      removeTask({ taskId, taskKey })
    }
  })
  useEffect(() => {
    const timePool = initialTime.current
    const timePassedPercent = getPercentage(timer, timePool)
    const commentingStage = COMMENTING_STAGES[timePassedPercent]
    if (
      commentingStage
    ) {
      requestComment({ taskId, commentingStage, progressPercent })
    }
  })

  return (
    <Container>
      <TaskCard>
        <ContentContainer>
          <HeaderBlock>
            <TaskText>{label}</TaskText>
            <TimerContainer>
              <TaskTimer>{timer}</TaskTimer>
            </TimerContainer>
          </HeaderBlock>
        </ContentContainer>
        <ProgressIndicator progressPercentage={progressPercent} />
        <PercentageIndicator>
          {progressPercent}
%
        </PercentageIndicator>
      </TaskCard>
    </Container>
  )
}

export default connect(
  null,
  {
    removeTask: eliminateTask,
    restartGame: initStartingState,
    pause: togglePause,
    requestComment: taskCommentRequest,
  },
)(TaskBox)
