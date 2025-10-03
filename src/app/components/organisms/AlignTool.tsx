'use client'

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@radix-ui/react-dropdown-menu";
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, HighlighterIcon } from "lucide-react";


const AlignTool = () => {
    const {editor} = useEditorStore();
    if(!editor) return null;

    const alignments = [
        {
            label: 'Align Left',
            value: 'left',
            icon: AlignLeftIcon,
        },
        {
            label: 'Align Center',
            value: 'center',
            icon: AlignCenterIcon,
        },
        {
            label: 'Align Right',
            value: 'right',
            icon: AlignRightIcon,
        },
        {
            label: 'Align Justify',
            value: 'justify',
            icon: AlignJustifyIcon,
        },
    ]



  return (
    <div className="z-10">   
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="h-8 min-w-7 shrink-0 flex flex-col items-center justify-center hover:bg-neutral-300/80 rounded-sm px-2 overflow-hidden">
              <AlignLeftIcon className="size-4"/>
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2 border bg-white rounded-sm flex flex-col gap-y-1">
            {
                alignments.map((item)=>(
                    <DropdownMenuItem key={item.label} onClick={() => editor?.chain().focus().setTextAlign(item.value).run()}
                        className={cn("flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-neutral-300/80",
                            editor?.isActive({textAlign: item.value}) && "bg-neutral-300/80"
                        )}
                    >
                        <item.icon className="mr-2 size-4" />
                        <span className="text-sm">{item.label}</span>
                    </DropdownMenuItem>
                ))
            }
        </DropdownMenuContent>
    </DropdownMenu>
    </div>
 
  )
}

export default AlignTool;