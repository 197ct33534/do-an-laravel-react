import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, DialogTitle, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import AlertMui from '../../components/Common/AlertMui';
import InputField from '../../components/Form/InputField';
import SelectField from '../../components/Form/SelectField';
import { configToast } from '../../Helper/Config';
import { renderError } from '../../Helper/Funtion';
import { ruleAddRole } from '../../rules/RuleRole';

const FormOrder = ({ open, handleClose, row }) => {
    const [openAlert, setOpenAlert] = useState(true);
    const [contentAlert, setContentAlert] = useState('');
    const schema = yup.object(ruleAddRole).required();
    const { control, handleSubmit, reset } = useForm({
        defaultValues: useMemo(() => {
            return row;
        }, [row]),
        resolver: yupResolver(schema),
    });

    const onSubmit = async (formValues) => {
        // let response;
        // if (formValues?.id) {
        //     response = await fetchPutPermission(formValues);
        // } else {
        //     response = await fetchPostPermission(formValues);
        // }
        // const success = response.data.success;
        // if (success) {
        //     handleClose();
        //     toast.success(response.data.message, configToast);
        //     // ();
        // } else {
        //     setContentAlert(renderError(response.data.error));
        //     setOpenAlert(true);
        // }
    };

    useEffect(() => {
        setOpenAlert(false);
        reset(row);
    }, [open]);
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="800px">
            <DialogTitle textAlign="center">
                <Typography variant="h5">Cập nhật hóa đơn</Typography>
            </DialogTitle>
            <Box mt={3} mx={3}>
                <Grid container>
                    <Grid item xs={2} md={3}>
                        <strong>Mã hóa đơn:</strong>
                    </Grid>
                    <Grid item xs={10} md={9}>
                        {row?.order_id}
                    </Grid>
                    <Grid item xs={2} md={3}>
                        <strong>Tên khách hàng:</strong>
                    </Grid>
                    <Grid item xs={10} md={9}>
                        {row?.name}
                    </Grid>
                    <Grid item xs={2} md={3}>
                        <strong>Số điện thoại:</strong>
                    </Grid>
                    <Grid item xs={10} md={9}>
                        {row?.phone}
                    </Grid>
                    <Grid item xs={2} md={3}>
                        <strong>Email:</strong>
                    </Grid>
                    <Grid item xs={10} md={9}>
                        {row?.email}
                    </Grid>
                    <Grid item xs={2} md={3}>
                        <strong>Địa chỉ:</strong>
                    </Grid>
                    <Grid item xs={10} md={9}>
                        {row?.address}
                    </Grid>
                </Grid>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                {contentAlert && contentAlert !== '' && (
                    <AlertMui open={openAlert} setOpen={setOpenAlert} content={contentAlert} />
                )}

                <Box
                    mt={3}
                    mx={3}
                    sx={{
                        width: 500,
                    }}
                >
                    <SelectField
                        control={control}
                        label="Trạng thái"
                        name="status_order"
                        maxHeight="50%"
                        options={[
                            { value: 1, label: 'Đặt hàng' },
                            { value: 2, label: 'Đang giao hàng' },
                            { value: 3, label: 'Giao hàng thành công' },
                            { value: 4, label: 'Giao hàng thất bại' },
                        ]}
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

export default FormOrder;
