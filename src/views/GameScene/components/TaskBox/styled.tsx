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
  width: 260px;
  height: 200px;
  border: ${({ theme }) => `2px solid ${theme.color.cardBorder}`};
  display: flex;
  flex-direction: row nowrap;
  border-radius: 8px;
`

export const ProgressIndicator = styled('div')<{
taskCount: number
}>`
  width: 30px;
  height: 100%;
  flex-shrink: 0;
  flex-grow: 0
  background-color: blue;
  height: ${({ taskCount }) => `${taskCount}%`};
`

export const ContentContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 4px;
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
