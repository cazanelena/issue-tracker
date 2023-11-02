import React from 'react'
import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';

const IssueStatusBadge = ({status} : {status: Status}) => {
    const statusMap: Record<Status, {lable: string, color: 'red' | 'violet' | 'green'}> = {
        OPEN: {lable: "Open", color: "red"},
        IN_PROGRESS: {lable: "In Progress", color: "violet"},
        CLOSED: {lable: "Closed", color: "green"}
    }
  return (
    <Badge color={statusMap[status].color}>
        {statusMap[status].lable}
    </Badge>
  )
}

export default IssueStatusBadge