import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';
import { useController } from 'react-hook-form';

const SelectField = ({ name, control, options, label, disabled, maxHeight = '20%' }) => {
    const {
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
    } = useController({ control, name });

    return (
        <FormControl error={invalid} disabled={disabled} fullWidth size="small">
            <InputLabel id={`${name}_label`}>{label}</InputLabel>
            <Select
                labelId={`${name}_label`}
                onBlur={onBlur}
                value={value}
                label={label}
                onChange={onChange}
                MenuProps={{ PaperProps: { style: { maxHeight: maxHeight } } }}
            >
                {options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
};
export default SelectField;
