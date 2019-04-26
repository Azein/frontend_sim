import React from 'react'
import { connect } from 'react-redux'
import { keyRows } from '@/domains/controls'
import { getTasks } from '@/domains/tasks/selectors'
import TaskBox, { EmptyTaskBox } from '@/domains/tasks/components/TaskBox'
import { RowsContainer, Row } from './styled'

interface Props {
  taskPools: FormedTaskPool
}

const TaskRows = ({ taskPools }: Props) => (
  <RowsContainer>
    {keyRows.map(keyRow => (
      <Row>
        {keyRow.map(
          controlKey =>
            (taskPools[controlKey] ? (
              <TaskBox key={controlKey} {...taskPools[controlKey]} />
            ) : (
              <EmptyTaskBox key={`empty_${controlKey}`} />
            )),
        )}
      </Row>
    ))}
  </RowsContainer>
)

export default connect(
  state => ({
    taskPools: getTasks(state),
  }),
  null,
)(TaskRows)
