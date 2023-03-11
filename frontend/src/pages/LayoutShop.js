import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import SpinnerMui from '../components/Common/SpinnerMui';
import { getCategoryAsync, CartCountAsync } from '../features/shopThunk';
import { selectInfoUser } from '../features/user/userSlice';
import Footer from '../Shop/components/Footer';
import Header from '../Shop/components/Header';
import NavBar from '../Shop/components/NavBar';
import '../Shop/css/LayoutShop.css';

const LayoutShop = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectInfoUser);

    useEffect(() => {
        dispatch(getCategoryAsync());
        if (user.data) {
            dispatch(CartCountAsync());
        }
    }, [dispatch, user]);
    return (
        <>
            <Header />
            <NavBar />
            <Outlet />
            <Footer />
            <Box sx={{ position: 'fixed', top: '50%', left: '50%' }}>
                <SpinnerMui />
            </Box>
            <ToastContainer autoClose={3000} />
        </>
    );
};

export default LayoutShop;
