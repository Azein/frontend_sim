import React from 'react'
import { connect } from 'react-redux'
import { togglePause } from '@/world/WorldState'
import { eliminateTask, initStartingState } from '../../ducks'
import {
  Container, TaskCard, TaskPool, TaskText, TaskTimer,
} from './styled'

interface Props {
  removeTask: (payload: { taskId: number; taskKey: string }) => void
  taskId: number
  taskKey: string
  timer: number
  restartGame: () => void
  taskCount: number
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
      taskCount,
      pause,
    } = this.props
    // TODO - pause bug
    // TODO - taskName bug
    if (taskCount === 100) {
      if (
        window.confirm(
          'Не смог, не справился, был слишком тупым, уволен. Попробовать снова?',
        )
      ) {
        restartGame()
      }
    }
    if (timer === 0) {
      removeTask({ taskId, taskKey })
    }
  }

  render() {
    const { taskCount, label, timer } = this.props
    return (
      <Container>
        <TaskCard>
          <TaskText>{label}</TaskText>
          <TaskPool taskCount={taskCount} />
          <TaskTimer>{timer}</TaskTimer>
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
