import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, DialogTitle, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import AlertMui from '../../../components/Common/AlertMui';
import InputField from '../../../components/Form/InputField';
import { configToast } from '../../../Helper/Config';
import { renderError } from '../../../Helper/Funtion';
import { ruleAttributeSet } from '../../../rules/ruleAttribute';
import { fetchPostAttribute, fetchPutAttribute } from '../AttributeAPI';
const FormAttribute = ({ open, handleClose, fetchAttributeList, target, attributeValue }) => {
    const name = 'thuộc tính';
    const [openAlert, setOpenAlert] = useState(false);
    const [contentAlert, setContentAlert] = useState('');
    const schema = yup.object(ruleAttributeSet).required();

    const { control, handleSubmit, reset } = useForm({
        defaultValues: useMemo(() => {
            return target;
        }, [target]),
        resolver: yupResolver(schema),
    });

    const onSubmit = async (formValues) => {
        let response;
        if (formValues?.id) {
            response = await fetchPutAttribute(formValues);
        } else {
            response = await fetchPostAttribute(formValues);
        }
        const success = response.data.success;
        if (success) {
            handleClose();
            toast.success(response.data.message, configToast);
            fetchAttributeList();
        } else {
            setContentAlert(renderError(response.data.error));
            setOpenAlert(true);
        }
    };

    useEffect(() => {
        openAlert && setOpenAlert(false);
        reset(target);
    }, [open]);
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="800px">
            <DialogTitle textAlign="center">
                <Typography variant="h5">
                    {target.children?.id ? `Cập nhật ${name}` : `Thêm ${name}`}
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

export default FormAttribute;
