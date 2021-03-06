import { faker } from '@/libs/faker'
import { MANAGERS_QTY } from '../constants'

type GenerateManagers = (qty: number) => string[]
export const generateManagers = (qty = MANAGERS_QTY) =>
  Array(qty)
    .fill(null)
    .map(_ => faker.name.findName())
