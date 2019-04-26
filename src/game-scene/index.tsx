import React from 'react'
import { connect } from 'react-redux'
import { togglePause, worldTick } from '@/domains/world/WorldState'
import { pausedSelector, timePassedSelector } from '@/domains/world/selectors'
import { addTaskProgress, initStartingState } from '@/domains/tasks/ducks'
import { existingKeysSelector } from '@/domains/tasks/selectors'
import TaskRows from '@/domains/tasks/components/TaskRows'
import { Screen, SceneLayout, HUDArea } from './styled'

interface Props {
  addProgress: (Payload: { taskKey: string; progress: number }) => void
  startGame: Function
  toggleTimers: Function
  tick: (Payload: { time: number }) => void
  paused: boolean
  poolKeys: string[]
  timePassed: number
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
    const { addProgress, toggleTimers, paused } = this.props
    const { poolKeys } = this
    const { keyCode, repeat } = e
    const key = String.fromCharCode(keyCode).toLowerCase()

    if (!paused && !repeat && poolKeys.includes(key)) {
      addProgress({
        taskKey: `${key}`,
        progress: 5,
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
    return (
      <Screen>
        <SceneLayout>
          <TaskRows />
        </SceneLayout>
        <HUDArea />
      </Screen>
    )
  }
}

export default connect(
  state => ({
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
