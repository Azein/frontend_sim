import React from 'react'
import { connect } from 'react-redux'
import { getPercentage } from '@/utils'
import { ProgressBar } from '@/ui/components/ProgressBar'
import { selectLevelProgress } from '@/domains/player/selectors'
import { select } from 'redux-saga/effects'

interface Props {
  levelProgress: number
}

const ExpBar = ({ levelProgress }: Props) => (
  <ProgressBar progressPercentage={levelProgress} />
)

export default connect(state => ({
  levelProgress: selectLevelProgress(state),
}))(ExpBar)
