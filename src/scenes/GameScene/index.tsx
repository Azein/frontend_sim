// @flow

import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import shuffleArray from 'shuffle-array'
import { head, pipe } from 'ramda'
import { Layout } from '@/ui/components/Layout'
import { togglePause, worldTick } from '@/world/WorldState'
import { pausedSelector, timePassedSelector } from '@/world/selectors'
import TaskBox from './components/TaskBox'
import TimeIndicator from './components/TimeIndicator'
import { addTasks, resolveTasks, initStartingState } from './ducks'
import { taskPoolsSelector, existingKeysSelector } from './selectors'

const mediaSrc = require('./k.mp3')

const SceneLayout = styled(Layout)`
  padding: 20px;
`
const MainArea = styled(Layout)`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`

type GetRandomPool = (a: Array<any>) => any
const getRandomPool: GetRandomPool = pipe(
  shuffleArray,
  head,
)

interface Props {
  addToPool: (Payload: { taskKey: string; taskCount: number }) => void
  resolve: (Payload: { taskKey: string; taskCount: number }) => void
  startGame: Function
  toggleTimers: Function
  tick: (Payload: { time: number }) => void
  paused: boolean
  poolKeys: string[]
  timePassed: number
  taskPools: Array<any>
}

class GameScene extends React.Component<Props> {
  mainLoop: null | any = null

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
    const { resolve, toggleTimers } = this.props
    const { poolKeys } = this
    const { key, keyCode, repeat } = e
    if (!repeat && poolKeys.includes(key)) {
      resolve({
        taskKey: `${key}`,
        taskCount: 5,
      })
    }
    if (keyCode === 32) {
      toggleTimers()
    }
  }

  stopLoops() {
    clearTimeout(this.mainLoop)
    clearTimeout(this.worldTimer)
  }

  startMainLoop() {
    const { addToPool } = this.props
    this.mainLoop = setTimeout(() => {
      const poolsExist = this.poolKeys.length > 0
      if (poolsExist) {
        addToPool({
          taskKey: getRandomPool(this.poolKeys),
          taskCount: 5,
        })
      }

      this.startMainLoop()
    }, 200)
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
        <audio src={mediaSrc} autoPlay />
        <TimeIndicator time={timePassed} />
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
    addToPool: addTasks,
    resolve: resolveTasks,
    startGame: initStartingState,
    toggleTimers: togglePause,
    tick: worldTick,
  },
)(GameScene)
