import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBrand } from '../Admin/Brand/BrandAPI';
import { fetchAllCategory, fetchCategory } from '../Admin/Category/CateApi';
import { fetchGetFilterProduct } from '../Admin/Product/productAPI';

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
