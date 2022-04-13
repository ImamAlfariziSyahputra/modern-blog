import { useCallback } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import slugify from 'slugify';
import { TextField } from '@mui/material';
const style = {
  '	.MuiFormHelperText-root': {
    marginLeft: '0',
  },
};

export default function InputSlug({
  name,
  subName,
  label,
  variant = 'outlined',
  size = 'small',
  sx,
  ...rest
}) {
  const { control, register, setValue } = useFormContext();

  const getInputHelperText = useCallback((err) => {
    return err ? err.message : null;
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur, ref }, fieldState }) => {
        return (
          <TextField
            onChange={(e) => {
              onChange(e);
              setValue(subName, slugify(e.target.value), {
                shouldValidate: true,
              });
            }}
            onBlur={onBlur}
            ref={ref}
            value={value}
            label={label}
            error={!!fieldState.invalid}
            helperText={
              fieldState.invalid ? getInputHelperText(fieldState.error) : null
            }
            variant={variant}
            size={size}
            fullWidth
            sx={sx ? { ...sx, ...style } : style}
            {...rest}
          />
        );
      }}
    />
  );
}
