import React from 'react'
import { connect } from 'react-redux'
// @ts-ignore
import Avatar from '@atlaskit/avatar'
import Comment, {
  CommentAuthor,
  CommentTime,
  CommentAction,
  CommentEdited,
  // @ts-ignore
} from '@atlaskit/comment'
import { getComment } from '@/comments/selectors'
import { CommentContainer } from './styled'

type Props = { taskId: string; text?: string; author?: string }

const TaskComment = ({ author, text }: Props) =>
  (text ? (
    <CommentContainer>
      <Comment
        avatar={<Avatar label="Mr.Manager" size="medium" />}
        author={<CommentAuthor>{author}</CommentAuthor>}
        content={<p>{text}</p>}
        actions={[
          <CommentAction>Reply</CommentAction>,
          <CommentAction>Edit</CommentAction>,
          <CommentAction>Like</CommentAction>,
        ]}
      />
    </CommentContainer>
  ) : null)

const stateToProps = (state: any, { taskId }: Props): TaskComment => ({
  ...getComment(state, { taskId }),
})

export default connect(
  stateToProps,
  null,
)(TaskComment)
