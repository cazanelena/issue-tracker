import { TableBody, TableCell, TableColumnHeaderCell, TableHeader, TableRoot, TableRow } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueStatusBadge from "../components/IssueStatusBadge";
import delay from "delay";
import IssueActions from "./IssueActions";

const IssuesPage = async () => {
  const issues =  await prisma.issue.findMany()
  await delay(2000)
  
  return (
    <div>
     <IssueActions/>
      <TableRoot variant="surface">
        <TableHeader>
          <TableRow>
            <TableColumnHeaderCell>Issue</TableColumnHeaderCell>
            <TableColumnHeaderCell className="hidden md:table-cell">Statue</TableColumnHeaderCell>
            <TableColumnHeaderCell className="hidden md:table-cell">Created</TableColumnHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
            <TableCell>
              {issue.title}
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

export default IssuesPage;
