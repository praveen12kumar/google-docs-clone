'use client'

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ListCollapseIcon } from "lucide-react";

const LineHeight = ()=>{
    const {editor} = useEditorStore();
    if(!editor) return null;

    const lineHeights = [
        { label: 'Default', value:'normal'},
        { label: 'Single',  value:'1'},
        { label: '1.15',    value:'1.15'},
        { label: '1.5',     value:'1.5'},
        { label: '2',       value:'2'},

    ];

    return(
        <div className="z-10">   
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="h-8 min-w-7 shrink-0 flex flex-col items-center justify-center hover:bg-neutral-300/80 rounded-sm px-2 overflow-hidden">
                      <ListCollapseIcon className="size-4"/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-1 bg-[#f9fcfd] flex flex-col gap-y-1 max-h-52 rounded-sm shadow overflow-auto">
                    {
                        lineHeights.map((item)=>(
                            <DropdownMenuItem key={item.label} onClick={() => editor?.chain().focus().setLineHeight(item.value).run()}
                                className={cn("flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-neutral-300/80",
                                    editor?.getAttributes('paragraph').lineHeight === item.value && "bg-neutral-300/80"
                                )}
                            >
                                <span className="text-sm">{item.label}</span>
                            </DropdownMenuItem>
                        ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
    )


}

export default LineHeight;  