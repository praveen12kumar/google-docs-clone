'use client';

import { useState } from "react";
import { useMutation } from "convex/react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


interface RenameDialogProps {
    documentId: Id<"documents">
    initialTitle: string
    children: React.ReactNode
}

const RenameDialog = ({documentId, initialTitle, children}: RenameDialogProps)=>{

    const update = useMutation(api.documents.updateById);
    const [isUpdating, setIsIsUpdating] = useState(false);

    const [title, setTitle] = useState(initialTitle);
    const [open, setOpen] = useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsIsUpdating(true);
        update({id: documentId, title:title.trim() || "Untitled"})
        .finally(()=>{
            setIsIsUpdating(false);
            setOpen(false);
        })
    }

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent onClick={(e)=> e.stopPropagation()}>
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Rename</DialogTitle>
                        <DialogDescription>
                            Enter a new name for this document.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="my-4">
                        <Input 
                            type="text" 
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                            placeholder={initialTitle} 
                            onClick={(e)=> e.stopPropagation()}
                            />
                    </div>
                    <DialogFooter>
                        <Button 
                            type="button"
                            variant="ghost"
                            disabled={isUpdating}
                            onClick={(e)=>{
                                e.stopPropagation();
                                setOpen(false);
                            }}
                            >
                            Cancel
                        </Button>
                        <Button 
                            type="submit"
                            disabled={isUpdating}
                            onClick={(e)=> e.stopPropagation()}
                            >
                            Save
                        </Button>

                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
};


export default RenameDialog;

