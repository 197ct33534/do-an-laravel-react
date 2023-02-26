import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import SpinnerMui from '../components/Common/SpinnerMui';
import { getCategoryAsync } from '../features/shopThunk';
import Footer from '../Shop/components/Footer';
import Header from '../Shop/components/Header';
import NavBar from '../Shop/components/NavBar';
import '../Shop/css/LayoutShop.css';

const LayoutShop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategoryAsync());
    }, [dispatch]);
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
