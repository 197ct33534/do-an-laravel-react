import { Box, Button, Dialog, DialogTitle, Typography } from '@mui/material';
import React from 'react';
import AlertMui from '../../components/Common/AlertMui';
import InputField from '../../components/Form/InputField';
import SelectField from '../../components/Form/SelectField';

const FormUser = ({
    control,
    handleClose,
    open,
    contentAlert,
    setOpenAlert,
    openAlert,
    user,
    onSubmit,
    role,
}) => {
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="800px">
            <DialogTitle textAlign="center">
                <Typography variant="h5">
                    {user.name ? 'Cập nhật người dùng ' : 'Thêm người dùng'}
                </Typography>
            </DialogTitle>
            <form onSubmit={onSubmit}>
                {contentAlert && contentAlert !== '' && (
                    <AlertMui open={openAlert} setOpen={setOpenAlert} content={contentAlert} />
                )}
                <Box mt={3} mx={3}>
                    <InputField
                        control={control}
                        label="Họ và tên"
                        name="name"
                        sx={{
                            width: 500,
                        }}
                    />
                </Box>
                <Box mt={2} mx={3}>
                    <InputField
                        control={control}
                        label="Email"
                        name="email"
                        sx={{
                            width: 500,
                        }}
                    />
                </Box>
                <Box mt={2} mx={3}>
                    <InputField
                        control={control}
                        label="Mật khẩu"
                        name="password"
                        type="password"
                        sx={{
                            width: 500,
                        }}
                    />
                </Box>
                <Box mt={2} mx={3}>
                    <InputField
                        control={control}
                        label="Nhập lại mật khẩu"
                        name="password_confirmation"
                        type="password"
                        sx={{
                            width: 500,
                        }}
                    />
                </Box>
                <Box mx={3} mt={3}>
                    <SelectField control={control} label="Nhóm" name="group_role" options={role} />
                </Box>
                <Box mx={3} mt={3}>
                    <SelectField
                        control={control}
                        label="Trạng thái"
                        name="is_active"
                        options={[
                            { label: 'Đang hoạt động', value: '1' },
                            { label: 'Tạm khóa', value: '0' },
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

export default FormUser;
