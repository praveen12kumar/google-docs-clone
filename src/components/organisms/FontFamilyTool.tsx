'use client';

import { useEditorStore } from '@/store/use-editor-store';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon } from 'lucide-react';
import FrontsButton from '../molecules/FrontsButton';

const fonts = [
  // Your custom Google fonts loaded via next/font (Step 1–3)
  { label: 'Outfit',     value: 'var(--font-outfit), system-ui, sans-serif' },
  { label: 'Poppins',    value: 'var(--font-poppins), system-ui, sans-serif' },
  { label: 'Roboto',     value: 'var(--font-roboto), system-ui, sans-serif' },
  { label: 'Open Sans',  value: 'var(--font-open-sans), system-ui, sans-serif' },
  { label: 'Montserrat', value: 'var(--font-montserrat), system-ui, sans-serif' },

  // Keep some system fonts too (optional)
  { label: 'Arial',           value: 'Arial, sans-serif' },
  { label: 'Times New Roman', value: '"Times New Roman", serif' },
  { label: 'Verdana',         value: 'Verdana, sans-serif' },
  { label: 'Georgia',         value: 'Georgia, serif' },
  { label: 'Courier New',     value: '"Courier New", monospace' },
  { label: 'Helvetica',       value: 'Helvetica, Arial, sans-serif' },
];

const FontFamilyTool = () => {
  const { editor } = useEditorStore();
  if (!editor) return null;

  // ✅ Use lowercase key: fontFamily
  const current = editor.getAttributes('textStyle')?.fontFamily;
  const currentLabel =
    fonts.find(f => f.value === current)?.label
    ?? (current ? current.split(',')[0].replace(/"/g, '') : 'Outfit');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[160px] text-sm flex items-center justify-between hover:bg-neutral-300/80 rounded-sm px-2 overflow-hidden">
          <span className="truncate" style={{ fontFamily: current || 'var(--font-outfit), system-ui, sans-serif' }}>
            {currentLabel}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-1 flex flex-col gap-1 max-h-72 overflow-auto">
        {fonts.map((item) => (
          <DropdownMenuItem key={item.label}>
            <FrontsButton
              label={item.label}
              value={item.value}
              onClick={() => editor.chain().focus().setFontFamily(item.value).run()}
            />
          </DropdownMenuItem>
        ))}

        {/* Reset to theme default */}
        <DropdownMenuItem onClick={() => editor.chain().focus().unsetFontFamily().run()}>
          Reset to default
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FontFamilyTool;
