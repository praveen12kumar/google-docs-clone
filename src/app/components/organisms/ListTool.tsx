'use client'

import { useEditorStore } from '@/store/use-editor-store'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@radix-ui/react-dropdown-menu'
import { ListIcon, ListOrderedIcon, ChevronRight, ChevronLeft } from 'lucide-react'

const ListTool = () => {
  const { editor } = useEditorStore()
  if (!editor) return null

  const makeBullet = () => editor.chain().focus().toggleBulletList().run()
  const makeOrdered = () => editor.chain().focus().toggleOrderedList().run()

  // ✅ Use TipTap's list commands to nest/un-nest
  const canIndent = editor.can().chain().sinkListItem('listItem').run()
  const canOutdent = editor.can().chain().liftListItem('listItem').run()
  const indent = () => editor.chain().focus().sinkListItem('listItem').run()
  const outdent = () => editor.chain().focus().liftListItem('listItem').run()

  return (
    <div className="z-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-8 min-w-7 shrink-0 flex items-center justify-center hover:bg-neutral-300/80 rounded-sm px-2">
            <ListIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="p-1 bg-[#f9fcfd] flex flex-col gap-y-1 max-h-52 rounded-sm shadow overflow-auto">
          <DropdownMenuItem
            onClick={makeBullet}
            className="flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-neutral-300/80 cursor-pointer"
          >
            <ListIcon className="mr-2 size-4" />
            <span className="text-sm">Bullet List</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={makeOrdered}
            className="flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-neutral-300/80 cursor-pointer"
          >
            <ListOrderedIcon className="mr-2 size-4" />
            <span className="text-sm">Ordered List</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1 h-px bg-neutral-200" />

          <DropdownMenuItem
            onClick={indent}
            disabled={!canIndent}
            className="flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-neutral-300/80 cursor-pointer data-[disabled]:opacity-50 data-[disabled]:pointer-events-none"
          >
            <ChevronRight className="mr-2 size-4" />
            <span className="text-sm">Indent (Sublist)</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={outdent}
            disabled={!canOutdent}
            className="flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-neutral-300/80 cursor-pointer data-[disabled]:opacity-50 data-[disabled]:pointer-events-none"
          >
            <ChevronLeft className="mr-2 size-4" />
            <span className="text-sm">Outdent</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ListTool
