import { Box, Button, Grid, Pagination, Typography } from '@mui/material';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import InputField from '../../components/Form/InputField';
import { done, pendding } from '../../features/shopSlice';
import { fetchGetOrder } from '../../features/user/userAPI';
import OrderTable from './OrderTable';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useSearchParams } from 'react-router-dom';
import SelectField from '../../components/Form/SelectField';
import { removeValuteEmpty } from '../../Helper/Funtion';
export const OrderContext = createContext();
const OrderList = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [orderList, setOrderList] = useState();

    const initalSearch = {
        min_total: '',
        max_total: '',
        name: '',
        phone: '',
        status_order: '',
        perPage: orderList?.pagination?.per_page ?? 10,
        page: 1,
    };

    const searchAsObject = Object.fromEntries(new URLSearchParams(searchParams));

    const [stateSearch, setStateSearch] = useState(
        Object.keys(searchAsObject).length === 0 ? initalSearch : searchAsObject
    );
    const [search, setSearch] = useState(stateSearch);
    const fetchOrderList = async (param = stateSearch) => {
        dispatch(pendding());
        const response = await fetchGetOrder(param);
        console.log(response);
        if (response?.data?.success === true) {
            setOrderList(response.data.data);
        } else {
            const configParam = removeValuteEmpty(param);
            if (
                configParam.hasOwnProperty('name') ||
                configParam.hasOwnProperty('min_total') ||
                configParam.hasOwnProperty('max_total') ||
                configParam.hasOwnProperty('status_order') ||
                configParam.hasOwnProperty('phone')
            ) {
                setOrderList([]);
            } else {
                if (response?.data?.data === false) {
                    setOrderList([]);
                } else {
                    setStateSearch({ perPage: 10, page: 1 });
                    setSearchParams({ perPage: 10, page: 1 });
                }
            }
        }
        dispatch(done());
    };
    const formSearch = useForm({
        defaultValues: useMemo(() => {
            return search;
        }, [search]),
    });
    const handleSearch = async (data) => {
        const value = removeValuteEmpty(data);
        setSearchParams(value);
        setStateSearch(value);
    };
    const handleClearSearch = () => {
        const param = removeValuteEmpty(initalSearch);
        setSearchParams(param);
        setSearch({ min_total: '', max_total: '', name: '', phone: '', status_order: '' });
        setStateSearch(param);
    };
    const handleSelectCountPage = (e) => {
        const perPageTarget = e.target.value;
        const param = removeValuteEmpty(stateSearch);
        setSearchParams({ ...param, perPage: perPageTarget });
        setStateSearch({ ...param, perPage: perPageTarget });
    };
    const handlePageChange = (e, page) => {
        const param = removeValuteEmpty(stateSearch);
        const value = { ...param, page: page, perPage: orderList?.pagination?.per_page };
        setSearchParams(value);
        setStateSearch(value);
    };

    useEffect(() => {
        fetchOrderList();
    }, [stateSearch]);
    useEffect(() => {
        formSearch.reset(search);
    }, [search, formSearch]);
    console.log('parent change');
    return (
        <OrderContext.Provider value={{ orderList }}>
            <Typography variant="h5">Quản Lý Đơn Hàng</Typography>
            <form onSubmit={formSearch.handleSubmit(handleSearch)}>
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} sm={12} md={2}>
                    <InputField control={formSearch.control} label="Tên" name="name" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                        <InputField
                            control={formSearch.control}
                            label="Số điện thoại"
                            name="phone"
                            type="number"
                            min="0"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <InputField
                                control={formSearch.control}
                                label="Tổng tiền từ"
                                name="min_total"
                                type="number"
                                min="0"
                            />
                            <Typography mx={2} variant="style2">
                                ~
                            </Typography>
                            <InputField
                                control={formSearch.control}
                                label="Tổng tiền đến"
                                name="max_total"
                                type="number"
                                min="0"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                        <SelectField
                            control={formSearch.control}
                            label="Trạng thái"
                            name="status_order"
                            options={[
                                { value: 1, label: 'Đặt hàng' },
                                { value: 2, label: 'Đang giao hàng' },
                                { value: 3, label: 'Giao hàng thành công' },
                                { value: 4, label: 'Giao hàng thất bại' },
                            ]}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                        <Box
                            sx={{
                                // marginLeft: '16px',
                                display: 'flex',
                                justifyContent: {
                                    md: 'flex-end',
                                },
                            }}
                        >
                            <Button
                                type="submit"
                                variant="outlined"
                                color="primary"
                                sx={{
                                    marginRight: { xs: '16px' },
                                }}
                            >
                                <SearchIcon />
                            </Button>
                            <Button
                                mr={3}
                                onClick={() => handleClearSearch()}
                                variant="outlined"
                                color="secondary"
                            >
                                <SearchOffIcon />
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
            <Box
                mt={5}
                sx={{
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'flex-end',
                    width: '100%',
                }}
            >
                <OrderTable />
            </Box>
            {orderList?.data && orderList?.pagination?.total > 10 && (
                <Grid container spacing={3} my={3} alignItems="center">
                    <Grid item xs={12} md={1}>
                        <Box sx={{ display: 'flex', marginLeft: '8px' }}>
                            <select
                                name="select_count_page"
                                value={orderList.pagination?.per_page}
                                onChange={(e) => handleSelectCountPage(e)}
                                style={{
                                    width: '100px',
                                    textAlign: 'center',
                                    padding: '4px 0',
                                }}
                            >
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Typography
                            variant="style-1"
                            sx={{
                                textAlign: {
                                    md: 'center',
                                    xs: 'left',
                                },
                            }}
                            display="block"
                        >
                            {`Hiển thị từ ${orderList.pagination?.from} ~ ${orderList.pagination?.to}  trong tổng số ${orderList.pagination?.total} hóa đơn`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                display: 'flex',
                                justifyContent: { md: 'flex-end', xs: 'left' },
                                width: '100%',
                            }}
                        >
                            <Pagination
                                xs={12}
                                color="primary"
                                page={orderList.pagination?.current_page}
                                count={Math.ceil(
                                    orderList.pagination?.total / orderList.pagination?.per_page
                                )}
                                onChange={handlePageChange}
                            />
                        </Box>
                    </Grid>
                </Grid>
            )}
            <div style={{ marginBottom: orderList?.pagination?.total > 20 ? '0' : '24px' }}></div>
        </OrderContext.Provider>
    );
};

export default OrderList;
