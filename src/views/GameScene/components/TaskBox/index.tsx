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

interface Props {
  removeTask: (payload: { taskId: string; taskKey: string }) => void
  taskId: string
  taskKey: string
  timer: number
  restartGame: () => void
  taskProgress: number
  pause: () => void
  label: string
}

class TaskBox extends React.Component<Props> {
  componentDidUpdate() {
    const {
      removeTask,
      taskId,
      taskKey,
      timer,
      restartGame,
      taskProgress,
      pause,
    } = this.props
    // TODO - pause bug
    // TODO - remove task mechanics
    if (timer === 0) {
      removeTask({ taskId, taskKey })
    }
  }

  render() {
    const { taskProgress, label, timer } = this.props
    return (
      <Container>
        <TaskCard>
          <ProgressIndicator taskCount={taskProgress} />
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
