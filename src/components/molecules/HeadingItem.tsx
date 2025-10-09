import {cn} from "@/lib/utils"
import { useEditorStore } from "@/store/use-editor-store"


interface FontsToolbarProps{
    label: string,
    onClick?: ()=>void,
    value: number | string,
    fontSize: string
}

import React from 'react'

const HeadingItem = ({label, onClick, value, fontSize}: FontsToolbarProps) => {
  const {editor} = useEditorStore();

  return (
    <button 
    className={cn("flex items-center gap-x-2 px-2 py-1 text-sm rounded-sm hover:bg-neutral-300/80",
      (value === 0 && !editor?.isActive('heading')) || editor?.isActive('heading', {level: value})  && "bg-neutral-300/80"
    )}
    style={{fontSize}}
    onClick={onClick}
    >
        <span>{label}</span>
    </button>
  )
}

export default HeadingItem;