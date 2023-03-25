import React, { createContext } from 'react';
import { useSelector } from 'react-redux';
import { categoryListNoParent } from '../../features/shopSlice';
import Carousel from '../components/Carousel';
import Categories from '../components/Categories';
import Option from '../components/Option';
import Products from '../components/Products';
import Vendor from '../components/Vendor';
export const HomeContext = createContext();
const Home = () => {
    const categories = useSelector(categoryListNoParent);
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
