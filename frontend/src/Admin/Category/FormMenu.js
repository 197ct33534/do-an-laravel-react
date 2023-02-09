import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, DialogTitle, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import AlertMui from '../../components/Common/AlertMui';
import InputField from '../../components/Form/InputField';
import SelectField from '../../components/Form/SelectField';
import { configToast } from '../../Helper/Config';
import { renderError } from '../../Helper/Funtion';
import { ruleCategory } from '../../rules/ruleCate';
import { fetchPostCategory, fetchPutCategory } from './CateApi';

import { MenuContext } from './CateList';

const FormMenu = ({ open, handleClose, row }) => {
    const [openAlert, setOpenAlert] = useState(true);
    const [contentAlert, setContentAlert] = useState('');
    const { cate, fetchMenuList, fetchMenuSelect } = useContext(MenuContext);

    let category = null;
    if (row?.id) {
        const temp = cate.filter((item) => {
            return item.value != row?.id;
        });
        category = temp;
    }
    const schema = yup.object(ruleCategory).required();
    const { control, handleSubmit, reset } = useForm({
        defaultValues: useMemo(() => {
            return row;
        }, [row]),
        resolver: yupResolver(schema),
    });

    const handleSubmitPostCate = async (formValues) => {
        const formData = { ...formValues };

        if (!formData?.parent_id || formData?.parent_id == '0') {
            delete formData['parent_id'];
        }

        const response = await fetchPostCategory(formData);
        const success = response.data?.success;
        if (success) {
            toast.success(response.data.message, configToast);
            handleClose();
            await fetchMenuList();
            await fetchMenuSelect();
        } else {
            if (response?.response?.status != 401) {
                setContentAlert(renderError(response?.data?.error));
                setOpenAlert(true);
            }
        }
    };

    const handleSubmitPutCate = async (formValues) => {
        const formData = { ...formValues };

        if (formData.parent_id == 0) {
            delete formData['parent_id'];
        }

        const response = await fetchPutCategory(formData);
        const success = response.data?.success;
        if (success) {
            toast.success(response.data.message, configToast);
            handleClose();
            fetchMenuList();
        } else {
            if (response?.response?.status != 401) {
                setContentAlert(renderError(response?.data?.error));
                setOpenAlert(true);
            }
        }
    };

    const onSubmit = async (formValues) => {
        if (formValues?.id) {
            handleSubmitPutCate(formValues);
        } else {
            handleSubmitPostCate(formValues);
        }
    };

    useEffect(() => {
        setOpenAlert(false);
        reset(row);
    }, [open]);
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="800px">
            <DialogTitle textAlign="center">
                <Typography variant="h5">{row?.id ? 'Cập nhật Menu' : 'Thêm Menu'}</Typography>
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                {contentAlert && contentAlert !== '' && (
                    <AlertMui open={openAlert} setOpen={setOpenAlert} content={contentAlert} />
                )}
                <Box mt={3} mx={3}>
                    <InputField
                        control={control}
                        label="Tên menu"
                        name="category_name"
                        sx={{
                            width: 500,
                        }}
                    />
                </Box>
                <Box mx={3} mt={3}>
                    <SelectField
                        control={control}
                        label="Thuộc cha"
                        name="parent_id"
                        options={row?.id ? category : cate}
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

export default FormMenu;
