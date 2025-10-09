'use client';

import { useEditorStore } from '@/store/use-editor-store';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon } from 'lucide-react';
import HeadingItem from '../molecules/HeadingItem';
import {type Level} from '@tiptap/extension-heading';

const HeadingTool = () => {
  const { editor } = useEditorStore();
  if (!editor) return null;

 const headings = [
    {label: "Normal text", value:0, fontSize: "16px"},
    {label: "Heading 1", value:1, fontSize: "32px"},
    {label: "Heading 2", value:2, fontSize: "24px"},
    {label: "Heading 3", value:3, fontSize: "20px"},
    {label: "Heading 4", value:4, fontSize: "18px"},
    {label: "Heading 5", value:5, fontSize: "16px"},
    {label: "Heading 6", value:6, fontSize: "14px"},
];

    const getCurrentHeading = () =>{
        for(let level = 1; level <= 6; level++){
            if(editor?.isActive(`heading`,{level})){
                return `heading ${level}`
            }
        }
        return "Normal text";
    }



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 text-sm flex items-center justify-center hover:bg-neutral-300/80 rounded-sm px-2 overflow-hidden">
          <span className="truncate" >
            {getCurrentHeading()}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-1 flex flex-col gap-1 max-h-72 overflow-auto">
        {
            headings?.map(({label, value, fontSize})=>(
                <DropdownMenuItem key={label}>
                    <HeadingItem
                    label={label}
                    value={value}
                    fontSize={fontSize}
                    onClick={()=>{
                        if(value === 0){
                            editor.chain().focus().setParagraph().run();
                        }
                        else{
                            editor.chain().focus().toggleHeading({level: value as Level}).run();
                        }
                    }}
                    />
                </DropdownMenuItem>
            ))
        }

        {/* Reset to theme default */}
        <DropdownMenuItem onClick={() => editor.chain().focus().unsetFontFamily().run()}>
          Reset to default
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeadingTool;
