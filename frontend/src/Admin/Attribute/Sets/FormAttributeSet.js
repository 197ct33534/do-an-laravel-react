import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    Checkbox,
    Dialog,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import AlertMui from '../../../components/Common/AlertMui';
import InputField from '../../../components/Form/InputField';
import { configToast } from '../../../Helper/Config';
import { renderError } from '../../../Helper/Funtion';
import { ruleAttributeSet } from '../../../rules/ruleAttribute';
import { ruleAddRole } from '../../../rules/RuleRole';
import { fetchPostAttributeSet, fetchPutAttributeSet } from '../AttributeAPI';

const FormAttributeSet = ({ open, handleClose, fetchAttributeSetList, row, attributeValue }) => {
    const [openAlert, setOpenAlert] = useState(true);
    const [contentAlert, setContentAlert] = useState('');
    const schema = yup.object(ruleAttributeSet).required();
    const { control, handleSubmit, reset } = useForm({
        defaultValues: useMemo(() => {
            return row;
        }, [row]),
        resolver: yupResolver(schema),
    });

    const onSubmit = async (formValues) => {
        const data = {
            ...formValues,
            attribute: formValues.attribute.length > 0 ? formValues.attribute : [],
        };
        let response;
        if (formValues?.id) {
            response = await fetchPutAttributeSet(data);
        } else {
            response = await fetchPostAttributeSet(data);
        }
        const success = response.data.success;
        if (success) {
            handleClose();
            toast.success(response.data.message, configToast);
            fetchAttributeSetList();
        } else {
            setContentAlert(renderError(response.data.error));
            setOpenAlert(true);
        }
    };

    useEffect(() => {
        setOpenAlert(false);
        reset(row);
    }, [open]);
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="800px">
            <DialogTitle textAlign="center">
                <Typography variant="h5">
                    {row?.id ? 'Cập nhật nhóm thuộc tính' : 'Thêm nhóm thuộc tính'}
                </Typography>
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                {contentAlert && contentAlert !== '' && (
                    <AlertMui open={openAlert} setOpen={setOpenAlert} content={contentAlert} />
                )}
                <Box mt={3} mx={3}>
                    <InputField
                        control={control}
                        label="Tên"
                        name="name"
                        sx={{
                            width: 500,
                        }}
                    />
                </Box>
                <Box mt={3} mx={3} sx={{ height: '200px', overflowY: 'scroll' }}>
                    <FormGroup>
                        <Controller
                            name="attribute"
                            control={control}
                            render={({ field }) => {
                                // console.log(field.value);
                                return (
                                    <>
                                        {attributeValue?.map((Item) => (
                                            <FormControlLabel
                                                key={Item.id}
                                                label={Item.name}
                                                control={
                                                    <Checkbox
                                                        value={Item.id}
                                                        checked={field.value.includes(Item.id + '')}
                                                        onChange={(event, checked) => {
                                                            if (checked) {
                                                                field.onChange([
                                                                    ...field.value,
                                                                    event.target.value,
                                                                ]);
                                                            } else {
                                                                field.onChange(
                                                                    field.value.filter(
                                                                        (value) =>
                                                                            value !==
                                                                            event.target.value
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                    />
                                                }
                                            />
                                        ))}
                                    </>
                                );
                            }}
                        />
                    </FormGroup>
                </Box>
                <Box textAlign="right" m={3}>
                    <Button
                        mr={3}
                        onClick={handleClose}
                        variant="contained"
                        color="warning"
                        sx={{
                            marginRight: '16px',
                        }}
                    >
                        Hủy
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        OK
                    </Button>
                </Box>
            </form>
        </Dialog>
    );
};

export default FormAttributeSet;
