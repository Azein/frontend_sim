import styled from '@/styled-components'

export const BoxContainer = styled.div`
  width: 300px;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Box = styled.div`
  position: relative;
  width: 100px;
  height: 200px;
  border: 5px solid black;
  border-top: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export const TaskPool = styled('div')<{
taskCount: number
}>`
  width: 100%;
  background-color: red;
  height: ${({ taskCount }) => `${taskCount}%`};
`

export const BoxLabel = styled.div`
  height: 40px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const TaskTimer = styled.div`
  position: absolute;
  font-size: 20px;
  color: black;
  top: 10px;
  left: 10px;
`
