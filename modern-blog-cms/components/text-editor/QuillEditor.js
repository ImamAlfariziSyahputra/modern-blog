import dynamic from 'next/dynamic';
import React, { useCallback, useState } from 'react';
import parse from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';
import { Controller, useFormContext } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const Quill = dynamic(import('quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

// const {Quill} = typeof window === 'object' ? require('react-quill') : () => false

const modules = {
  // toolbar: [
  //   [
  //     { header: '1' },
  //     { header: '2' },
  //     { header: '3' },
  //     { header: '4' },
  //     { font: [] },
  //   ],
  //   [{ size: [] }],
  //   ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  //   [
  //     { list: 'ordered' },
  //     { list: 'bullet' },
  //     { indent: '-1' },
  //     { indent: '+1' },
  //   ],
  //   ['link', 'image', 'video'],
  //   ['clean'],
  // ],
  toolbar: {
    container: '#toolbar',
  },
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'code-block',
  'image',
  'video',
  'clean',
];

// // Add sizes to whitelist and register them
// const Size = Quill.import('formats/size');
// Size.whitelist = ['extra-small', 'small', 'medium', 'large'];

// Quill.register(Size, true);

// // Add fonts to whitelist and register them
// const Font = Quill.import('formats/font');
// Font.whitelist = [
//   'arial',
//   'comic-sans',
//   'courier-new',
//   'georgia',
//   'helvetica',
//   'lucida',
// ];

// Quill.register(Font, true);

const CustomToolbar = () => (
  <div id="toolbar">
    <select defaultValue="" className="ql-font">
      <option value="">Arial</option>
      <option value="comic-sans">Comic Sans</option>
      <option value="courier-new">Courier New</option>
      <option value="georgia">Georgia</option>
      <option value="helvetica">Helvetica</option>
      <option value="lucida">Lucida</option>
    </select>
    <select defaultValue="" className="ql-size">
      <option value="extra-small">Size 1</option>
      <option value="small">Size 2</option>
      <option value="">Size 3</option>
      <option value="large">Size 4</option>
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />
    <button className="ql-strike" />
    {/* <button className="ql-insertImage">I</button> */}
    {/* <button className="ql-insertVideo">V</button> */}
    {/* <button className="ql-insertFile">F</button> */}
    <button className="ql-link" />
    <button className="ql-code-block" />
    <button className="ql-image" />
    <button className="ql-video" />
    <button className="ql-blockquote" />
    {/* <button className="ql-bullet" />
    <button className="ql-indent" /> */}
    <button className="ql-clean" />
  </div>
);

export default function QuillEditor({ name }) {
  const { setValue, register, control, watch } = useFormContext();
  const [text, setText] = useState('');

  const getInputHelperText = useCallback((err) => {
    return err ? err.message : null;
  }, []);

  const editorContent = watch('content');

  const onEditorStateChange = (editorState) => {
    // console.log('editorState => ', editorState);
    // if (editorState == '<p><br></p') {
    //   setValue('content', '');
    //   return;
    // }

    setValue('content', editorState);
  };

  // console.log('text => ', text);
  // setValue('content', text);
  return (
    <div>
      <CustomToolbar />
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, onChange, onBlur }, fieldState }) => {
          return (
            <>
              <QuillNoSSRWrapper
                modules={modules}
                placeholder="Enter text..."
                // value={editorContent}
                onChange={onEditorStateChange}
                // onChange={onChange}
                onBlur={onBlur}
                // onChange={(e) => {
                //   setValue('content', e);
                // }}
                // {...register(name)}
                // ref={ref}
                formats={formats}
                theme="snow"
              />
              <FormHelperText error={!!fieldState.invalid}>
                {fieldState.invalid
                  ? getInputHelperText(fieldState.error)
                  : null}
              </FormHelperText>
            </>
          );
        }}
      />

      {/* <p>{value}</p> */}
      {/* {parse(value)} */}
    </div>
  );
}
