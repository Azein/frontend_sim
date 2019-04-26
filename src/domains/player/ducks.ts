import { createReducer, createAction } from 'redux-act'
import {
  pipe, over, lensPath, when, propSatisfies, add,
} from 'ramda'
import devGrades, { DevGrade } from './devGrades'
import { getNextLvlExp } from './logic/get-next-lvl'

export const stateKey = 'player'

export const addExperience = createAction(`${stateKey}/addExperience`)
export const addLevel = createAction(`${stateKey}/addLevel`)

interface PlayerState {
  level: number
  grade: DevGrade
  totalExp: number
  toNextLvl: number
  skills: {}
}

const initialState: PlayerState = {
  level: 1,
  grade: devGrades.junior,
  totalExp: 0,
  toNextLvl: 1000,
  skills: {},
}

const playerReducer = createReducer(
  // @ts-ignore
  {
    [addExperience.getType()]: (state, { expAmount }) =>
      pipe(
        over(lensPath(['totalExp']), add(expAmount)),
        when(
          propSatisfies(exp => exp > state.toNextLvl, 'totalExp'),
          pipe(
            over(lensPath(['level']), add(1)),
            over(
              lensPath(['toNextLvl']),
              add(getNextLvlExp(state.toNextLvl, state.level)),
            ),
          ),
        ),
      )(state),
  },
  initialState,
)

export default playerReducer
