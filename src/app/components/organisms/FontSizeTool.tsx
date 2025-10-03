'use client'

import { useEditorStore } from "@/store/use-editor-store";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

const FontSizeTool = () =>{
    const {editor} = useEditorStore();
    
    const currentFontSize = editor?.getAttributes('textStyle')?.fontSize?
        editor.getAttributes('textStyle').fontSize.replace('px',''):
        "16px";
    
    const [fontSize, setFontSize] = useState(currentFontSize);
    const [inputValue, setInputValue] = useState(fontSize);
    const [isEditing, setIsEditing] = useState(false);

    const updateFontSize = (newSize: string)=>{
        const size = parseInt(newSize);
        if(!isNaN(size) && size > 0){
            editor?.chain().focus().setFontSize(`${size}px`).run();
            setFontSize(newSize);
            setIsEditing(false);
            setInputValue(newSize);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setInputValue(e.target.value);
    };

    const handleInputBlur = ()=>{
        updateFontSize(inputValue);
    };


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter'){
            e.preventDefault();
            updateFontSize(inputValue);
            editor?.commands.focus();        }
    }

    const increment = () =>{
        const newSize = parseInt(fontSize) + 1;
        updateFontSize(newSize.toString());
    };

    const decrement = () =>{
        const newSize = parseInt(fontSize) - 1;
        if(newSize < 1)return;
        updateFontSize(newSize.toString());
    }
    

    return(
        <div className="flex items-center gap-x-0.5 z-10">
            <button className="h-7 w-7 text-sm flex items-center justify-center hover:bg-neutral-300/80 rounded-sm"
                onClick={decrement}
            >
            <MinusIcon className="size-4"/>
            </button>
            {
                isEditing?
                <input type="text" 
                    value={inputValue}
                    className="h-7 w-16 text-sm border text-center rounded-sm bg-transparent focus:ring-0 outline-none"
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                />
                :
                (
                <button className="h-7 w-10 text-sm bordeer border-neutral-400 text-center rounded-sm bg-transparent cursor-text"
                    onClick={()=>{
                        setIsEditing(true);
                        setInputValue(currentFontSize);
                    }}
                >
                {currentFontSize}
                </button>
             )}

            <button className="h-7 w-7 text-sm flex items-center justify-center hover:bg-neutral-300/80 rounded-sm"
                onClick={increment}
            >
            <PlusIcon className="size-4"/>
            </button>
        </div>
    )
}

export default FontSizeTool;
