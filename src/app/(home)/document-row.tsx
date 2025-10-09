import { TableCell, TableRow } from "@/components/ui/table";
import { SiGoogledocs } from "react-icons/si";
import { format } from "date-fns";
import { Doc } from "../../../convex/_generated/dataModel";
import { Building2Icon, CircleUser} from "lucide-react";
import DocumentMenu from "./document-menu";


interface DocumentRowProps {
  document: Doc<"documents">;
}

const DocumentRow = ({ document }: DocumentRowProps) => {
  const isOrg = Boolean(document.organizationId);


  const onNewTabClick = ()=>{
    window.open(`/documents/${document._id}`, "_blank");
  }

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
        <DocumentMenu
            documentId={document._id} 
            title={document.title}
            onNewTab={onNewTabClick}
            />
      </TableCell>
    </TableRow>
  );
};

export default DocumentRow;
