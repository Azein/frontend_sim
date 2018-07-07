import { createSelector } from 'reselect'

const getPausedState = (state) => state.world.paused
const getTimePassed = (state) => state.world.timePassed

export const pausedSelector = createSelector(
  [getPausedState],
  (paused) => paused,
)

export const timePassedSelector = createSelector(
  [getTimePassed],
  (timePassed) => timePassed,
)
