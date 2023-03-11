import { TextField } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';

const InputField = ({ name, control, label, size = 'small', ...inputProps }) => {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });
    return (
        <TextField
            size={size}
            variant="outlined"
            fullWidth
            error={invalid}
            helperText={error?.message}
            inputProps={inputProps}
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
        />
    );
};

export default InputField;
