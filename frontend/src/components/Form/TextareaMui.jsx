import { TextareaAutosize } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';

const TextareaMui = ({ name, control, placeholder, ...inputProps }) => {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });
    return (
        <TextareaAutosize
            maxRows={4}
            color="primary"
            placeholder={placeholder}
            style={{ width: '100%', height: '250px', resize: 'none', padding: '8px' }}
            resize={false}
            error={invalid}
            helperText={error?.message}
            inputProps={inputProps}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
        />
    );
};

export default TextareaMui;
