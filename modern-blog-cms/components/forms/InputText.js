import { useCallback } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

const style = {
  '	.MuiFormHelperText-root': {
    marginLeft: '0',
  },
};

export default function InputText({
  name,
  label,
  variant = 'outlined',
  size = 'small',
  sx,
  ...rest
}) {
  const { control, register } = useFormContext();

  const getInputHelperText = useCallback((err) => {
    return err ? err.message : null;
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value }, fieldState }) => {
        return (
          <TextField
            {...register(name)}
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
