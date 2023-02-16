import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    getBrandAsync,
    getCategoryAllAsync,
    getCategoryAsync,
    getProductAsync,
} from '../../features/shopThunk';
import Carousel from '../components/Carousel';
import Categories from '../components/Categories';
import Option from '../components/Option';
import Products from '../components/Products';
import Vendor from '../components/Vendor';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrandAsync());
        dispatch(getProductAsync());
        dispatch(getCategoryAsync());
        dispatch(getCategoryAllAsync());
    }, [dispatch]);

    return (
        <>
            <Carousel />
            <Option />
            <Categories />
            <Products />
            <Vendor />
        </>
    );
};

export default Home;
