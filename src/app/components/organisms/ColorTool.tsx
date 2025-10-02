'use client'

import { useEditorStore } from "@/store/use-editor-store";
import {type ColorResult, SketchPicker} from 'react-color';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@radix-ui/react-dropdown-menu";


const ColorTool = () => {
    const {editor} = useEditorStore();
    if(!editor) return null;

    const value = editor.getAttributes('textStyle')?.color || '#000000';

    const onChange = (color: ColorResult) => {
        editor.chain().focus().setColor(color.hex).run();
    };



  return (
    <div className="z-10">   
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center hover:bg-neutral-300/80 rounded-sm px-2 overflow-hidden">
              <span className="text-sm">A</span>
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2.5">
            <SketchPicker color={value} onChange={onChange} />
        </DropdownMenuContent>
    </DropdownMenu>
    </div>
 
  )
}

export default ColorTool;