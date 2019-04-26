import { PlayerState } from '@/domains/player/ducks'

type GetNextLvlExp = ({ level, toNextLvl }: PlayerState) => number

export const getNextLvlExp: GetNextLvlExp = ({ level, toNextLvl }) => {
  const basedOnLevel = level * (3000 + level * 100)
  const basedOnAmount = Math.ceil(toNextLvl / 10)
  return basedOnLevel + basedOnAmount
}
