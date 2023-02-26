import { createSlice } from '@reduxjs/toolkit';
import {
    addCartAsync,
    CartCountAsync,
    getBrandAsync,
    getCategoryAllAsync,
    getCategoryAsync,
    getProductAsync,
} from './shopThunk';
const initialState = {
    load: 'idle',
    brandList: [],
    productList: [],
    categoryListNoParent: [],
    categoryList: [],
    cartCount: [],
};
export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        pendding: (state) => {
            state.load = 'loading';
        },
        done: (state) => {
            state.load = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            // brand trang home
            .addCase(getBrandAsync.pending, (state) => {
                state.load = 'loading';
            })
            .addCase(getBrandAsync.fulfilled, (state, action) => {
                state.load = 'idle';
                state.brandList = action.payload.data;
            })
            // product trang home
            .addCase(getProductAsync.pending, (state) => {
                state.load = 'loading';
            })
            .addCase(getProductAsync.fulfilled, (state, action) => {
                state.load = 'idle';
                state.productList = action.payload.data.data;
            })

            // category trang home
            .addCase(getCategoryAllAsync.pending, (state) => {
                state.load = 'loading';
            })
            .addCase(getCategoryAllAsync.fulfilled, (state, action) => {
                state.load = 'idle';
                state.categoryListNoParent = action.payload.data;
            })
            // category trang home
            .addCase(getCategoryAsync.pending, (state) => {
                state.load = 'loading';
            })
            .addCase(getCategoryAsync.fulfilled, (state, action) => {
                state.load = 'idle';
                state.categoryList = action.payload.data;
            })
            // add cart
            .addCase(addCartAsync.pending, (state) => {
                state.load = 'loading';
            })
            .addCase(addCartAsync.fulfilled, (state, action) => {
                state.load = 'idle';
            })
            //CartCountAsync

            .addCase(CartCountAsync.pending, (state) => {
                state.load = 'loading';
            })
            .addCase(CartCountAsync.fulfilled, (state, action) => {
                state.load = 'idle';
                state.cartCount = action.payload.data;
            });
    },
});
export const shopAction = shopSlice.actions;
export const brandList = (state) => state.shop.brandList;
export const productList = (state) => state.shop.productList;
export const categoryListNoParent = (state) => state.shop.categoryListNoParent;
export const categoryList = (state) => state.shop.categoryList;
export const cartCount = (state) => state.shop.cartCount;

export const { pendding, done } = shopSlice.actions;
export default shopSlice.reducer;
