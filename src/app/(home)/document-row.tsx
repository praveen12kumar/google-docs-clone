import { TableCell, TableRow } from "@/components/ui/table";
import { SiGoogledocs } from "react-icons/si";
import { format } from "date-fns";
import { Doc } from "../../../convex/_generated/dataModel";
import { Building2Icon, CircleUser, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentRowProps {
  document: Doc<"documents">;
}

const DocumentRow = ({ document }: DocumentRowProps) => {
  const isOrg = Boolean(document.organizationId);

  return (
    <TableRow className="cursor-pointer">
      {/* Icon */}
      <TableCell className="w-[50px] align-middle">
        <SiGoogledocs className="h-6 w-6 fill-blue-500" />
      </TableCell>

      {/* Name */}
      <TableCell className="font-medium md:w-[45%] align-middle">
        {document.title}
      </TableCell>

      {/* Shared */}
      <TableCell className="text-muted-foreground hidden md:table-cell align-middle">
        <span className="inline-flex items-center gap-2">
          {isOrg ? (
            <Building2Icon className="size-4" />
          ) : (
            <CircleUser className="size-4" />
          )}
          {isOrg ? "Organization" : "Personal"}
        </span>
      </TableCell>

      {/* Created At */}
      <TableCell className="text-muted-foreground hidden md:table-cell align-middle">
        {format(new Date(document._creationTime), "MMM dd, yyyy")}
      </TableCell>

      {/* Actions (right-aligned) */}
      <TableCell className="hidden md:table-cell text-right align-middle">
        <Button className="rounded-full" variant="ghost" size="icon">
          <MoreVertical />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default DocumentRow;
