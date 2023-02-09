import { Box, Button, Grid, Pagination, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
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
        is_sales: '',
        perPage: pagination?.per_page,
        page: 1,
    };
    const initalProduct = {
        product_name: '',
        description: '',
        product_price: '',
        // is_sales: "",
        gender: '1',
        category: '',
        brand: '',
        active: '1',
        sku: [],
        image: [],
        color: [],
        size: [],
    };
    const searchAsObject = Object.fromEntries(new URLSearchParams(searchParams));
    const [product, setProduct] = useState(initalProduct);
    const [stateSearch, setStateSearch] = useState(
        Object.keys(searchAsObject).length === 0 ? initalSearch : searchAsObject
    );
    async function fetchData(param = stateSearch) {
        dispatch(pendding());
        const response = await fetchGetFilterProduct(param);

        if (response?.data?.success === true) {
            setData(response.data.data);
            setPagination(response.data.data.pagination);
        } else {
            const configParam = removeValuteEmpty(param);
            if (
                configParam.hasOwnProperty('is_sales') ||
                configParam.hasOwnProperty('name') ||
                configParam.hasOwnProperty('min_price') ||
                configParam.hasOwnProperty('max_price')
            ) {
                setData([]);
            } else {
                if (response?.data?.data === false) {
                    setData([]);
                } else {
                    setStateSearch({ perPage: 20, page: 1 });
                    setSearchParams({ perPage: 20, page: 1 });
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
    console.log(data);
    useEffect(() => {
        fetchList();
    }, []);

    useEffect(() => {
        fetchData();
    }, [stateSearch]);
    return (
        <>
            <Typography variant="h5">Quản Lý Sản Phẩm</Typography>

            <Box mt={3} textAlign="left">
                <Button
                    size="small"
                    color="success"
                    variant="contained"
                    onClick={() => navigate('add')}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="style-1" sx={{ paddingRight: '4px' }}>
                            Thêm
                        </Typography>
                        <FaPlus />
                    </Box>
                </Button>
            </Box>

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
