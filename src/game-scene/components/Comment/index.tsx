import React from 'react'
import { connect } from 'react-redux'
import { getComment } from '@/comments/selectors'

type Props = { taskId: string; text?: string; author?: string }

const Comment = ({ author, text }: Props) => (
  <div>
    <p>{author}</p>
    <p>{text}</p>
  </div>
)

const stateToProps = (state: any, { taskId }: Props): TaskComment => ({
  ...getComment(state, { taskId }),
})

export default connect(
  stateToProps,
  null,
)(Comment)
