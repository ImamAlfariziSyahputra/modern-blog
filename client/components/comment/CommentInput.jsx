import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Image from 'next/image';
import classNames from 'classnames';

export default function CommentInput({
  name,
  handleSubmit,
  onSubmit,
  btnText,
  hasCancelBtn,
  handleCancel,
  setValueEdit,
  isEditing,
  ...rest
}) {
  const { control, register, setValue } = useFormContext();

  // const getInputHelperText = useCallback((err) => {
  //   return err ? err.message : null;
  // }, []);

  function autoGrow(e) {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  }

  useEffect(() => {
    if (isEditing === true) {
      setValue('body', setValueEdit);
    } else {
      setValue('body', '');
    }
  }, [isEditing]);
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { value }, fieldState }) => {
          return (
            <>
              <div
                id="commentInputContainer"
                className="flex group bg-[#1F2937] px-3 pt-3 border focus:border-2 border-gray-500  focus:outline-none rounded mb-3"
              >
                {/* PP */}
                <div className="relative shrink-0 w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src="http://localhost:3000/_next/image?url=http%3A%2F%2Flocalhost%3A8080%2Fuploads%2Fposts%2FPost-1649831856574.jpeg&w=1920&q=75"
                    alt=""
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <textarea
                  {...register(name)}
                  value={value}
                  // error={!!fieldState.invalid}
                  // helperText={
                  //   fieldState.invalid
                  //     ? getInputHelperText(fieldState.error)
                  //     : null
                  // }
                  className="group-focus:border-white block w-full min-h-11 text-xl bg-transparent border-none outline-none overflow-hidden resize-none ml-3"
                  onInput={(e) => autoGrow(e)}
                  onFocus={() =>
                    document
                      .getElementById('commentInputContainer')
                      .classList.add('!border-gray-300')
                  }
                  onBlur={() =>
                    document
                      .getElementById('commentInputContainer')
                      .classList.remove('!border-gray-300')
                  }
                />
              </div>
              <div className="flex items-center justify-end">
                {hasCancelBtn && (
                  <button
                    className="bg-gray-700 hover:bg-gray-600 uppercase px-3.5 py-2 rounded mr-3"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                )}

                <button
                  className={classNames(
                    'bg-blue-700 hover:bg-blue-600 uppercase px-3.5 py-2 rounded',
                    value.trim().length < 1 &&
                      'disabled cursor-not-allowed bg-opacity-50 hover:bg-opacity-50 hover:bg-blue-700'
                  )}
                  onClick={handleSubmit(onSubmit)}
                  disabled={Boolean(value.trim().length < 1)}
                >
                  {btnText || 'Submit'}
                </button>
              </div>
            </>
          );
        }}
      />
    </>
  );
}
