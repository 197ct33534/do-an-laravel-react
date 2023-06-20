import { Box } from '@mui/material';
import React, { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from '../Shop/components/Footer';
import Header from '../Shop/components/Header';
import NavBar from '../Shop/components/NavBar';
import '../Shop/css/LayoutShop.css';
import SpinnerMui from '../components/Common/SpinnerMui';
// import { fetchgetProductRecommend } from '../features/shopApi';
// import { cartCount } from '../features/shopSlice';
import { CartCountAsync, getCategoryAsync } from '../features/shopThunk';
export const LayoutShopContext = createContext();
const LayoutShop = () => {
    const dispatch = useDispatch();
    // const carts = useSelector(cartCount);

    const user = JSON.parse(localStorage.getItem('userInfo'));
    // const [recommendProduct, setRecommendProduct] = useState();
    // const fetchProductRecommend = async () => {
    //     if (user?.id) {
    //         const res = await fetchgetProductRecommend();
    //         if (res.data.success) {
    //             setRecommendProduct(res.data.data);
    //         }
    //     }
    // };
    // useEffect(() => {
    //     fetchProductRecommend();
    // }, [carts.cart_count]);
    useEffect(() => {
        dispatch(getCategoryAsync());
        if (user?.id) {
            dispatch(CartCountAsync());
        }
    }, [dispatch, user?.id]);

    return (
        <>
            <LayoutShopContext.Provider value={{}}>
                <Header />
                <NavBar />
                <Outlet />
                <Footer />
            </LayoutShopContext.Provider>
            <Box sx={{ position: 'fixed', top: '50%', left: '50%' }}>
                <SpinnerMui />
            </Box>
            <ToastContainer autoClose={3000} />
            <a href="#" className="btn btn-primary back-to-top" style={{ display: 'inline' }}>
                <i class="fa fa-angle-double-up"></i>
            </a>
        </>
    );
};

export default LayoutShop;
