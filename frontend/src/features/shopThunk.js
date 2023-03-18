import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBrand } from '../Admin/Brand/BrandAPI';
import { fetchAllCategory, fetchCategory } from '../Admin/Category/CateApi';
import { fetchDetailProduct, fetchGetFilterProduct } from '../Admin/Product/productAPI';
import {
    fetchAddCart,
    fetchCartCount,
    fetchDeleteCartCount,
    fetchpostOrder,
    fetchPutCartCount,
} from './shopApi';

export const getBrandAsync = createAsyncThunk('brand/get', async () => {
    const response = await fetchBrand();
    return response.data;
});
export const getProductAsync = createAsyncThunk('product/get', async () => {
    const response = await fetchGetFilterProduct({ perPage: 8, page: 1 });
    return response.data;
});
export const getCategoryAllAsync = createAsyncThunk('categoryAll/get', async () => {
    const response = await fetchCategory();
    return response.data;
});

export const getCategoryAsync = createAsyncThunk('category/get', async () => {
    const response = await fetchAllCategory();
    return response.data;
});
export const getProductDetailAsync = createAsyncThunk('productDetail/get', async (id) => {
    const response = await fetchDetailProduct(id);
    return response.data;
});

export const addCartAsync = createAsyncThunk('addCart/post', async (data) => {
    const response = await fetchAddCart(data);
    return response.data;
});

export const CartCountAsync = createAsyncThunk('cartCount/get', async (data) => {
    const response = await fetchCartCount(data);
    return response.data;
});

export const updateCartAsync = createAsyncThunk('cart/put', async (data) => {
    const response = await fetchPutCartCount(data);
    return response.data;
});

export const deleteCartAsync = createAsyncThunk('cart/delete', async (cartId) => {
    const response = await fetchDeleteCartCount(cartId);
    return response.data;
});

export const postOrderAsync = createAsyncThunk('postOrder/post', async (data) => {
    const response = await fetchpostOrder(data);
    return response.data;
});
