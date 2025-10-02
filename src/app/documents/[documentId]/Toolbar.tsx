'use client'

import { BoldIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquareCodeIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, StrikethroughIcon, UnderlineIcon, Undo2Icon } from "lucide-react";
import ToolbarButton from "@/app/components/ToolbarButton";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import FontFamilyTool from "@/app/components/organisms/FontFamilyTool";



const Toolbar = () => {
    const {editor} = useEditorStore();

    const sections: {
        icon: LucideIcon,
        label: string,
        isActive?: boolean,
        onClick:()=>void,
    }[][] = [
        [{
            label: 'Undo',
            icon: Undo2Icon,
            onClick: ()=> editor?.chain().focus().undo().run(),
        },
        {
            label: "Redo",
            icon: Redo2Icon,
            onClick: ()=> editor?.chain().focus().redo().run(),
        },
        {
            label: 'Print',
            icon: PrinterIcon,
            onClick: ()=> window.print(),
        },
        {
            label: 'Spell Check',
            icon: SpellCheckIcon,
            onClick: ()=>{
                const current = editor?.view?.dom.getAttribute('spellcheck');
                editor?.view?.dom.setAttribute('spellcheck', current === 'true' ? 'false' : 'true');
            }
        }
        ],
        [
            {
                label: 'Bold',
                icon: BoldIcon,
                isActive: editor?.isActive('bold'),
                onClick: ()=> editor?.chain().focus().toggleBold().run(),
            },
            {
                label: 'Italic',
                icon: ItalicIcon,
                isActive: editor?.isActive('italic'),
                onClick: ()=> editor?.chain().focus().toggleItalic().run(),
            },
            {
                label:'Underline',
                icon: UnderlineIcon,
                isActive: editor?.isActive('underline'),
                onClick: ()=> editor?.chain().focus().toggleUnderline().run(),
            },
            {
                label: 'Strike',
                icon: StrikethroughIcon,
                isActive: editor?.isActive('strike'),
                onClick: ()=> editor?.chain().focus().toggleStrike().run(),
            }
        ],
        [
            {
                label: 'Comments',
                icon: MessageSquareCodeIcon,
                onClick: ()=> console.log("Todo Comments"),
                isActive: false
            },
            {
                label: "List Todo",
                icon: ListTodoIcon,
                onClick:()=> editor?.chain().focus().toggleTaskList().run(),
                isActive:false
            },
            {
                label: "Remove Formatting",
                icon: RemoveFormattingIcon,
                onClick:()=> editor?.chain().focus().unsetAllMarks().run(),
                isActive:false
            }
        ]
    ];


  return (
    <div className='text-gray-700 bg-[#f0f1f1] px-2 py-1.5 rounded-md min-h-3 flex items-center gap-x-0.5 overflow-x-auto'>
        {
            sections[0].map((item)=>(
                <ToolbarButton key={item.label} icon={item.icon} isActive={item.isActive} onClick={item.onClick}/>
            ))
        }
         <Separator orientation="vertical" className="h-6 bg-neutral-700"/>
         {/* Heading */}

        <Separator orientation="vertical" className="h-6 bg-neutral-900"/>
        {/* Todo: font family */}
        <FontFamilyTool/>
         <Separator orientation="vertical" className="h-6 bg-neutral-700"/>
         {/* Todo: font size */}
          <Separator orientation="vertical" className="h-6 bg-neutral-700"/>
          {/* Todo: font color */}
        {
            sections[1].map((item)=>(
                <ToolbarButton key={item.label} icon={item.icon} isActive={item.isActive} onClick={item.onClick}/>
            ))
        }
        <Separator orientation="vertical" className="h-6 bg-neutral-900"/>
        {
            sections[2].map((item)=>(
                <ToolbarButton key={item.label} icon={item.icon} isActive={item.isActive} onClick={item.onClick}/>
            ))
        }
    </div>
  )
}

export default Toolbar;