import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useController } from 'react-hook-form';
const RadioField = ({ name, control, options, label, disabled, row = true }) => {
    const {
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
    } = useController({ control, name });
    return (
        <FormControl error={invalid} disabled={disabled} fullWidth size="small">
            <FormLabel id={`row-radio-buttons-group-${label}`}>{label}</FormLabel>
            <RadioGroup
                row={row}
                aria-labelledby="row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                labelId={`row-radio-buttons-group-${label}`}
                onBlur={onBlur}
                value={value}
                label={label}
                onChange={onChange}
            >
                {options?.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioField;
