import React from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

export default function QuilljsEditorBasic() {
  const { quill, quillRef } = useQuill();

  console.log(quill); // undefined > Quill Object
  console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }

  return (
    <div>
      <div ref={quillRef} />
    </div>
  );
}
