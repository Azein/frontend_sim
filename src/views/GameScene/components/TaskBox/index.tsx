import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { togglePause } from '@/world/WorldState'
import { eliminateTask, initStartingState } from '../../ducks'
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

type GetProgressPercentage = (progress: number, size: number) => number
const getProgressPercentage: GetProgressPercentage = (progress, size) =>
  Math.floor(progress / (size / 100))

type ActionProps = {
  removeTask: (payload: { taskId: string; taskKey: string }) => void
  restartGame: () => void
  pause: () => void
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
}: Props) => {
  useEffect(() => {
    const timeIsOut = timer === 0
    const taskDone = taskProgress >= taskSize
    if (timeIsOut || taskDone) {
      removeTask({ taskId, taskKey })
    }
  })
  const progressPercentage = getProgressPercentage(taskProgress, taskSize)
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
        <ProgressIndicator progressPercentage={progressPercentage} />
        <PercentageIndicator>
          {progressPercentage}
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
  },
)(TaskBox)
