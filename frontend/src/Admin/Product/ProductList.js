import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Box, Button, Grid, Pagination, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputField from '../../components/Form/InputField';
import { done, pendding } from '../../features/user/userSlice';
import { configToast } from '../../Helper/Config';
import { removeValuteEmpty } from '../../Helper/Funtion';
import { fetchBrand } from '../Brand/BrandAPI';
import { fetchCategoryAll } from '../Category/CateApi';
import { fetchDeleteProduct, fetchGetFilterProduct } from './productAPI';
import TableProduct from './TableProduct';
const ProductList = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const [pagination, setPagination] = useState();
    const [data, setData] = useState();

    const [selectObject, setSelectObject] = useState({});
    const initalSearch = {
        min_price: '',
        max_price: '',
        name: '',

        perPage: pagination?.per_page,
        page: 1,
    };

    const searchAsObject = Object.fromEntries(new URLSearchParams(searchParams));

    const [stateSearch, setStateSearch] = useState(
        Object.keys(searchAsObject).length === 0 ? initalSearch : searchAsObject
    );
    const [search, setSearch] = useState(stateSearch);
    const formSearch = useForm({
        defaultValues: useMemo(() => {
            return search;
        }, [search]),
    });
    async function fetchData(param = stateSearch) {
        dispatch(pendding());
        const response = await fetchGetFilterProduct(param);

        if (response?.data?.success === true) {
            setData(response.data.data);
            setPagination(response.data.data.pagination);
        } else {
            const configParam = removeValuteEmpty(param);
            if (
                configParam.hasOwnProperty('name') ||
                configParam.hasOwnProperty('min_price') ||
                configParam.hasOwnProperty('max_price')
            ) {
                setData([]);
            } else {
                if (response?.data?.data === false) {
                    setData([]);
                } else {
                    setStateSearch({ perPage: 10, page: 1 });
                    setSearchParams({ perPage: 10, page: 1 });
                }
            }
        }
        dispatch(done());
    }
    async function fetchList() {
        dispatch(pendding());
        const res = await fetchBrand();
        const response = await fetchCategoryAll();
        let brand = res.data.data;
        let cate = response.data.data;
        const temp = [];
        brand.forEach((element) => {
            temp.push({ label: element.name, value: element.id });
        });

        const temp2 = [];
        cate.forEach((element) => {
            temp2.push({ label: element.name, value: element.id });
        });

        setSelectObject({ ...selectObject, brandList: temp, cateList: temp2 });
        dispatch(done());
    }

    const handleSelectCountPage = (e) => {
        const perPageTarget = e.target.value;
        const param = removeValuteEmpty(stateSearch);
        setSearchParams({ ...param, perPage: perPageTarget });
        setStateSearch({ ...param, perPage: perPageTarget });
    };

    const handlePageChange = (e, page) => {
        const param = removeValuteEmpty(stateSearch);
        const value = { ...param, page: page, perPage: pagination?.per_page };
        setSearchParams(value);
        setStateSearch(value);
    };
    const handleDelete = async (row) => {
        const response = await fetchDeleteProduct(row);
        const success = response?.data?.success;
        if (success) {
            toast.success(response.data.message, configToast);
            fetchData();
        }
    };
    const handleClearSearch = () => {
        const param = removeValuteEmpty(initalSearch);
        setSearchParams(param);
        setSearch({ min_price: '', max_price: '', name: '' });
        setStateSearch(param);
    };
    const handleSearch = (formValues) => {
        const value = removeValuteEmpty(formValues);
        value.perPage = pagination?.per_page;

        setStateSearch(value);
        setSearchParams(value);
    };
    useEffect(() => {
        formSearch.reset(search);
    }, [search, formSearch]);
    useEffect(() => {
        fetchList();
    }, []);

    useEffect(() => {
        fetchData();
    }, [stateSearch]);
    return (
        <>
            <Typography variant="h5">Quản Lý Sản Phẩm</Typography>

            {/* tìm kiếm sản phẩm */}
            <form onSubmit={formSearch.handleSubmit(handleSearch)}>
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} sm={12} md={3}>
                        <Button
                            size="small"
                            color="success"
                            variant="outlined"
                            onClick={() => navigate('add')}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AddIcon />
                            </Box>
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputField control={formSearch.control} label="Tên" name="name" />
                            </Grid>
                            <Grid item xs={12} sm={12} md={5}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <InputField
                                        control={formSearch.control}
                                        label="Giá bán từ"
                                        name="min_price"
                                        type="number"
                                        min="0"
                                        step=".01"
                                    />
                                    <Typography mx={2} variant="style2">
                                        ~
                                    </Typography>
                                    <InputField
                                        control={formSearch.control}
                                        label="Giá bán đến"
                                        name="max_price"
                                        type="number"
                                        min="0"
                                        step=".01"
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={3}>
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
                    </Grid>

                    <Grid item md={9}></Grid>
                </Grid>
            </form>
            {/* danh sách sản phẩm */}
            <Box
                mt={5}
                sx={{
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'flex-end',
                    width: '100%',
                }}
            >
                <TableProduct list={data} onDelete={handleDelete} />
            </Box>
            {/* phân trang */}
            {data?.data && pagination?.total > 10 && (
                <Grid container spacing={3} my={3} alignItems="center">
                    <Grid item xs={12} md={1}>
                        <Box sx={{ display: 'flex', marginLeft: '8px' }}>
                            <select
                                name="select_count_page"
                                value={pagination?.per_page}
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
                            {`Hiển thị từ ${pagination?.from} ~ ${pagination?.to}  trong tổng số ${pagination?.total} sản phẩm`}
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
                                page={pagination?.current_page}
                                count={Math.ceil(pagination?.total / pagination?.per_page)}
                                onChange={handlePageChange}
                            />
                        </Box>
                    </Grid>
                </Grid>
            )}
            <div style={{ marginBottom: pagination?.total > 20 ? '0' : '24px' }}></div>
        </>
    );
};

export default ProductList;
