import React from 'react'
import { useSpring } from 'react-spring'
import { AnimatedIndicator } from './styled'

interface Props {
  progressPercentage: number
}

export const ProgressBar = ({ progressPercentage }: Props) => {
  const animatedWidth = useSpring({ width: `${progressPercentage}%` })
  return <AnimatedIndicator style={animatedWidth} />
}
