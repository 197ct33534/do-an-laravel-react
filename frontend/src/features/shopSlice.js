import { createSlice } from '@reduxjs/toolkit';
import {
    addCartAsync,
    CartCountAsync,
    getBrandAsync,
    getCategoryAllAsync,
    getCategoryAsync,
    getProductAsync,
    getProductTopSearchAsync,
    postOrderAsync,
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
        resetCart: (state) => {
            state.cartCount = [];
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
            .addCase(getProductTopSearchAsync.pending, (state) => {
                state.load = 'loading';
            })
            .addCase(getProductTopSearchAsync.fulfilled, (state, action) => {
                state.load = 'idle';
                state.productList = action.payload.data;
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
            })
            .addCase(postOrderAsync.pending, (state) => {
                state.load = 'loading';
            });
    },
});
export const shopAction = shopSlice.actions;
export const brandList = (state) => state.shop.brandList;
export const productList = (state) => state.shop.productList;
export const categoryListNoParent = (state) => state.shop.categoryListNoParent;
export const categoryList = (state) => state.shop.categoryList;
export const cartCount = (state) => state.shop.cartCount;

export const { pendding, done, resetCart } = shopSlice.actions;
export default shopSlice.reducer;
