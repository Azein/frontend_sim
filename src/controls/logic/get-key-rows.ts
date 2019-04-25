import {
  splitEvery, pipe, slice, map,
} from 'ramda'
import { DEFAULT_TASKS_QTY } from '@/tasks/constants'
import { CONTROL_ROWS_QTY } from '@/controls/constants'

const rowSize = DEFAULT_TASKS_QTY / CONTROL_ROWS_QTY

type FillRows = (keys: string[]) => string[][]
const fillRows: FillRows = keys =>
  splitEvery(keys.length / CONTROL_ROWS_QTY, keys)

type OmitUnusedKeys = (rows: Array<string[]>) => Array<string[]>
const omitUnusedKeys: OmitUnusedKeys = rows =>
  map(el => slice(0, rowSize, el), rows)

export const getKeyRows = pipe(
  fillRows,
  omitUnusedKeys,
)
