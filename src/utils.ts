import { pipe, slice, head } from 'ramda'
import shuffleArray from 'shuffle-array'

type GetPercentage = (currentValue: number, pool: number) => number
export const getPercentage: GetPercentage = (currentValue, pool) =>
  Math.floor(currentValue / (pool / 100))

type GetMinMax = (min: number, max: number) => number

export const getMinMax: GetMinMax = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

type GetRandomElement = (a: Array<any>) => any
export const getRandomElement: GetRandomElement = pipe(
  shuffleArray,
  head,
)

type GetRandomRange = (array: Array<any>, range: number) => Array<any>

export const getRandomRange: GetRandomRange = (array, range = 8) =>
  // @ts-ignore
  pipe(
    shuffleArray,
    slice(0, range),
    shuffleArray,
  )(array)
