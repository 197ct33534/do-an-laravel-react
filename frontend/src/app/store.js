import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/user/userSlice';
import shopReducer from '../features/shopSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        shop: shopReducer,
    },
});
