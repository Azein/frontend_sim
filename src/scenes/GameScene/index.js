import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Layout } from 'ui/components/Layout/index'
import TaskBox from './components/TaskBox'
import TimeIndicator from './components/TimeIndicator'
import { addTasks, resolveTasks, initStartingState } from './ducks'
import { taskPoolsSelector, existingKeysSelector } from './selectors'
import { togglePause, worldTick } from 'world/WorldState'
import { pausedSelector, timePassedSelector } from 'world/selectors'

const mediaSrc = require('./k.mp3')

const SceneLayout = styled(Layout)`
  padding: 20px;
`
const MainArea = styled(Layout)`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`

const getRandomPool = (poolKeys) => poolKeys[Math.floor(Math.random() * 8)]

class GameScene extends React.Component {
  static mainLoop = null
  static poolTimers = null
  static worldTimer = null

  componentDidMount() {
    const { addToPool, resolve, poolKeys, startGame, toggleTimers } = this.props

    document.addEventListener('keydown', (e) => {
      console.log('xd')
      if (poolKeys.includes(e.key)) {
        resolve({
          taskKey: e.key,
          taskCount: 5,
        })
      }
      if (e.keyCode === 32) {
        toggleTimers()
      }
    })
    // this.startLoops()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.paused !== this.props.paused) {
      if (this.props.paused) {
        this.stopLoops()
      } else {
        this.startLoops()
      }
    }
  }

  stopLoops() {
    clearTimeout(this.mainLoop)
    clearTimeout(this.worldTimer)
    // clearTimeout(this.poolTimers)
  }

  startMainLoop() {
    const { poolKeys, addToPool } = this.props
    this.mainLoop = setTimeout(() => {
      addToPool({
        taskKey: getRandomPool(poolKeys),
        taskCount: 5,
      })
      this.startMainLoop()
    }, 300)
  }

  startWorldTimer() {
    const { tick } = this.props
    this.worldTimer = setTimeout(() => {
      tick({
        time: 1,
      })
      this.startWorldTimer()
    }, 1000)
  }

  startLoops() {
    this.startMainLoop()
    this.startWorldTimer()
  }

  render() {
    const { taskPools, timePassed } = this.props
    return (
      <SceneLayout>
        <audio src={mediaSrc} />
        <TimeIndicator time={timePassed} />
        <MainArea>
          {taskPools.map((taskPool) => (
            <TaskBox key={taskPool.id} {...taskPool} />
          ))}
        </MainArea>
      </SceneLayout>
    )
  }
}

export default connect(
  (state) => ({
    taskPools: taskPoolsSelector(state),
    poolKeys: existingKeysSelector(state),
    paused: pausedSelector(state),
    timePassed: timePassedSelector(state),
  }),
  (dispatch) =>
    bindActionCreators(
      {
        addToPool: addTasks,
        resolve: resolveTasks,
        startGame: initStartingState,
        toggleTimers: togglePause,
        tick: worldTick,
      },
      dispatch,
    ),
)(GameScene)
