import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { done } from '../features/user/userSlice';

const Deni = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(done());
    }, []);
    return (
        <div style={{ margin: '0 auto' }}>
            <Link to="/manager/home">Quay về trang chủ</Link>
            <img src={process.env.PUBLIC_URL + '/assets/images/403-error.png'} alt="" />
        </div>
    );
};

export default Deni;
