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
    selectErrors,
    selectInfoUser,
    selectIsLogggedin,
} from '../features/user/userSlice';
import { rule } from '../rules/ruleLogin';

const Login = () => {
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
            email: '',
            pass: '',
            remember: [],
        },
        resolver: yupResolver(schema),
    });

    const handleSubmitForm = async (formValues) => {
        const data = {
            ...formValues,
            remember: Boolean(formValues.remember.length),
        };

        await dispatch(loginAsync(data));
    };
    const back = localStorage.getItem('back');

    // kiểm tra đã login và có token thì sẽ chuyển trang
    useEffect(() => {
        if (isLogggedin && localStorage.getItem('token')) {
            Promise.resolve().then(function () {
                localStorage.setItem('userInfo', JSON.stringify(userInfo.data));
                const back = localStorage.getItem('back');

                if (back) {
                    navigate(back);
                }
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
        <div>
            {/* <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="md"> */}

            <Box sx={{ backgroundColor: 'white', height: '100vh' }}>
                <CssBaseline />
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
                        Đăng nhập
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
                                name="pass"
                                type="password"
                            />
                        </Box>
                        <Box
                            textAlign="left"
                            my={{ md: 3, sm: 3, xs: 0 }}
                            px={{ md: '0', sm: '0', xs: '32px' }}
                            // sx={{
                            //     width: { md: '400px', sm: '400px', xs: '100vw' },
                            // }}
                            sx={{
                                display: { sm: 'block', md: 'flex' },
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Controller
                                name="remember"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <>
                                            <FormControlLabel
                                                label="Ghi nhớ"
                                                control={
                                                    <Checkbox
                                                        value={'remember'}
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
                                        </>
                                    );
                                }}
                            />
                            <Box sx={{ display: { xs: 'none', sm: 'block', md: ' block' } }}>
                                <Link
                                    to="/dang-ky"
                                    style={{ color: '#1565C0', textDecoration: 'underline' }}
                                >
                                    Đăng ký tài khoản
                                </Link>
                            </Box>
                        </Box>
                        <Box
                            px={{ md: '0', sm: '0', xs: '32px' }}
                            sx={{ display: { xs: 'block', sm: 'none', md: 'none' } }}
                        >
                            <Link
                                to="/dang-ky"
                                style={{ color: '#1565C0', textDecoration: 'underline' }}
                            >
                                Đăng ký tài khoản
                            </Link>
                        </Box>
                        <Box px={{ md: '0', sm: '0', xs: '32px' }}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Đăng nhập
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
            {/* </Container>
            </ThemeProvider> */}
        </div>
    );
};

export default Login;
