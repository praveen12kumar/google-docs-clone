

import React from 'react'
import { LucideIcon } from "lucide-react";
import {cn} from  "@/lib/utils"


interface ToolbarButtonProps{
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon
}

const ToolbarButton = ({onClick, isActive, icon:Icon}: ToolbarButtonProps) => {
  return (
    <button onClick={onClick} className={cn("h-8 min-w-7 flex items-center justify-center rounded-sm  hover:bg-neutral-300/80 ",
        isActive && "bg-neutral-300/80"
    )}>
        <Icon className='size-4'/>
    </button>
  )
}

export default ToolbarButton;