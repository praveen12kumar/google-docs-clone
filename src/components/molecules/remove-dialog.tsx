'use client';

import { useMutation } from "convex/react";
import { toast } from "sonner"


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Id } from "../../../convex/_generated/dataModel";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";

interface RemoveDialogProps{
    documentId: Id<"documents">;
    children: React.ReactNode;
}

const RemoveDialog = ({documentId, children}: RemoveDialogProps)=>{

    const remove = useMutation(api.documents.removeById);

    const [iseRemoving, setIsRemoving] = useState(false);

    return(
        <AlertDialog>
            <AlertDialogTrigger>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this document.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e)=> e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction 
                        disabled={iseRemoving}
                        onClick={(e)=>{
                            e.stopPropagation();
                            setIsRemoving(true);
                            remove({id: documentId})
                            .catch(()=> toast.error('Unauthorized to delete document'))
                            .then(()=> toast.success('Document deleted'))
                            .finally(()=>{setIsRemoving(false)})
                        }}
                        >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
};


export default RemoveDialog;