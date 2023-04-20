import React from 'react';
import { createContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchDetailProduct } from '../../Admin/Product/productAPI';
import { fetchgetProductComment } from '../../features/shopApi';
import { done, pendding } from '../../features/shopSlice';
import Breadcrumb from '../components/Breadcrumb';
import ShopDetail from '../components/ShopDetail';
export const ProductDetailContext = createContext();
const DetailProduct = () => {
    const { id } = useParams();
    const { search } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState();
    const [comment, setComment] = useState();
    const fetchProduct = async (id) => {
        dispatch(pendding());
        const response = await fetchDetailProduct(id);
        console.log(response?.data?.data);
        if (response?.data.success) {
            setProduct(response.data);
        } else {
            // navigate('/notfound');
        }
        dispatch(done());
    };
    const fetchComments = async (id) => {
        const response = await fetchgetProductComment(id);

        if (response.data.success) {
            setComment(response.data.data);
        }
    };
    const BreadPath = [
        {
            name: 'Trang chủ',
            link: '/',
        },
        // {
        //     name: product ? product[0]['product_name'] : '',
        //     link: '#',
        // },
    ];
    useEffect(() => {
        fetchProduct(id);
    }, [id]);
    useEffect(() => {
        fetchComments(id + search);
    }, [id, search]);
    return (
        <ProductDetailContext.Provider value={{ product: product?.data, comment }}>
            <Breadcrumb PathList={BreadPath.concat(product?.category_tree)} />
            <ShopDetail />
        </ProductDetailContext.Provider>
    );
};

export default DetailProduct;
