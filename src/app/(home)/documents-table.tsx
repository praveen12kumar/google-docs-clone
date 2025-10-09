import { PaginationStatus } from "convex/react";
import { Doc } from "../../../convex/_generated/dataModel";

import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@/components/ui/table";
import { FullscreenLoader } from "../../components/molecules/fullscreen-loader";
import DocumentRow from "./document-row";


interface DocumentsTableProps {
  documents: Doc<"documents">[] | undefined;
  status: PaginationStatus;
  loadMore: (numItems: number) => void;
}

const DocumentsTable = ({
  documents,
  status,
  loadMore,
}: DocumentsTableProps) => {
  return (
    <div className="max-w-screen-xl mx-auto py-16 px- flex flex-col gap-5">
      {documents === undefined ? (
        <FullscreenLoader label="Documents loading..." />
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50">
                <TableHead>Name</TableHead>
                <TableHead>&nbsp;</TableHead>
                <TableHead className="hidden md:table-cell">Shared</TableHead>
                <TableHead className="hidden md:table-cell">Created At</TableHead>
            </TableRow>
          </TableHeader>
          {
            documents.length === 0 ? (
                <TableBody>
                    <TableRow className="hover:bg-transparent">
                        <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">No documents found</TableCell>
                    </TableRow>
                </TableBody>
            ):(
                <TableBody className="">
                    {
                        documents.map((document)=>{
                            return <DocumentRow key={document._id} document={document} />
                        })
                    }
                </TableBody>
            )
          }
        </Table>
      )}
    </div>
  );
};

export default DocumentsTable;
