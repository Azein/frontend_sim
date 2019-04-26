import { combineReducers } from 'redux'
import tasksReducer from '@/domains/tasks/ducks'
import worldReducer from '@/domains/world/WorldState'
import playerReducer from '@/domains/player/ducks'
import {
  commentsReducer,
  stateKey as commentsKey,
} from '@/domains/comments/ducks'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  world: worldReducer,
  player: playerReducer,
  [commentsKey]: commentsReducer,
})

export default rootReducer
