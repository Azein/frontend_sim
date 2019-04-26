import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { togglePause } from '@/domains/world/WorldState'
import { eliminateTask, initStartingState } from '@/domains/tasks/ducks'
import {
  taskCommentRequest,
  RequestCommentAction,
} from '@/domains/comments/ducks'
import { getCommentStage } from '@/domains/comments/logic/get-stage'

import { getPercentage } from '@/utils'
import Comment from '@/domains/comments/components/Comment'
import { ProgressBar } from '@/ui/components/ProgressBar'
import {
  Container,
  TaskCard,
  ContentContainer,
  TaskText,
  TaskTimer,
  HeaderBlock,
  TimerContainer,
  PercentageIndicator,
} from './styled'

type ActionProps = {
  removeTask: (
    payload: { taskId: string; taskKey: string; timeIsOut: any; taskDone: any },
  ) => void
  restartGame: () => void
  pause: () => void
  requestComment: (payload: RequestCommentAction) => void
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
  const [stage, updateStage] = useState('initial')
  useEffect(() => {
    const timeIsOut = timer === 0
    const taskDone = taskProgress >= taskSize
    if (timeIsOut || taskDone) {
      removeTask({
        taskId,
        taskKey,
        timeIsOut,
        taskDone,
      })
    }
  })
  useEffect(() => {
    const timePool = initialTime.current
    const timePassedPercent = getPercentage(timePool - timer, timePool)
    const newStage = getCommentStage(timePassedPercent, stage)
    if (newStage) {
      requestComment({ taskId, stage: newStage, progressPercent })
      updateStage(newStage)
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
          <Comment taskId={taskId} />
        </ContentContainer>
        <ProgressBar progressPercentage={progressPercent} />
        <PercentageIndicator>
          {progressPercent}
%
        </PercentageIndicator>
      </TaskCard>
    </Container>
  )
}

export const EmptyTaskBox = () => (
  <Container>
    <TaskCard />
  </Container>
)

export default connect(
  null,
  {
    removeTask: eliminateTask,
    restartGame: initStartingState,
    pause: togglePause,
    requestComment: taskCommentRequest,
  },
)(TaskBox)
