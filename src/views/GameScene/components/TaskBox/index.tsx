import React from 'react'
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

class TaskBox extends React.Component<Props> {
  componentDidUpdate() {
    const {
      removeTask,
      taskId,
      taskKey,
      timer,
      taskProgress,
      taskSize,
    } = this.props
    // TODO - pause bug
    // TODO - remove task mechanics

    const timeIsOut = timer === 0
    const taskDone = taskProgress >= taskSize
    if (timeIsOut || taskDone) {
      removeTask({ taskId, taskKey })
    }
  }

  render() {
    const {
      taskProgress, label, timer, taskSize,
    } = this.props
    const progressPercentage = getProgressPercentage(taskProgress, taskSize)
    return (
      <Container>
        <TaskCard>
          <ProgressIndicator taskCount={progressPercentage} />
          <ContentContainer>
            <TaskText>{label}</TaskText>
            <TaskTimer>{timer}</TaskTimer>
          </ContentContainer>
        </TaskCard>
      </Container>
    )
  }
}

export default connect(
  null,
  {
    removeTask: eliminateTask,
    restartGame: initStartingState,
    pause: togglePause,
  },
)(TaskBox)
