// @flow

import React from 'react'
import StyledButton, { AnimatedContainer, TextLayer, AnimationLayer } from './styled'

type Props = {
  children: Element,
  background?: string,
}

const Button = ({ children, background, ...props }: Props) => (
  <StyledButton {...props} background={background}>
    {children}
  </StyledButton>
)

Button.defaultProps = {
  background: 'primaryTeal',
}

export const AnimatedButton = ({ children, background, ...props }: Props) => (
  <AnimatedContainer {...props} background={background}>
    <TextLayer>{children}</TextLayer>
    <AnimationLayer />
  </AnimatedContainer>
)

AnimatedButton.defaultProps = {
  background: 'primaryTeal',
}

export default Button
