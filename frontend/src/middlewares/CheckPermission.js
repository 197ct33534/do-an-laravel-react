import { Navigate, Outlet, useNavigate } from 'react-router-dom';

export const CheckPermission = (permiss = null) => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (user && user.group_role === 'Super') {
        return <Outlet />;
    }
    return <Navigate to="/" />;
};
