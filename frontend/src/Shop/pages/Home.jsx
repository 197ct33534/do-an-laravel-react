import React, { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoryListNoParent } from '../../features/shopSlice';
import Carousel from '../components/Carousel';
import Categories from '../components/Categories';
import Option from '../components/Option';
import Products from '../components/Products';
import Vendor from '../components/Vendor';
import { useEffect } from 'react';
import { getBrandAsync, getCategoryAllAsync, getProductAsync } from '../../features/shopThunk';
export const HomeContext = createContext();
const Home = () => {
    const dispatch = useDispatch();

    const categories = useSelector(categoryListNoParent);
    useEffect(() => {
        // dispatch(getCategoryAsync());
        dispatch(getCategoryAllAsync());
        dispatch(getProductAsync());

        dispatch(getBrandAsync());
    }, [dispatch]);
    return (
        <HomeContext.Provider value={{ categories }}>
            <Carousel />
            <Option />
            <Categories />
            <Products />
            <Vendor />
        </HomeContext.Provider>
    );
};

export default Home;
