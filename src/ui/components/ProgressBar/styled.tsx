import styled from '@/styled-components'
import { animated } from 'react-spring'

const ProgressIndicator = styled('div')`
  height: 30px;
  max-width: 100%;
  flex-shrink: 0;
  flex-grow: 0;
  background-color: ${({ theme }) => theme.color.taskProgress};
`

export const AnimatedIndicator = animated(ProgressIndicator)
