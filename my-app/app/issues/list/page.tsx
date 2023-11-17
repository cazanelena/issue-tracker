import { TableBody, TableCell, TableColumnHeaderCell, TableHeader, TableRoot, TableRow } from "@radix-ui/themes";
import prisma from "@/prisma/client";

import IssueActions from "./IssueActions";
import {Link, IssueStatusBadge} from "@/app/components"

const IssuesPage = async () => {
  const issues =  await prisma.issue.findMany()

  
  return (
    <div>
     <IssueActions/>
      <TableRoot variant="surface">
        <TableHeader>
          <TableRow>
            <TableColumnHeaderCell>Issue</TableColumnHeaderCell>
            <TableColumnHeaderCell className="hidden md:table-cell">Status</TableColumnHeaderCell>
            <TableColumnHeaderCell className="hidden md:table-cell">Created</TableColumnHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
            <TableCell>
              <Link href={`/issues/${issue.id}`}>
              {issue.title}
              </Link>
              
              <div className="block md:hidden">
                {issue.status}
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status}/>
            </TableCell>
            <TableCell className="hidden md:table-cell">{issue.createdAt.toDateString()}</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </div>
  );
};
export const dynamic = "force-dynamic";
export default IssuesPage;
