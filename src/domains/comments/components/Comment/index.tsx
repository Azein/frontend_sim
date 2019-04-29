import React from 'react'
import { useSpring } from 'react-spring'
import { connect } from 'react-redux'
// @ts-ignore
import Avatar from '@atlaskit/avatar'
import Comment, {
  CommentAuthor,
  CommentAction,
  // @ts-ignore
} from '@atlaskit/comment'
import { getComment } from '@/domains/comments/selectors'
import { AnimatedContainer } from './styled'

type Props = { taskId: string; text?: string; author?: string }

const TaskComment = ({ author, text }: Props) => {
  const animatedOpacity = useSpring({ opacity: text ? 1 : 0 })

  return (
    <AnimatedContainer style={animatedOpacity}>
      <Comment
        avatar={<Avatar label="Mr.Manager" size="medium" />}
        author={<CommentAuthor>{author}</CommentAuthor>}
        content={<p>{text}</p>}
        actions={[
          <CommentAction>Reply</CommentAction>,
          <CommentAction>Like</CommentAction>,
        ]}
      />
    </AnimatedContainer>
  )
}

const stateToProps = (state: any, { taskId }: Props): TaskComment => ({
  ...getComment(state, { taskId }),
})

export default connect(
  stateToProps,
  null,
)(TaskComment)
