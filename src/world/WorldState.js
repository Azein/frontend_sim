import { createAction, createReducer } from 'redux-act'
import { add } from 'ramda'

export const togglePause = createAction('worldState/togglePause')
export const worldTick = createAction('worldState/worldTick')

const initialState = {
  paused: true,
  timePassed: 0,
}

const worldReducer = createReducer(
  {
    [togglePause]: (state) => ({
      ...state,
      paused: !state.paused,
    }),
    [worldTick]: (state, { time }) => ({
      ...state,
      timePassed: add(state.timePassed, time),
    }),
  },
  initialState,
)

export default worldReducer
