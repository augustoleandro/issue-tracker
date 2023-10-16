import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

type color = 'red' | 'violet' | 'green'

const statusMap: Record<Status, { label: string, color: color }> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  DONE: { label: 'Done', color: 'green' },
}

function IssueStatusBadge({ status }: { status: Status }) {
  return (
    <Badge color={statusMap[status].color}>
      {statusMap[status].label}
    </Badge>
  )
}

export default IssueStatusBadge