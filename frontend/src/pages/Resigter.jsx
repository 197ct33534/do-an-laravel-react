import { yupResolver } from '@hookform/resolvers/yup';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    createTheme,
    CssBaseline,
    FormControlLabel,
    ThemeProvider,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import AlertMui from '../components/Common/AlertMui';
import InputField from '../components/Form/InputField';

import {
    loginAsync,
    resigterAsync,
    selectErrors,
    selectInfoUser,
    selectIsLogggedin,
} from '../features/user/userSlice';
import { rule } from '../rules/ruleResigter';

const Resigter = () => {
    const theme = createTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector(selectInfoUser);
    const isLogggedin = useSelector(selectIsLogggedin);
    const error = useSelector(selectErrors);
    const [openAlert, setOpenAlert] = useState(true);
    const [contentAlert, setContentAlert] = useState('');

    const schema = yup.object(rule).required();

    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmitForm = async (formValues) => {
        console.log(formValues);

        await dispatch(resigterAsync(formValues));
    };
    // kiểm tra đã login và có token thì sẽ chuyển trang
    useEffect(() => {
        if (isLogggedin && localStorage.getItem('token')) {
            Promise.resolve().then(function () {
                localStorage.setItem('userInfo', JSON.stringify(userInfo.data));
                if (userInfo.data.group_role === 'Super') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            });
        }
    }, [isLogggedin, navigate, userInfo]);

    useEffect(() => {
        setContentAlert(error?.message);
        setOpenAlert(true);
    }, [error, setOpenAlert, contentAlert]);
    return (
        <>
            <Box>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        sx={{ m: 1, bgcolor: 'secondary.main', width: 200, height: 200 }}
                        src={process.env.PUBLIC_URL + '/assets/images/logo.png'}
                        variant="square"
                    ></Avatar>
                    <Typography component="h1" variant="h5">
                        Đăng ký
                    </Typography>

                    <form onSubmit={handleSubmit(handleSubmitForm)}>
                        {error && (
                            <AlertMui
                                open={openAlert}
                                setOpen={setOpenAlert}
                                content={contentAlert}
                            />
                        )}
                        <Box
                            my={3}
                            px={{ md: '0', sm: '0', xs: '32px' }}
                            sx={{
                                width: { md: '400px', sm: '400px', xs: '100vw' },
                            }}
                        >
                            <InputField control={control} label="Họ và tên" name="name" />
                        </Box>
                        <Box
                            my={3}
                            px={{ md: '0', sm: '0', xs: '32px' }}
                            sx={{
                                width: { md: '400px', sm: '400px', xs: '100vw' },
                            }}
                        >
                            <InputField control={control} label="Email" name="email" />
                        </Box>

                        <Box
                            my={3}
                            px={{ md: '0', sm: '0', xs: '32px' }}
                            sx={{
                                width: { md: '400px', sm: '400px', xs: '100vw' },
                            }}
                        >
                            <InputField
                                control={control}
                                label="Mật khẩu"
                                name="password"
                                type="password"
                            />
                        </Box>
                        <Box
                            my={3}
                            px={{ md: '0', sm: '0', xs: '32px' }}
                            sx={{
                                width: { md: '400px', sm: '400px', xs: '100vw' },
                            }}
                        >
                            <InputField
                                control={control}
                                label="Nhập lại mật khẩu"
                                name="password_confirmation"
                                type="password"
                            />
                        </Box>

                        <Box px={{ md: '0', sm: '0', xs: '32px' }}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 0, mb: 2 }}
                            >
                                Đăng ký
                            </Button>
                        </Box>
                        <Box px={{ md: '0', sm: '0', xs: '32px' }} textAlign={'right'}>
                            <Link
                                to="/login"
                                style={{
                                    color: '#1565C0',
                                    textDecoration: 'underline',
                                }}
                            >
                                Đăng nhập với tài khoản
                            </Link>
                        </Box>
                    </form>
                </Box>
            </Box>
        </>
    );
};

export default Resigter;
