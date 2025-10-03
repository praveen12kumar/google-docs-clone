'use client'

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@radix-ui/react-dropdown-menu";
import { ListIcon, ListOrderedIcon } from "lucide-react";


const ListTool = () => {
    const {editor} = useEditorStore();
    if(!editor) return null;

    const lists = [
        {
            label: 'Bullet List',
            icon: ListIcon,
            isActive: editor.isActive('bulletList'),
            onClick: ()=> editor.chain().focus().toggleBulletList().run(),
        },
        {
            label: 'Ordered List',
            icon: ListOrderedIcon,
            isActive: editor.isActive('orderedList'),
            onClick: ()=> editor.chain().focus().toggleOrderedList().run()
        },
    ]



  return (
    <div className="z-10">   
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="h-8 min-w-7 shrink-0 flex flex-col items-center justify-center hover:bg-neutral-300/80 rounded-sm px-2 overflow-hidden">
              <ListIcon className="size-4"/>
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 bg-[#f9fcfd] flex flex-col gap-y-1 max-h-52 rounded-sm shadow overflow-auto">
            {
                lists.map((item)=>(
                    <DropdownMenuItem key={item.label} onClick={item.onClick}
                        className={cn("flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-neutral-300/80",
                            item.isActive && "bg-neutral-300/80"
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

export default ListTool;