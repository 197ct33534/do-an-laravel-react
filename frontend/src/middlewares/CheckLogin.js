import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const CheckLogin = (props) => {
    const token = Boolean(localStorage.getItem('token'));
    const expires = localStorage.getItem('expires');
    const now = new Date();
    const dateExpires = new Date(expires);

    if (token && now.getTime() < dateExpires.getTime()) {
        return <Navigate to="/admin" />;
    }
    return <Outlet />;
};
