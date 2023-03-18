import { Box } from '@mui/material';
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import SpinnerMui from '../components/Common/SpinnerMui';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

import '../Scss/style.scss';

const Layout = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const [toggled, setToggled] = useState(false);
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const handleCollapsedChange = () => {
        setCollapsed(!collapsed);
    };

    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    // if (user && user.group_role !== 'Super') {
    // } else {
    //     navigate('/login');
    // }
    return (
        <div className={`app ${toggled ? 'toggled' : ''}`}>
            <Sidebar
                collapsed={collapsed}
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
                handleCollapsedChange={handleCollapsedChange}
            />
            <main>
                <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
                    <FaBars />
                </div>
                <Outlet />

                <Footer />
            </main>
            <ToastContainer autoClose={3000} />
            <Box sx={{ position: 'fixed', top: '50%', left: '50%' }}>
                <SpinnerMui />
            </Box>
        </div>
    );
};

export default Layout;
