import { TempleHinduOutlined } from '@mui/icons-material';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

import {
    fetchDeleteUser,
    fetchGetFilterUser,
    fetchGetUser,
    fetchLogin,
    fetchLogout,
    fetchPostUser,
    fetchPutIsActive,
    fetchPutUser,
    fetchResigter,
} from './userAPI';

const initialState = {
    isLogggedin: false,
    logging: false,
    infoUser: {
        success: false,
        message: '',
        data: null,
    },
    listUser: null,
    status: 'idle',
    errors: '',
};

export const loginAsync = createAsyncThunk('user/fetchLogin', async function login(id) {
    const response = await fetchLogin(id);
    return response.data;
});
export const resigterAsync = createAsyncThunk('user/fetchResigter', async function resigter(data) {
    const response = await fetchResigter(data);
    return response.data;
});
export const logoutAsync = createAsyncThunk('user/fetchLogout', async function logout() {
    const response = await fetchLogout();

    return response.data;
});

export const getUserAsync = createAsyncThunk(
    'user/fetchGetUser',
    async function getUser(param = { page: 1, perPage: 10 }) {
        const response = await fetchGetUser(param);
        return response.data;
    }
);

export const putUserIsActiveAsync = createAsyncThunk(
    'user/fetchPutIsActive',
    async function putIsActive(value) {
        const response = await fetchPutIsActive(value);
        return response.data;
    }
);
export const deleteUserAsync = createAsyncThunk(
    'user/fetchDeleteUser',
    async function deleteUser(value) {
        const response = await fetchDeleteUser(value);
        return response.data;
    }
);

export const postUserAsync = createAsyncThunk('user/fetchPostUser', async function postUser(value) {
    const response = await fetchPostUser(value);
    return response.data;
});

export const putUserAsync = createAsyncThunk('user/fetchPutUser', async function putUser(value) {
    const response = await fetchPutUser(value);
    return response.data;
});

export const getFilterUserAsync = createAsyncThunk(
    'user/fetchGetFilterUser',
    async function getFilterUser(listParam) {
        const response = await fetchGetFilterUser(listParam);
        return response.data;
    }
);
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetError: (state) => {
            state.errors = null;
        },
        pendding: (state) => {
            state.status = 'loading';
        },
        done: (state) => {
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.logging = true;
                state.errors = null;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.logging = false;
                state.errors = null;
                state.infoUser = action.payload;
                if (action.payload.success) {
                    axios.defaults.headers.common[
                        'Authorization'
                    ] = `Bearer ${action.payload.token}`;

                    localStorage.setItem('token', action.payload.token);
                    localStorage.setItem('expires', action.payload.expires);
                    state.isLogggedin = true;
                } else {
                    state.errors = { message: action.payload.message };
                }
            })
            .addCase(loginAsync.rejected, (state) => {
                state.logging = false;
            })
            .addCase(resigterAsync.pending, (state) => {
                state.logging = true;
                state.errors = null;
            })
            .addCase(resigterAsync.fulfilled, (state, action) => {
                state.logging = false;
                state.errors = null;
                state.infoUser = action.payload;
                // console.log(Object.values(action.payload.error[0]));
                if (action.payload.success) {
                    axios.defaults.headers.common[
                        'Authorization'
                    ] = `Bearer ${action.payload.token}`;

                    localStorage.setItem('token', action.payload.token);
                    localStorage.setItem('expires', action.payload.expires);
                    state.isLogggedin = true;
                } else {
                    state.errors = { message: Object.values(action.payload.error)[0] };
                }
            })
            /**
             * async function logout khi thành công sẽ reset các fill trong redux
             */
            .addCase(logoutAsync.pending, (state) => {
                state.status = 'loading';
                state.logging = false;
                state.isLogggedin = false;
            })
            .addCase(logoutAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.logging = false;
                state.isLogggedin = false;
                state.infoUser = action.payload;
                state.errors = null;
            })
            .addCase(logoutAsync.rejected, (state) => {
                state.isLogggedin = false;
                state.logging = false;
                state.infoUser = {
                    success: false,
                    message: '',
                    data: null,
                };
                state.listUser = null;
                state.status = 'idle';
            })
            /**
             * async function lấy tất cả các user vè và lưu trong redux
             */
            .addCase(getUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.listUser = action.payload;
            })
            /**
             * async function khi khóa 1 user
             * dữ liệu user bị xóa trả về, dùng hàm slice cắt user bị xóa đi ra khỏi listUser của redux
             */
            .addCase(putUserIsActiveAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(putUserIsActiveAsync.fulfilled, (state, action) => {
                state.status = 'idle';

                let temp = [...state.listUser.data];
                state.errors = null;
                temp.map((item, key) => {
                    if (item.id === action.payload?.data.id) {
                        temp[key] = action.payload.data;
                    }
                });
                state.listUser.data = temp;
            })
            /**
             * async function khi xóa 1 user
             * dữ liệu user bị xóa trả về, dùng hàm slice cắt user bị xóa đi ra khỏi listUser của redux
             */
            .addCase(deleteUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                let temp = [...state.listUser.data];

                temp.map((item, key) => {
                    if (item.id === action.payload?.data.id) {
                        temp.splice(key, 1);
                    }
                });
                if (temp.length > 0) {
                    state.listUser.data = temp;
                } else {
                    state.listUser.data = [];
                }
            })
            /**
             * async function khi tạo 1 user mới
             */
            .addCase(postUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload.success) {
                    state.errors = '';
                    state.listUser.data = [];
                    toast.success(action.payload?.message, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                } else {
                    let strErrors = '';
                    Object.values(action.payload?.error).map((item) => {
                        strErrors += item[0] + '-';
                    });
                    state.errors = { message: strErrors };
                }
            })
            /**
             * async function khi cập nhật 1 user mới
             */
            .addCase(putUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(putUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload.success) {
                    let temp = [...state.listUser.data];
                    state.errors = '';
                    temp.map((item, key) => {
                        if (item.id === action.payload?.data.id) {
                            temp[key] = action.payload.data;
                        }
                    });
                    state.listUser.data = temp;
                    toast.success(action.payload?.message, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                } else {
                    let strErrors = '';
                    Object.values(action.payload?.error).map((item) => {
                        strErrors += item[0] + '-';
                    });
                    state.errors = { message: strErrors };
                }
            })
            /**
             * async function khi lọc user
             */
            .addCase(getFilterUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getFilterUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload.success) {
                    state.listUser = action.payload.data;
                } else {
                    state.listUser.data = [];
                }
            });
    },
});
export const selectInfoUser = (state) => state.user.infoUser;
export const selectListUser = (state) => state.user.listUser;
export const selectIsLogggedin = (state) => state.user.isLogggedin;
export const selectErrors = (state) => state.user.errors;
export const selectStatus = (state) => state.user.status;
export const { resetError, pendding, done } = userSlice.actions;
export default userSlice.reducer;
