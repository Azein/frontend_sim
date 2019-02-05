import React from 'react'
import styled from '@/styled-components'
import EmojiFrequentIcon from '@atlaskit/icon/glyph/emoji/frequent'

const Container = styled.div`
  font-size: 16px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`

interface Props {
  children: React.ReactNode
}

const TimeIndicator = ({ children, ...props }: Props) => (
  <Container {...props}>
    <EmojiFrequentIcon label="" />
    <span>{children}</span>
  </Container>
)

export default TimeIndicator
