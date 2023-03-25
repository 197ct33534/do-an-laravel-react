import { Button, Dialog, DialogTitle, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SelectField from '../../components/Form/SelectField';
import { fetchPutOrder } from '../../features/user/userAPI';
import { configToast } from '../../Helper/Config';

const FormOrder = ({ open, handleClose, row, updateStatusOrder }) => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: useMemo(() => {
            return row;
        }, [row]),
    });
    const onSubmit = async (formValues) => {
        const { order_id, status } = formValues;
        console.log({ order_id, status });
        const response = await fetchPutOrder({ order_id, status });
        const success = response.data.success;

        if (success) {
            handleClose();
            toast.success(response.data.message, configToast);
            updateStatusOrder();
        }
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
        reset(row);
    }, [open]);
    return (
        <Dialog open={open} onClose={handleClose} width="800px">
            <DialogTitle textAlign="center">
                <Typography variant="h5">
                    Cập nhật hóa đơn số <strong>{row?.order_id}</strong>
                </Typography>
            </DialogTitle>
            <Box mt={1} mx={3} style={{ maxWidth: { xs: '100%', md: '600px' } }}>
                <Grid container>
                    <Grid item sm={12} md={row?.delivery_address ? 6 : 12}>
                        <Grid container>
                            <Grid item xs={12} md={12}>
                                <Typography variant="h6">Khách hàng</Typography>
                            </Grid>
                            <Grid item xs={3} md={3}>
                                <strong>Tên :</strong>
                            </Grid>
                            <Grid item xs={9} md={9}>
                                {row?.name}
                            </Grid>
                            <Grid item xs={3} md={3}>
                                <strong>SĐT:</strong>
                            </Grid>
                            <Grid item xs={9} md={9}>
                                {row?.phone}
                            </Grid>
                            <Grid item xs={3} md={3}>
                                <strong>Email:</strong>
                            </Grid>
                            <Grid item xs={9} md={9}>
                                {row?.email}
                            </Grid>
                            <Grid item xs={3} md={3}>
                                <strong>Địa chỉ:</strong>
                            </Grid>
                            <Grid item xs={9} md={9}>
                                {row?.address}
                            </Grid>
                        </Grid>
                    </Grid>
                    {row?.delivery_address && (
                        <Grid item sm={12} md={6} mt={{ xs: 2, md: 0 }}>
                            <Grid container>
                                <Grid item xs={12} md={12}>
                                    <Typography variant="h6">Người nhận</Typography>
                                </Grid>
                                <Grid item xs={3} md={3}>
                                    <strong>Tên:</strong>
                                </Grid>
                                <Grid item xs={9} md={9}>
                                    {row?.delivery_address.name}
                                </Grid>
                                <Grid item xs={3} md={3}>
                                    <strong>SĐT:</strong>
                                </Grid>
                                <Grid item xs={9} md={9}>
                                    {row?.delivery_address.phone}
                                </Grid>
                                <Grid item xs={3} md={3}>
                                    <strong>Email:</strong>
                                </Grid>
                                <Grid item xs={9} md={9}>
                                    {row?.delivery_address.email}
                                </Grid>
                                <Grid item xs={3} md={3}>
                                    <strong>Địa chỉ:</strong>
                                </Grid>
                                <Grid item xs={9} md={9}>
                                    {row?.delivery_address.address}
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    <Grid item sm={12} md={12}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box
                                mt={2}
                                sx={{
                                    width: { xs: '250px', sm: '100%', md: '100%' },
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <SelectField
                                    control={control}
                                    label="Trạng thái"
                                    name="status"
                                    maxHeight="50%"
                                    options={[
                                        { value: 1, label: 'Đặt hàng' },
                                        { value: 2, label: 'Đang giao hàng' },
                                        { value: 3, label: 'Giao hàng thành công' },
                                        { value: 4, label: 'Giao hàng thất bại' },
                                    ]}
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-end',
                                }}
                                m={3}
                                mr={0}
                            >
                                <Button
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
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    );
};

export default FormOrder;
