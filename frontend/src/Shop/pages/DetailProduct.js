import React from 'react';
import { createContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDetailProduct } from '../../Admin/Product/productAPI';
import { done, pendding } from '../../features/shopSlice';
import Breadcrumb from '../components/Breadcrumb';
import ShopDetail from '../components/ShopDetail';
export const ProductDetailContext = createContext();
const DetailProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState();
    const fetchProduct = async (id) => {
        dispatch(pendding());
        const response = await fetchDetailProduct(id);

        if (response.data.data.length) {
            setProduct(response.data.data);
        } else {
            navigate('/notfound');
        }
        dispatch(done());
    };
    useEffect(() => {
        fetchProduct(id);
    }, [id]);
    return (
        <ProductDetailContext.Provider value={product}>
            <Breadcrumb />
            <ShopDetail />
        </ProductDetailContext.Provider>
    );
};

export default DetailProduct;
