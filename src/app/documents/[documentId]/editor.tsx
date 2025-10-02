'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TaskList, TaskItem } from '@tiptap/extension-list';
import { TableKit } from '@tiptap/extension-table';
import FileHandler from '@tiptap/extension-file-handler';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle, Color, FontFamily } from '@tiptap/extension-text-style';
import { ResizableImage } from 'tiptap-extension-resizable-image';

import 'tiptap-extension-resizable-image/styles.css';

import { useEditorStore } from '@/store/use-editor-store';

const Editor = () => {
  const { setEditor } = useEditorStore();

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,                // or Color.configure({ types: ['textStyle'] })
      FontFamily,
      TaskList,
      TaskItem.configure({ nested: true }),
      TableKit,
      ResizableImage.configure({
        defaultWidth: 200,
        defaultHeight: 200,
      }),
      Highlight.configure({ multicolor: true }),
      FileHandler.configure({
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],

        onDrop: (currentEditor, files, pos) => {
          files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(pos, {
                  type: 'image',
                  attrs: { src: reader.result as string },
                })
                .focus()
                .run();
            };
            reader.readAsDataURL(file);
          });
        },

        onPaste: (currentEditor, files, htmlContent) => {
          // If there is HTML, let other extensions handle it and stop manual insertion.
          if (htmlContent) {
            // console.log(htmlContent);
            return false; // <-- return from handler (not inside forEach)
          }

          files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(currentEditor.state.selection.anchor, {
                  type: 'image',
                  attrs: { src: reader.result as string },
                })
                .focus()
                .run();
            };
            reader.readAsDataURL(file);
          });

          return true; // allow normal flow after manual insert
        },
      }),
    ],

    editorProps: {
      attributes: {
        // NOTE: use "style", not "styles"
        style: 'padding-left:56px; padding-right:56px;',
        class:
          'focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
      },
    },

    content: '',
    // Avoid SSR hydration issues (fine to keep)
    immediatelyRender: false,

    // Keep store in sync only on mount/unmount
     onCreate({editor}){
      setEditor(editor);
    },
    onDestroy(){
      setEditor(null);
    },
    onUpdate({editor}){
      setEditor(editor);
    },
    onSelectionUpdate({editor}){
      setEditor(editor);
    },
    onTransaction({editor}){
      setEditor(editor);
    },
    onFocus({editor}){
      setEditor(editor);
    },
    onBlur({editor}){
      setEditor(editor);
    },
    onContentError({editor}) {
        setEditor(editor);
    },
  });

  if (!editor) return null;

  return (
    <div className="editor w-full overflow-x-auto bg-[#F9fBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
      <div className="min-w-max flex justify-center w-[816px] px-4 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;














