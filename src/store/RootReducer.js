import { combineReducers } from 'redux'
import tasksReducer from '@/tasks/ducks'
import worldReducer from '@/world/WorldState'
import playerReducer from '@/world/PlayerState'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  world: worldReducer,
  player: playerReducer,
})

export default rootReducer
