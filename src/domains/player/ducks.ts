import { createReducer, createAction } from 'redux-act'
import {
  pipe,
  over,
  lensPath,
  when,
  propSatisfies,
  add,
  assoc,
  prop,
  subtract,
} from 'ramda'
import devGrades, { DevGrade } from './devGrades'
import { getNextLvlExp } from './logic/get-next-lvl'

export const stateKey = 'player'

export const addExperience = createAction(`${stateKey}/addExperience`)
export const addLevel = createAction(`${stateKey}/addLevel`)

export interface PlayerState {
  level: number
  grade: DevGrade
  currentExp: number
  toNextLvl: number
  skills: {}
}

const initialState: PlayerState = {
  level: 1,
  grade: devGrades.junior,
  currentExp: 0,
  toNextLvl: 1000,
  skills: {},
}

// TODO - why even need any type?
type TransferExpToNext = (arg: any | PlayerState) => PlayerState

const transferExpToNext: TransferExpToNext = ({
  toNextLvl,
  currentExp,
  ...rest
}) => ({
  ...rest,
  toNextLvl,
  currentExp: currentExp - toNextLvl,
})

const lvlUp = over(lensPath(['level']), add(1))

const setNextLevel = (state: PlayerState) => ({
  ...state,
  toNextLvl: getNextLvlExp(state),
})

const playerReducer = createReducer(
  // @ts-ignore
  {
    [addExperience.getType()]: (state, { expAmount }) =>
      pipe(
        over(lensPath(['currentExp']), add(expAmount)),
        when(
          propSatisfies(exp => exp >= state.toNextLvl, 'currentExp'),
          pipe(
            // @ts-ignore
            (x) => {
              console.log('xd')
              return x
            },
            lvlUp,
            transferExpToNext,
            setNextLevel,
          ),
        ),
      )(state),
  },
  initialState,
)

export default playerReducer
