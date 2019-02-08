// @flow

import React from 'react'
import styled from '@/styled-components'
import { connect } from 'react-redux'
import { Layout } from '@/ui/components/Layout'
import { getRandomElement } from '@/utils'
import { togglePause, worldTick } from '@/world/WorldState'
import { pausedSelector, timePassedSelector } from '@/world/selectors'
import TaskBox from './components/TaskBox'
import { addTaskProgress, initStartingState } from './ducks'
import { taskPoolsSelector, existingKeysSelector } from './selectors'

const mediaSrc = require('./k.mp3')

const SceneLayout = styled(Layout)`
  padding: 20px;
`
const MainArea = styled(Layout)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  height: auto;
`

interface Props {
  addProgress: (Payload: { taskKey: string; taskCount: number }) => void
  startGame: Function
  toggleTimers: Function
  tick: (Payload: { time: number }) => void
  paused: boolean
  poolKeys: string[]
  timePassed: number
  taskPools: Array<any>
}

class GameScene extends React.Component<Props> {
  poolTimers: null | any = null

  worldTimer: null | any = null

  poolKeys: string[] = []

  componentDidMount() {
    const { poolKeys } = this.props
    this.poolKeys = poolKeys

    document.addEventListener('keydown', this.handleKeyDown)
    // this.startLoops()
  }

  componentDidUpdate(prevProps: Props) {
    const { paused, poolKeys } = this.props
    this.poolKeys = poolKeys
    if (prevProps.paused !== paused) {
      if (paused) {
        this.stopLoops()
      } else {
        this.startLoops()
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = (e: KeyboardEvent) => {
    const { addProgress, toggleTimers } = this.props
    const { poolKeys } = this
    const { key, keyCode, repeat } = e
    if (!repeat && poolKeys.includes(key)) {
      addProgress({
        taskKey: `${key}`,
        taskCount: 5,
      })
    }
    if (keyCode === 32) {
      toggleTimers()
    }
  }

  stopLoops() {
    clearTimeout(this.worldTimer)
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
    this.startWorldTimer()
  }

  render() {
    const { taskPools, timePassed } = this.props
    return (
      <SceneLayout>
        <audio src={mediaSrc} autoPlay />
        <MainArea>
          {taskPools.map(taskPool => (
            <TaskBox key={taskPool.taskId} {...taskPool} />
          ))}
        </MainArea>
      </SceneLayout>
    )
  }
}

export default connect(
  state => ({
    taskPools: taskPoolsSelector(state),
    poolKeys: existingKeysSelector(state),
    paused: pausedSelector(state),
    timePassed: timePassedSelector(state),
  }),
  {
    addProgress: addTaskProgress,
    startGame: initStartingState,
    toggleTimers: togglePause,
    tick: worldTick,
  },
)(GameScene)

/*
  startMainLoop() {
    const { addToPool } = this.props
    this.mainLoop = setTimeout(() => {
      const poolsExist = this.poolKeys.length > 0
      if (poolsExist) {
        addToPool({
          taskKey: getRandomElement(this.poolKeys),
          taskCount: 5,
        })
      }

      this.startMainLoop()
    }, 200)
  }
  */
