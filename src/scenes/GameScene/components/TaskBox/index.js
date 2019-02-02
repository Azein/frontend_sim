import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { togglePause } from 'world/WorldState'
import { eliminateTask, initStartingState } from '../../ducks'

const BoxContainer = styled.div`
  width: 300px;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Box = styled.div`
  position: relative;
  width: 100px;
  height: 200px;
  border: 5px solid black;
  border-top: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const TaskPool = styled.div`
  width: 100%;
  background-color: red;
  height: ${({ taskCount }) => `${taskCount}%`};
`

const BoxLabel = styled.div`
  height: 40px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const TaskTimer = styled.div`
  position: absolute;
  font-size: 20px;
  color: black;
  top: 10px;
  left: 10px;
`

class TaskBox extends React.Component {
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
    const {
      taskCount, label, timer, taskId, taskKey,
    } = this.props
    return (
      <BoxContainer>
        <Box>
          <TaskPool taskCount={taskCount} />
          <TaskTimer>{timer}</TaskTimer>
        </Box>
        <BoxLabel>{label}</BoxLabel>
      </BoxContainer>
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
