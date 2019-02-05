import styled from '@/styled-components'
import TimeIndicator from '../TimeIndicator'

export const Container = styled.div`
  width: 300px;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const TaskCard = styled.div`
  position: relative;
  width: 260px;
  height: 200px;
  border: ${({ theme }) => `2px solid ${theme.color.cardBorder}`};
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 4px;
`

export const TaskPool = styled('div')<{
taskCount: number
}>`
  width: 100%;
  background-color: red;
  height: ${({ taskCount }) => `${taskCount}%`};
`

export const TaskText = styled.p`
  flex-grow: 0;
  flex-shrink: 0;
  padding: 0;
  margin: 2px;
  font-size: 16px;
`
export const TaskTimer = styled(TimeIndicator)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  flex-grow: 0;
`
