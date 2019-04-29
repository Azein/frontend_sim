import styled from '@/styled-components'
import { animated } from 'react-spring'
import { Layout } from '@/ui/components/Layout'

const CommentContainer = styled(Layout)`
  padding-top: 10px;
`

export const AnimatedContainer = animated(CommentContainer)
