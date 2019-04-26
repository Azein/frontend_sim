import { createSelector } from 'reselect'
import { getPercentage } from '@/utils'
import { stateKey } from './ducks'

type GetCurrentExp = (state: any) => number
export const getCurrentExp: GetCurrentExp = state => state[stateKey].currentExp

type GetNextLvlExp = (state: any) => number
export const getNextLvlExp: GetNextLvlExp = state => state[stateKey].toNextLvl

export const selectLevelProgress = createSelector(
  [getCurrentExp, getNextLvlExp],
  (exp, toNext) => getPercentage(exp, toNext),
)
