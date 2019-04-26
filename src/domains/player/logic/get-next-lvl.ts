type GetNextLvlExp = (prevAmount: number, prevLevel: number) => number

export const getNextLvlExp: GetNextLvlExp = (prevAmount, prevLevel) => {
  const currentLevel = prevLevel + 1
  const basedOnLevel = currentLevel * (3000 + currentLevel * 100)
  const basedOnAmount = Math.ceil(prevAmount / 10)
  return basedOnLevel + basedOnAmount
}
