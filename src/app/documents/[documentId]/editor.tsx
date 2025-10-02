'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TaskItem, TaskList } from '@tiptap/extension-list'
import { TableKit } from '@tiptap/extension-table'
import FileHandler from '@tiptap/extension-file-handler'
import Image from '@tiptap/extension-image'
import { ResizableImage } from 'tiptap-extension-resizable-image';
import {TextStyle, FontFamily} from '@tiptap/extension-text-style'
import { useEditorStore } from '@/store/use-editor-store'

//CSS
import 'tiptap-extension-resizable-image/styles.css';

//import { useCallback } from 'react'

const Editor = () =>{
   const {setEditor} = useEditorStore();

   const editor = useEditor({
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

    
    editorProps:{
        attributes: {
            styles: "padding-left: 56px; padding-right: 56px;",
            class: "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text"
        }
    },
    extensions: [StarterKit, 
          TaskList,
          TextStyle,
          FontFamily,
          TaskItem.configure({
            nested: true,
          }),
          TableKit,
          Image,
          ResizableImage.configure({
              defaultWidth: 200,
              defaultHeight: 200,
            }),
         

          FileHandler.configure({
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        onDrop: (currentEditor, files, pos) => {
          files.forEach(file => {
            const fileReader = new FileReader()

            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(pos, {
                  type: 'image',
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run()
            }
          })
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach(file => {
            if (htmlContent) {
              // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
              // you could extract the pasted file from this url string and upload it to a server for example
              console.log(htmlContent) // eslint-disable-line no-console
              return false
            }

            const fileReader = new FileReader()

            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(currentEditor.state.selection.anchor, {
                  type: 'image',
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run()
            }
          })
        },
      }),
    ],
    
    content:"",
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  // const addImage = useCallback(() => {
  //   const url = window.prompt('URL')

  //   if (url) {
  //     editor.chain().focus().setImage({ src: url }).run()
  //   }
  // }, [editor])

  // if (!editor) {
  //   return null
  // }
  

  return(
    <div className='editor w-full overflow-x-auto bg-[#F9fBFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
      <div className="min-w-max flex justify-center w-[816px] px-4 mx-auto print:w-full print:min-w-0 ">
        {/* <button onClick={addImage}>Set image</button> */}
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}; 

export default Editor;