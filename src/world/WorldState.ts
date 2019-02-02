import { createAction, createReducer } from 'redux-act'
import { add } from 'ramda'

export const togglePause = createAction('worldState/togglePause')
export const worldTick = createAction('worldState/worldTick')

interface InitialState {
  paused: boolean
  timePassed: number
}

const initialState: InitialState = {
  paused: true,
  timePassed: 0,
}

const worldReducer = createReducer(
  {
    [togglePause.getType()]: (state, payload) => ({
      ...state,
      paused: payload ? payload.mode : !state.paused,
    }),
    [worldTick.getType()]: (state, { time }) => ({
      ...state,
      timePassed: add(state.timePassed, time),
    }),
  },
  initialState,
)

export default worldReducer
