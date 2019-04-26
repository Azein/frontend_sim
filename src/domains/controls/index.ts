import { flatten } from 'ramda'
import { getKeyRows } from './logic/get-key-rows'

const keys = ['q', 'w', 'e', 'r', 't', 'y', 'a', 's', 'd', 'f', 'g', 'h']

export const keyRows: Array<string[]> = getKeyRows(keys)

// @ts-ignore
export const allKeys: string[] = flatten(keyRows)
