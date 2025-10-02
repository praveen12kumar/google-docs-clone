import {cn} from "@/lib/utils"
import { useEditorStore } from "@/store/use-editor-store"


interface FontsToolbarProps{
    label: string,
    onClick?: ()=>void,
    value: string
}

import React from 'react'

const FrontsButton = ({label, onClick, value}: FontsToolbarProps) => {
  const {editor} = useEditorStore();

  return (
    <button 
    className={cn("flex items-center gap-x-2 px-2 py-1 text-sm rounded-sm hover:bg-neutral-300/80",
      editor?.getAttributes('textStyle').FontFamily === value && "bg-neutral-300/80"
    )}
    style={{fontFamily: value}}
    onClick={onClick}
    >
        <span>{label}</span>
    </button>
  )
}

export default FrontsButton