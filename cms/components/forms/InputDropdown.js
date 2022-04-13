import { useCallback } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField, MenuItem } from '@mui/material';

const style = {};

export default function InputDropdown({
  name,
  label,
  options,
  variant = 'outlined',
  size = 'small',
  sx,
  ...rest
}) {
  const { control, register } = useFormContext();

  const getInputHelperText = useCallback((err) => {
    return err ? err.message : null;
  }, []);

  const generateSingleOption = () => {
    return options.map((option, idx) => (
      <MenuItem key={idx} value={option.value}>
        {option.label}
      </MenuItem>
    ));
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value }, fieldState }) => (
        <TextField
          {...register(name)}
          select
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
        >
          <MenuItem value="">~ Please Choose ~</MenuItem>
          {generateSingleOption()}
        </TextField>
      )}
    />
  );
}
