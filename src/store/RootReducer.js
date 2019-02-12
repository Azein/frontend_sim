import { combineReducers } from 'redux'
import tasksReducer from '@/tasks/ducks'
import worldReducer from '@/world/WorldState'
import playerReducer from '@/world/PlayerState'
import { commentsReducer, stateKey as commentsKey } from '@/comments/ducks'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  world: worldReducer,
  player: playerReducer,
  [commentsKey]: commentsReducer,
})

export default rootReducer
