import React from 'react'
import styled from '@/styled-components'

const Container = styled.div`
  position: absolute;
  font-size: 20px;
  color: blue;
  top: 10px;
  right: 20px;
`

interface Props {
  time: number;
}

const TimeIndicator = ({ time }: Props) => <Container>{time}</Container>

export default TimeIndicator
