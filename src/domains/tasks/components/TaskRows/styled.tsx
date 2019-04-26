import styled from '@/styled-components'
import { Layout } from '@/ui/components/Layout'

export const RowsContainer = styled(Layout)`
  overflow-y: auto;
`
export const Row = styled(Layout)`
  flex-flow: row nowrap;
  justify-content: center;
  flex-basis: content;
  flex-shrink: 0;
  flex-grow: 0;
  height: 300px;
`
