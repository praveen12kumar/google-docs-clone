'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEditorStore } from '@/store/use-editor-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter} from '@/components/ui/dialog'; // ← shadcn wrapper
import { ImageIcon, SearchIcon, UploadIcon } from 'lucide-react';


const ImageTool = () => {
  const { editor } = useEditorStore();

  // ✅ Hooks first (don’t depend on editor for initial state)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // Keep input in sync with current selection’s link mark
  const insertImage = (src: string)=>{
    editor?.chain().focus().insertContent({type: 'image', attrs:{src}}).run();
  }

  const onChange = (url: string)=>{
    insertImage(url);
    setIsDialogOpen(false);
  }

  const onUpload = ()=>{
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      insertImage(objectUrl);
      // Optional: revoke later when you replace with a real uploaded URL
      // URL.revokeObjectURL(objectUrl);
    }
  };
  input.click();
  }

  const handleImageUrlSubmit = () =>{
    if(imageUrl){
        //console.log(imageUrl);
        onChange(imageUrl);
        setImageUrl('');
        setIsDialogOpen(false);
    }
  }

  return (
    <div className="z-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-8 min-w-7 shrink-0 flex items-center justify-center hover:bg-neutral-300/80 rounded-sm px-2">
            <ImageIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="p-2.5 flex flex-col items-center justify-between">
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className="size-4 mr-6"/>
            Upload image
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=> setIsDialogOpen(true)}>
            <SearchIcon className="size-4 mr-2"/>
            Paste Image URL
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image URL</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Input 
                placeholder='Image URL' 
                value={imageUrl} 
                onKeyDown={(e) => {
                    if(e.key === 'Enter'){
                        handleImageUrlSubmit();
                    }
                }}
                onChange={(e)=> setImageUrl(e.target.value)}/>
            <Button onClick={handleImageUrlSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
    </div>
  );
};

export default ImageTool;
