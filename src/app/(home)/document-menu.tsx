import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Id } from "../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { ExternalLink, MoreVertical, TrashIcon } from "lucide-react";
import RemoveDialog from "@/components/molecules/remove-dialog";

interface DocumentMenuProps {
  documentId: Id<"documents">;
  title: string;
  onNewTab: (id: Id<"documents">) => void;
}

const DocumentMenu = ({ documentId, title, onNewTab }: DocumentMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full" variant="ghost" size="icon">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <RemoveDialog documentId={documentId}>
            <span className="flex items-center gap-2">
              <TrashIcon className="size-4" />
              <span>Delete</span>
            </span>
          </RemoveDialog>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <ExternalLink className="mr-2 size-4" /> Open in new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DocumentMenu;
