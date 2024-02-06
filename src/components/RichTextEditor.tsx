'use client';

import { forwardRef } from 'react';
import { EditorProps } from 'react-draft-wysiwyg';
import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { cn } from '../lib/utils';

export default forwardRef<Object, EditorProps>(function RichTextEditor(
  props,
  ref
) {
  return (
    <>
      <div className="">
        <Editor
          toolbar={{
            options: ['inline', 'list', 'link', 'history'],
            inline: {
              options: ['bold', 'italic', 'underline'],
            },
          }}
          wrapperClassName="wrapperClassName"
          editorClassName={cn(
            'border rounded-md px-3 min-h-[150px] cursor-text ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
            props.editorClassName
          )}
          //ref={ref}
          editorRef={(r) => {
            //ref of type object so the constructor ref is an object too
            if (typeof ref === 'function') {
              ref(r);
            } else if (ref) {
              // mutable ref object
              ref.current = r;
            }
          }}
        />
      </div>
    </>
  );
});
