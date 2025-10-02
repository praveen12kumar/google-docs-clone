'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEditorStore } from '@/store/use-editor-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'; // ← shadcn wrapper
import { Link2Icon } from 'lucide-react';

const normalizeHref = (href: string) => {
  const t = href.trim();
  if (!t) return '';
  // allow http(s), mailto, tel; otherwise prepend https://
  return /^(https?:|mailto:|tel:)/i.test(t) ? t : `https://${t}`;
};

const LinkTool = () => {
  const { editor } = useEditorStore();

  // ✅ Hooks first (don’t depend on editor for initial state)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  // Keep input in sync with current selection’s link mark
  useEffect(() => {
    if (!editor) return;
    const update = () => {
      const href = editor.getAttributes('link')?.href ?? '';
      setValue(href);
    };
    update();
    editor.on('selectionUpdate', update);
    editor.on('update', update);
    return () => {
      editor.off('selectionUpdate', update);
      editor.off('update', update);
    };
  }, [editor]);

  if (!editor) return null; // ✅ early return is fine *after* hooks

  const apply = () => {
    const href = normalizeHref(value);
    if (!href) {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href, target: '_blank' }).run();
    }
    setOpen(false);
  };

  return (
    <div className="z-10">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button className="h-8 min-w-7 shrink-0 flex items-center justify-center hover:bg-neutral-300/80 rounded-sm px-2">
            <Link2Icon className="size-4" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="p-2.5 flex items-center gap-2">
          <Input
            placeholder="https://"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-8 w-56"
          />
          <Button size="sm" onClick={apply}>Apply</Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setValue('');
              editor.chain().focus().unsetLink().run();
              setOpen(false);
            }}
          >
            Remove
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LinkTool;
