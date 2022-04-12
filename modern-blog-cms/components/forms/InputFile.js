import { useCallback } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';

export default function InputFile({ name, previewHandler }) {
  const { control, register } = useFormContext();

  const registerImage = register(name);

  const getInputHelperText = useCallback((err) => {
    return err ? err.message : null;
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <>
            <label htmlFor={name}>
              <input
                type="file"
                accept="image/*"
                id={name}
                name={name}
                onChange={(e) => {
                  registerImage.onChange(e);
                  previewHandler(e);
                }}
                onBlur={registerImage.onBlur}
                ref={registerImage.ref}
                // className="hidden"
              />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
            <FormHelperText error={!!fieldState.invalid}>
              {fieldState.invalid ? getInputHelperText(fieldState.error) : null}
            </FormHelperText>
          </>
        );
      }}
    />
  );
}
