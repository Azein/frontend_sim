import { pipe, slice } from 'ramda'
import shuffleArray from 'shuffle-array'

type GetMinMax = (min: number, max: number) => number

export const getMinMax: GetMinMax = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

type GetRandomRange = (array: Array<any>, range: number) => Array<any>

export const getRandomRange: GetRandomRange = (array, range = 8) =>
  // @ts-ignore
  pipe(
    shuffleArray,
    slice(0, range),
    shuffleArray,
  )(array)
