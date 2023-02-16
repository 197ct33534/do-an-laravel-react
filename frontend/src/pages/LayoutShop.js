import React from 'react';
import '../Shop/css/LayoutShop.css';
import { Outlet } from 'react-router-dom';
import Footer from '../Shop/components/Footer';
import Header from '../Shop/components/Header';
import NavBar from '../Shop/components/NavBar';

const LayoutShop = () => {
    return (
        <>
            <Header />
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
};

export default LayoutShop;
