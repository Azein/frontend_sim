import { combineReducers } from 'redux'
import tasksReducer from '../scenes/GameScene/ducks'
import worldReducer from '../world/WorldState'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  world: worldReducer,
})

export default rootReducer
