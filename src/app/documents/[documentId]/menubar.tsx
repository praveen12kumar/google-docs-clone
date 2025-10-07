'use client';

import TableTool from '@/app/components/organisms/TableTool';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarShortcut,
} from '@/components/ui/menubar';
import { useEditorStore } from '@/store/use-editor-store';

import {
  FileIcon,
  FilePlusIcon,
  FilePenIcon,
  FileTextIcon,
  GlobeIcon,
  PrinterIcon,
  TrashIcon,
  FileJsonIcon,
  UndoIcon,
  Redo2Icon,
 
  TextIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  RemoveFormattingIcon, // if this icon doesn't exist in your lucide version, swap to Code2 or FileTextIcon
} from 'lucide-react';
import { BsFilePdf } from 'react-icons/bs';
import { blob } from 'stream/consumers';

const MenuBar = () => {

  const {editor} = useEditorStore();
  
  const onDownload = (blob: Blob, fileName: string)=>{
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
  }

  const onSaveJSON = ()=>{
    if(!editor) return;
    const json = editor.getJSON();
    const blob = new Blob([JSON.stringify(json)], {type: 'application/json'});
    onDownload(blob, 'document.json');  //Todo: use document name
  }

   const onSaveHTML = ()=>{
    if(!editor) return;
    const content = editor.getHTML();
    const blob = new Blob([content], {type: 'text/html'});
    onDownload(blob, 'document.html');  //Todo: use document name
  }

  const onSaveText = ()=>{
    if(!editor) return;
    const content = editor.getText();
    const blob = new Blob([content], {type: 'text/plain'});
    onDownload(blob, 'document.txt');  //Todo: use document name
  }

  return (
    <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
      {/* FILE */}
      <MenubarMenu>
        <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
          File
        </MenubarTrigger>

        <MenubarContent className="min-w-12 bg-zinc-50 shadow-md rounded-sm p-2 print:hidden">
          {/* Save submenu */}
          <MenubarSub>
            <MenubarSubTrigger className="w-32 outline-none rounded-sm hover:bg-neutral-200/80">
              <div className="flex ">
                <FileIcon className="size-4 mr-2 -ml-1" />
                <span>Save</span>
              </div>
            </MenubarSubTrigger>

            <MenubarSubContent className="min-w-12 flex flex-col gap-y-1 bg-white shadow-md rounded-sm p-3 print:hidden">
              <MenubarItem 
                  onClick={onSaveJSON}
                className="flex items-center p-1 outline-none rounded-sm hover:bg-neutral-300/80 cursor-pointer">
                {/* If FileJsonIcon doesn't exist in your lucide build, replace with FileTextIcon */}
                <FileJsonIcon className="size-4 mr-2" />
                JSON
              </MenubarItem>

              <MenubarItem
                onClick={onSaveHTML}
                className="flex items-center p-1 outline-none rounded-sm hover:bg-neutral-300/80 cursor-pointer">
                <GlobeIcon className="size-4 mr-2" />
                HTML
              </MenubarItem>

              <MenubarItem 
                onClick={()=> window.print()}
                className="flex items-center p-1 outline-none rounded-sm hover:bg-neutral-300/80 cursor-pointer">
                <BsFilePdf className="size-4 mr-2" />
                PDF
              </MenubarItem>

              <MenubarItem 
                onClick={onSaveText}
                className="flex items-center p-1 outline-none rounded-sm hover:bg-neutral-300/80 cursor-pointer">
                <FileTextIcon className="size-4 mr-2" />
                Text
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>

          <MenubarItem className="flex items-center outline-none rounded-sm hover:bg-neutral-200/80 p-1">
            <FilePlusIcon className="size-4 mr-2" />
            New Document
          </MenubarItem>

          <MenubarSeparator />

          <MenubarItem className="flex items-center outline-none rounded-sm hover:bg-neutral-200/80 p-1">
            <FilePenIcon className="size-4 mr-2" />
            Rename
          </MenubarItem>

          <MenubarItem className="flex items-center outline-none rounded-sm hover:bg-neutral-200/80 p-1">
            <TrashIcon className="size-4 mr-2" />
            Remove
          </MenubarItem>

          <MenubarSeparator />

          <MenubarItem
            onClick={() => window.print()}
            className="flex items-center outline-none rounded-sm hover:bg-neutral-200/80 p-1"
          >
            <PrinterIcon className="size-4 mr-2" />
            Print
            <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* EDIT */}
      <MenubarMenu>
        <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
          Edit
        </MenubarTrigger>
        {/* Optional: add Edit content if you want dropdown items */}
        {/* <MenubarContent>...</MenubarContent> */}
        <MenubarContent>
            <MenubarItem onClick={()=> editor?.chain().undo().run()}>
                <UndoIcon className="size-4 mr-2" />
                Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={()=> editor?.chain().redo().run()}>
                <Redo2Icon className="size-4 mr-2" />
                Redo <MenubarShortcut>⌘Y</MenubarShortcut>
            </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* INSERT */}
      <MenubarMenu>
        <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
          Insert
        </MenubarTrigger>
        <MenubarContent>
            <MenubarSub>
                <TableTool/>
            </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      {/* FORMAT */}
      <MenubarMenu>
        <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
          Format
        </MenubarTrigger>
        <MenubarContent>
            <MenubarSub>
                <MenubarSubTrigger>
                    <TextIcon className="size-4 mr-2" />
                    Text 
                </MenubarSubTrigger>
                <MenubarSubContent>
                    <MenubarItem onClick={()=> editor?.chain().toggleBold().run()}>
                        <BoldIcon className="size-4 mr-2" />
                        Bold <MenubarShortcut>⌘B</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={()=> editor?.chain().toggleItalic().run()}>
                        <ItalicIcon className="size-4 mr-2" />
                        Italic <MenubarShortcut>⌘I</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={()=> editor?.chain().toggleUnderline().run()}>
                        <UnderlineIcon className="size-4 mr-2" />
                        Underline <MenubarShortcut>⌘U</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={()=> editor?.chain().toggleStrike().run()}>
                        <StrikethroughIcon className="size-4 mr-2" />
                        Strikethrough &nbsp; <MenubarShortcut>⌘S</MenubarShortcut>
                    </MenubarItem>
                    
                </MenubarSubContent>
                <MenubarItem onClick={()=> editor?.chain().unsetAllMarks().run()}>
                    <RemoveFormattingIcon className="size-4 mr-2" />
                    Remove Formatting
                </MenubarItem>
            </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default MenuBar;
