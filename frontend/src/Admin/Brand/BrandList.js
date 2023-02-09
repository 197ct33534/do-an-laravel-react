import { Box, Button, Grid, Pagination, Typography } from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import InputField from '../../components/Form/InputField';
import { done, pendding } from '../../features/user/userSlice';
import { removeValuteEmpty } from '../../Helper/Funtion';
import { fetchAllBrand } from './BrandAPI';
import FormBrand from './FormBrand';
import TableBrand from './TableBrand';

const BrandList = () => {
    const imageRef = useRef();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [row, setRow] = useState();
    const [brand, setBrand] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [pagination, setPagination] = useState();

    const [searchParams, setSearchParams] = useSearchParams();
    const searchAsObject = Object.fromEntries(new URLSearchParams(searchParams));
    const initalSearch = {
        brand_name: '',
        perPage: pagination?.per_page,
        page: 1,
    };
    const [stateSearch, setStateSearch] = useState(
        Object.keys(searchAsObject).length === 0 ? initalSearch : searchAsObject
    );
    const [search, setSearch] = useState(stateSearch);
    const formSearch = useForm({
        defaultValues: useMemo(() => {
            return search;
        }, [search]),
    });

    async function fetchBrandList(param = stateSearch) {
        dispatch(pendding());
        const response = await fetchAllBrand(param);

        if (response?.data?.success === true) {
            const brandList = response.data.data;
            setBrand(brandList.data);
            setPagination(brandList.pagination);
        } else {
            const configParam = removeValuteEmpty(param);
            if (configParam.hasOwnProperty('brand_name')) {
                setBrand([]);
            } else {
                if (response?.data?.data === false) {
                    setBrand([]);
                } else {
                    setStateSearch({ perPage: 10, page: 1 });
                    setSearchParams({ perPage: 10, page: 1 });
                }
            }
        }
        dispatch(done());
    }

    const showForm = () => {
        setOpen(true);
        setRow({ brand_name: '' });
        setSelectedImage('');
        imageRef.current = '';
    };
    const onEdit = (row) => {
        if (row.image) {
            setSelectedImage(row.image);
            setRow({ ...row, brand_name: row.name });
        } else {
            setSelectedImage('');
            setRow({ ...row, brand_name: row.name, brand_image: '' });
        }

        setOpen(true);
    };
    const handleSearch = (formValues) => {
        const value = removeValuteEmpty(formValues);
        value.perPage = pagination?.per_page;
        setStateSearch(value);
        setSearchParams(value);
    };
    const handleClearSearch = () => {
        const param = removeValuteEmpty(initalSearch);
        setSearchParams(param);
        setSearch({ brand_name: '' });
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
        const value = { ...param, page: page, perPage: pagination?.per_page };

        setSearchParams(value);
        setStateSearch(value);
    };

    useEffect(() => {
        formSearch.reset(search);
    }, [search, formSearch]);

    useEffect(() => {
        fetchBrandList();
    }, [stateSearch]);
    return (
        <>
            <Typography variant="h5">Quản Lý Thương Hiệu</Typography>

            {/* tìm kiếm thương hiệu */}
            <form onSubmit={formSearch.handleSubmit(handleSearch)}>
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} sm={6} md={7}>
                        <Button
                            size="small"
                            color="success"
                            variant="contained"
                            onClick={() => showForm()}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="style-1" sx={{ paddingRight: '4px' }}>
                                    Thêm
                                </Typography>
                                <FaPlus />
                            </Box>
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={5}>
                        <Box sx={{ display: 'flex' }}>
                            <InputField
                                control={formSearch.control}
                                label="Tên thương hiệu"
                                name="brand_name"
                            />
                            <Box
                                sx={{
                                    marginLeft: '16px',
                                    display: 'flex',
                                    justifyContent: {
                                        md: 'flex-end',
                                    },
                                }}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        marginRight: { xs: '16px' },
                                    }}
                                >
                                    Tìm
                                </Button>
                                <Button
                                    mr={3}
                                    onClick={() => handleClearSearch()}
                                    variant="contained"
                                    color="secondary"
                                >
                                    Xóa
                                </Button>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item md={9}></Grid>
                </Grid>
            </form>
            {/* bảng thương hiệu */}
            <Box
                mt={2}
                sx={{
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'flex-end',
                    width: '100%',
                }}
            >
                <TableBrand list={brand} fetchBrandList={fetchBrandList} onEdit={onEdit} />
            </Box>
            {/* phân trang */}
            {brand && pagination?.total > 10 && (
                <Grid container spacing={3} my={3} alignItems="center">
                    <Grid item xs={12} md={1}>
                        <Box
                            sx={{
                                display: 'flex',
                                marginLeft: '8px',
                            }}
                        >
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
                            display="block"
                            sx={{
                                textAlign: {
                                    md: 'center',
                                    xs: 'left',
                                },
                            }}
                        >
                            {`Hiển thị từ ${pagination?.from} ~ ${pagination?.to}  trong tổng số ${pagination?.total} thương hiệu`}
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
            <FormBrand
                open={open}
                handleClose={() => {
                    setOpen(false);
                }}
                row={row}
                fetchBrandList={fetchBrandList}
                imageRef={imageRef}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                handleClearSearch={handleClearSearch}
                stateSearch={stateSearch}
            />
        </>
    );
};

export default BrandList;
