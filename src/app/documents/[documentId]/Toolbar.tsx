'use client'

import { BoldIcon, 
        ItalicIcon, 
        ListTodoIcon, 
        LucideIcon, 
        MessageSquareCodeIcon, 
        PrinterIcon, 
        Redo2Icon, 
        RemoveFormattingIcon, 
        SpellCheckIcon, 
        StrikethroughIcon, 
        UnderlineIcon, 
        Undo2Icon, 
    
    } from "lucide-react";
import ToolbarButton from "@/components/molecules/ToolbarButton";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import FontFamilyTool from "@/components/organisms/FontFamilyTool";
import HeadingTool from "@/components/organisms/HeadingTool";
import ColorTool from "@/components/organisms/ColorTool";
import HighlightTool from "@/components/organisms/HighlightTool";
import LinkTool from "@/components/organisms/LinkTool";
import ImageTool from "@/components/organisms/ImageTool";
import AlignTool from "@/components/organisms/AlignTool";
import ListTool from "@/components/organisms/ListTool";
import FontSizeTool from "@/components/organisms/FontSizeTool";
import LineHeight from "@/components/organisms/LineHeightTool";


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
           onClick: () => {
                const dom = editor?.view.dom;
                if (!dom) return;
                const current = dom.getAttribute('spellcheck');
                const next = current === 'false' ? 'true' : 'false';
                dom.setAttribute('spellcheck', next);
            },
        }
        ],
        // section 1
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
        // section 2
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
        {/* Undo Redo print spellcheck */}
        {
            sections[0].map((item)=>(
                <ToolbarButton key={item.label} icon={item.icon} isActive={item.isActive} onClick={item.onClick}/>
            ))
        }

        <Separator orientation="vertical" className="mx-1 h-6 w-1 bg-neutral-700"/>
        {/* Font family */}
        <FontFamilyTool/>

        <Separator orientation="vertical" className="mx-1 h-6 w-1 bg-neutral-700"/>
        {/* Heading */}
         <HeadingTool/>

         <Separator orientation="vertical" className="mx-1 h-6 w-px bg-neutral-700"/>
         {/* Todo: font size */}

         <FontSizeTool/>

          <Separator orientation="vertical" className="mx-1 h-6 w-px bg-neutral-700"/>
          {/* font color, Highlight */}
          <ColorTool/>
          <HighlightTool/>

        <Separator orientation="vertical" className="mx-1 h-6 w-1 bg-black"/>
        {/* Link */}
        <LinkTool/>
        <ImageTool/>
        <AlignTool/>
        <LineHeight/>
        <ListTool/>

        <Separator orientation="vertical" className="mx-1 h-6 w-px bg-neutral-700"/>
        {/* Bold Italic underline strike */}
        {
            sections[1].map((item)=>(
                <ToolbarButton key={item.label} icon={item.icon} isActive={item.isActive} onClick={item.onClick}/>
            ))
        }


       <Separator orientation="vertical" className="mx-1 h-6 w-px bg-neutral-700"/>
        {/* Todo: comments */}
        {/* list todo remove formating */}
        {
            sections[2].map((item)=>(
                <ToolbarButton key={item.label} icon={item.icon} isActive={item.isActive} onClick={item.onClick}/>
            ))
        }
    </div>
  )
}

export default Toolbar;