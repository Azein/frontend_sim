import styled from '@/styled-components'

export const ProgressBar = styled('div')<{
progressPercentage: number
}>`
  height: 30px;
  max-width: 100%;
  flex-shrink: 0;
  flex-grow: 0;
  background-color: ${({ theme }) => theme.color.taskProgress};
  width: ${({ progressPercentage }) => `${progressPercentage}%`};
`
