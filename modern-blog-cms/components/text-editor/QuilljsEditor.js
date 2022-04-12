import { useEffect, useCallback } from 'react';
import { useQuill } from 'react-quilljs';
import { Controller, useFormContext } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import 'quill/dist/quill.snow.css';
import Toolbar from './Toolbar';
import classNames from 'classnames';

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

export default function QuilljsEditor({ name }) {
  const {
    control,
    register,
    setValue,
    getValues,
    formState: { isSubmitSuccessful },
  } = useFormContext();
  const registerContent = register(name);

  const theme = 'snow';
  const modules = {
    toolbar: {
      container: '#toolbar',
      handlers: {
        undo: undoChange,
        redo: redoChange,
      },
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
  };
  // const placeholder = 'Write something awesome...';
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'script',
    'align',
    'list',
    'indent',
    'font',
    'header',
    'link',
    'size',
    'code-block',
    'image',
    'video',
    'color',
    'background',
    'blockquote',
    'clean',
  ];

  const { quill, quillRef, Quill } = useQuill({
    theme,
    modules,
    formats,
    // placeholder,
  });

  if (Quill && !quill) {
    // Add fonts to whitelist and register them
    const Font = Quill.import('formats/font');
    Font.whitelist = [
      'arial',
      'comic-sans',
      'courier-new',
      'georgia',
      'helvetica',
      'lucida',
    ];

    Quill.register(Font, true);
  }

  // console.log('quill =>', quill); // undefined > Quill Object
  // console.log('quill =>', quillRef); // { current: undefined } > { current: Quill Editor Reference }

  const getInputHelperText = useCallback((err) => {
    return err ? err.message : null;
  }, []);

  const value = getValues('content');

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        // console.log('content =>', quill.root.innerHTML);
        if (quill.root.innerHTML === '<p><br></p>') {
          setValue(name, '', { shouldValidate: true });
          return;
        }
        setValue(name, quill.root.innerHTML, { shouldValidate: true });
      });
    }
  }, [name, quill]);

  // console.log('rerender');
  // console.log('isValid => ', isValid);

  // useEffect(() => {
  //   if (quill) {
  //     console.log('isSubmitSuccessful => ', isSubmitSuccessful);
  //     isSubmitSuccessful ? quill.deleteText(0, quill.getLength()) : null;
  //   }
  // }, [isSubmitSuccessful]);

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(value);
    }
  }, [quill, value]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        // console.log('fieldState => ', fieldState);
        return (
          <>
            <div className="">
              <Toolbar />
              {/* <div id="editor" /> */}
              <div
                ref={quillRef}
                className={classNames(
                  '!inline-block !h-40 !w-full !max-h-40 !overflow-y-auto !border !border-solid border-[#ccc] !rounded-b',
                  !!fieldState.error && '!border-red-600'
                )}
                onBlur={registerContent.onBlur}
              />
            </div>
            <FormHelperText error={!!fieldState.invalid}>
              {fieldState.invalid ? getInputHelperText(fieldState.error) : null}
            </FormHelperText>
          </>
        );
      }}
    />
  );
}
