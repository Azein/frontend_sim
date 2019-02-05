type GetMinMax = (min: number, max: number) => number

export const getMinMax: GetMinMax = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min
