'use client'

import { useEditorStore } from "@/store/use-editor-store";
import {type ColorResult, SketchPicker} from 'react-color';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@radix-ui/react-dropdown-menu";
import { HighlighterIcon } from "lucide-react";


const HighlightTool = () => {
    const {editor} = useEditorStore();
    if(!editor) return null;

    const value = editor.getAttributes("highlight")?.color || '#ffffff';


    const onChange = (color: ColorResult) => {
        editor.chain().focus().setHighlight({color: color.hex}).run();
    };



  return (
    <div className="z-10">   
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="h-8 min-w-7 shrink-0 flex flex-col items-center justify-center hover:bg-neutral-300/80 rounded-sm px-2 overflow-hidden">
              <HighlighterIcon className="size-4"/>
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2 border-0">
            <SketchPicker color={value} onChange={onChange} />
        </DropdownMenuContent>
    </DropdownMenu>
    </div>
 
  )
}

export default HighlightTool;