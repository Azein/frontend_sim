import styled from '@/styled-components'
import TimeIndicator from '@/ui/components/TimeIndicator'

export const Container = styled.div`
  width: 340px;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const TaskCard = styled.div`
  position: relative;
  width: 320px;
  height: 260px;
  border: ${({ theme }) => `2px solid ${theme.color.cardBorder}`};
  display: flex;
  flex-direction: column;
`

export const ProgressIndicator = styled('div')<{
progressPercentage: number
}>`
  height: 30px;
  max-width: 100%;
  flex-shrink: 0;
  flex-grow: 0;
  background-color: ${({ theme }) => theme.color.taskProgress};
  width: ${({ progressPercentage }) => `${progressPercentage}%`};
`

export const PercentageIndicator = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ContentContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 4px;
`
export const HeaderBlock = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
`

export const TaskText = styled.p`
  flex-grow: 0;
  padding: 0;
  margin: 2px;
  font-size: 16px;
`
export const TimerContainer = styled.div`
  margin-left: auto;
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`
export const TaskTimer = styled(TimeIndicator)`
  flex-grow: 0;
  flex-shrink: 0;
`
