// File: TableTool.tsx (Tiptap v3 + React, TypeScript)
// Tailwind + shadcn/ui version with a Google Docs–style dynamic table size picker.
// Usage: <TableTool /> — assumes your editor (from useEditorStore) already has TableKit.

import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import { useEditorStore } from '@/store/use-editor-store'


// shadcn/ui
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'

import { cn } from '@/lib/utils' // optional: if you have shadcn's cn helper

export type TableToolProps = {
  maxSize?: number
  className?: string
}

export default function TableTool({ maxSize = 20, className = '' }: TableToolProps) {
  const { editor } = useEditorStore()
  const [open, setOpen] = useState<boolean>(false)
  const inTable = Boolean(editor?.isActive('table'))

  // Close menu when editor changes selection (optional UX nicety)
  useEffect(() => {
if (!editor) return
const handler = () => setOpen(false)
editor.on('selectionUpdate', handler)
return () => {
editor.off('selectionUpdate', handler)
}
}, [editor])

  const insertTable = useCallback(
    (rows: number, cols: number) => {
      if (!editor) return
      ;(editor as any).chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run()
      setOpen(false)
    },
    [editor]
  )

  return (
    <div className={cn('relative flex items-center gap-2', className)}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm" className="font-medium">
            ▦ Table
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[280px] p-3">
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Pick size & click to insert
          </DropdownMenuLabel>
          <div className="mt-2">
            <SizePicker maxGrow={maxSize} onPick={({ rows, cols }) => insertTable(rows, cols)} />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Inline actions shown when selection is inside a table */}
      <div className="flex flex-wrap items-center gap-1.5">
        <ToolButton
          disabled={!inTable}
          onClick={() => (editor as any)?.chain().focus().addRowBefore().run()}
          label="Row ↑"
        />
        <ToolButton
          disabled={!inTable}
          onClick={() => (editor as any)?.chain().focus().addRowAfter().run()}
          label="Row ↓"
        />
        <ToolButton
          disabled={!inTable}
          onClick={() => (editor as any)?.chain().focus().addColumnBefore().run()}
          label="Col ←"
        />
        <ToolButton
          disabled={!inTable}
          onClick={() => (editor as any)?.chain().focus().addColumnAfter().run()}
          label="Col →"
        />
        <ToolButton
          disabled={!inTable}
          onClick={() => (editor as any)?.chain().focus().toggleHeaderRow().run()}
          label="Hdr Row"
        />
        <ToolButton
          disabled={!inTable}
          onClick={() => (editor as any)?.chain().focus().mergeCells().run()}
          label="Merge"
        />
        <ToolButton
          disabled={!inTable}
          onClick={() => (editor as any)?.chain().focus().splitCell().run()}
          label="Split"
        />
        <ToolButton
          disabled={!inTable}
          onClick={() => (editor as any)?.chain().focus().deleteRow().run()}
          label="Del Row"
        />
        <ToolButton
          disabled={!inTable}
          onClick={() => (editor as any)?.chain().focus().deleteColumn().run()}
          label="Del Col"
        />
        <ToolButton
          disabled={!inTable}
          onClick={() => (editor as any)?.chain().focus().deleteTable().run()}
          label="Del Tbl"
        />
      </div>
    </div>
  )
}

// ——————————————————————————————————————
// Subcomponents
// ——————————————————————————————————————

type ToolButtonProps = {
  label: string
  onClick: () => void
  disabled?: boolean
}

function ToolButton({ label, onClick, disabled }: ToolButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="h-8 whitespace-nowrap rounded-md text-xs"
      onClick={onClick}
      disabled={disabled}
      title={label}
    >
      {label}
    </Button>
  )
}

export type Size = { rows: number; cols: number }

type SizePickerProps = {
  onPick: (size: Size) => void
  maxGrow?: number
}

function SizePicker({ onPick, maxGrow = 20 }: SizePickerProps) {
  const [grid, setGrid] = useState<Size>({ rows: 5, cols: 5 })
  const [hover, setHover] = useState<Size>({ rows: 0, cols: 0 })
  const [focusCell, setFocusCell] = useState<{ r: number; c: number }>({ r: 0, c: 0 })
  const liveRef = useRef<HTMLDivElement | null>(null)

  const rowsArr = useMemo<number[]>(() => Array.from({ length: grid.rows }, (_, i) => i), [grid.rows])
  const colsArr = useMemo<number[]>(() => Array.from({ length: grid.cols }, (_, i) => i), [grid.cols])

  const announce = useCallback((r: number, c: number) => {
    if (liveRef.current) liveRef.current.textContent = `${r} by ${c} table`
  }, [])

  const handleHover = useCallback(
    (r: number, c: number) => {
      const rows = r + 1
      const cols = c + 1
      setHover({ rows, cols })
      announce(rows, cols)
      setGrid(g => ({
        rows: Math.min(rows === g.rows && g.rows < maxGrow ? g.rows + 1 : g.rows, maxGrow),
        cols: Math.min(cols === g.cols && g.cols < maxGrow ? g.cols + 1 : g.cols, maxGrow),
      }))
    },
    [announce, maxGrow]
  )

  const handleClick = useCallback(() => {
    if (hover.rows && hover.cols) onPick({ rows: hover.rows, cols: hover.cols })
  }, [hover, onPick])

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      let { r, c } = focusCell
      if (e.key === 'Escape') return (e.currentTarget as HTMLDivElement).blur()
      if (e.key === 'ArrowRight') c = Math.min(c + 1, grid.cols - 1)
      if (e.key === 'ArrowLeft') c = Math.max(c - 1, 0)
      if (e.key === 'ArrowDown') r = Math.min(r + 1, grid.rows - 1)
      if (e.key === 'ArrowUp') r = Math.max(r - 1, 0)
      if (r !== focusCell.r || c !== focusCell.c) {
        setFocusCell({ r, c })
        handleHover(r, c)
        e.preventDefault()
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onPick({ rows: hover.rows || r + 1, cols: hover.cols || c + 1 })
      }
    },
    [focusCell, grid, handleHover, hover, onPick]
  )

  return (
    <div className="w-full">
      <div className="mb-2 text-xs text-muted-foreground">
        {hover.rows && hover.cols ? `${hover.rows} × ${hover.cols}` : 'Select size'}
      </div>

      <div
        role="grid"
        tabIndex={0}
        aria-label="Table size picker"
        onKeyDown={onKeyDown}
        onClick={handleClick}
        className="inline-flex flex-col gap-1.5 outline-none"
      >
        {rowsArr.map((r) => (
          <div role="row" className="grid auto-cols-max grid-flow-col gap-1.5" key={r}>
            {colsArr.map((c) => {
              const active = r < hover.rows && c < hover.cols
              const focused = r === focusCell.r && c === focusCell.c
              return (
                <div
                  role="gridcell"
                  aria-selected={active}
                  key={`${r}-${c}`}
                  onMouseEnter={() => handleHover(r, c)}
                  onFocus={() => setFocusCell({ r, c })}
                  className={cn(
                    'h-4.5 w-4.5 rounded-[4px] border transition-colors focus:outline-none',
                    'border-border/60 bg-muted/40',
                    active && 'border-primary bg-primary/25',
                    focused && 'ring-2 ring-primary/60'
                  )}
                />
              )
            })}
          </div>
        ))}
      </div>

      <div ref={liveRef} className="sr-only" aria-live="polite" aria-atomic="true" />

      <div className="mt-2 text-xs text-muted-foreground">Click to insert</div>
    </div>
  )
}
