import { useState } from 'react';
import classNames from 'classnames';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Typography from '@tiptap/extension-typography';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import FormHelperText from '@mui/material/FormHelperText';
import {
  RiBold,
  RiItalic,
  RiUnderline,
  RiStrikethrough,
  RiCodeSSlashLine,
  RiParagraph,
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiH5,
  RiH6,
  RiListUnordered,
  RiListOrdered,
  RiCodeBoxLine,
  RiDoubleQuotesL,
  RiSeparator,
  RiLink,
  RiLinkUnlink,
  RiFormatClear,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
} from 'react-icons/ri';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const isCursorOverLink = editor.getAttributes('link').href;

  function setLink(editor) {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }

  return (
    <div className="flex flex-wrap items-center justify-between text-black border-2 border-b-0 rounded-t-lg tiptap-menu p-1">
      <div className="flex flex-wrap items-center justify-start space-x-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <RiBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <RiItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
        >
          <RiUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <RiStrikethrough />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          <RiCodeSSlashLine />
        </button>
        <div className="divider" />
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          // className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          <RiParagraph />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
          }
        >
          <RiH1 />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
          }
        >
          <RiH2 />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
          }
        >
          <RiH3 />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive('heading', { level: 4 }) ? 'is-active' : ''
          }
        >
          <RiH4 />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive('heading', { level: 5 }) ? 'is-active' : ''
          }
        >
          <RiH5 />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive('heading', { level: 6 }) ? 'is-active' : ''
          }
        >
          <RiH6 />
        </button>
        <div className="divider" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <RiListUnordered />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <RiListOrdered />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          <RiCodeBoxLine />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          <RiDoubleQuotesL />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          // className={editor.isActive('horizontalRule') ? 'is-active' : ''}
        >
          <RiSeparator />
        </button>
        <div className="divider" />
        <button
          onClick={() => {
            setLink(editor);
          }}
          className={editor.isActive('link') ? 'is-active' : ''}
        >
          <RiLink />
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          className={classNames('', !isCursorOverLink && 'disabled')}
        >
          <RiLinkUnlink />
        </button>
        <div className="divider" />
        <button
          onClick={() =>
            editor.chain().focus().unsetAllMarks().clearNodes().run()
          }
          // className={editor.isActive('link') ? 'is-active' : ''}
        >
          <RiFormatClear />
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-evenly space-x-1 p-1">
        <div className="divider" />
        <button onClick={() => editor.chain().focus().undo().run()}>
          <RiArrowGoBackLine />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          <RiArrowGoForwardLine />
        </button>
      </div>
    </div>
  );
};

export default function TextEditor({ setValue, error }) {
  const [link, setLink] = useState('');
  const [text, setText] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        linkOnPaste: false,
        openOnClick: false,
      }),
      Placeholder,
      Typography,
    ],
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none',
      },
    },
    content: '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setText(html);
    },
  });

  setValue('content', text);

  return (
    <div>
      <MenuBar editor={editor} link={link} setLink={setLink} />
      <EditorContent editor={editor} className="border-2 rounded-b-lg" />
    </div>
  );
}
